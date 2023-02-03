var vars = {
    DEBUG: false,

    getScene: ()=> { return vars.Phaser.scene; },

    version: 1.01,
    init: function() { vars.input.init(); },

    // APP
    App: {
        flag: null,
        flagsAvailable: ['04','england','france','germany','italy','portugal','scotland','spain','uk'],
        which: 'scotland',

        hue: {
            value: 0,
            max: 359,
            inc: 0.25,
            objects: [],
            get: ()=> {
                return Phaser.Display.Color.HSLToColor(vars.App.hue.value/360,1,0.5);
            },
            update: ()=> {
                let hV = vars.App.hue;
                if (!hV.objects.length) return;

                hV.value+=hV.inc;
                hV.value>hV.max && (hV.value=0);

                let colour = hV.get();
                hV.objects.forEach((_c)=> {
                    _c.setTint(colour.color);
                });
            }
        },

        getNextFlag: (aV)=> {
            let currentFlag = aV.which;
            let index = aV.flagsAvailable.findIndex(m=>m===currentFlag);
            index+2>aV.flagsAvailable.length ? (index=0) : index++;

            return aV.which = aV.flagsAvailable[index];
        },

        start: ()=> {
            let aV = vars.App;
            aV.flag = new Flag(aV.which); //, { animate: false }

            vars.UI.init();
        },

        switchFlagTo: (_to)=> {
            let aV = vars.App;
            let rs = aV.flag.changeFlagTo(_to);
            rs && console.log(rs);
        }
    },
    input: {
        init: ()=> {
            vars.getScene().input.on('pointerup',(_e)=> {
                let aV = vars.App;
                let newFlag;
                switch (_e.button) {
                    case 2: newFlag = aV.getNextFlag(aV); aV.flag.switchFlagInstantly(newFlag); break;
                    default: newFlag = aV.getNextFlag(aV); aV.switchFlagTo(newFlag); break;
                };
                console.log(`%c Changing flag to:%c ${newFlag}`,'color: #00ea3a;','color: default');
                newFlag==='04' && (newFlag+=' (HUE ROTATION ON)');
                vars.Phaser.objects.currentFlagText.setText(newFlag.toUpperCase());
            });
        }
    },

    Phaser: { scene: null, objects: {} },

    UI: {
        fonts: {
            version: { fontFamily: 'Consolas', fontSize: '20px', color: '#333333', align: 'right', lineSpacing: 2 },
            large: { fontFamily: 'Consolas', fontSize: '28px', color: '#ffffff', stroke: '#333333', strokeThickness: 2, align: 'center', lineSpacing: 10 }
        },
        init: ()=> {
            let cC = consts.canvas;
            let scene = vars.getScene();
            let UI = vars.UI;

            let fontL = UI.fonts.large;
            let flag = vars.App.which.toUpperCase();

            vars.Phaser.objects.currentFlagText = scene.add.text(cC.cX, cC.height*0.75, flag, fontL).setOrigin(0.5);
            scene.add.text(cC.cX, cC.height*0.85, 'LMB: Animate to new flag.\nRMB: Instantly switch to new flag', fontL).setOrigin(0.5);

            let fontV = UI.fonts.version;
            let vText = vars.Phaser.objects.versionText = scene.add.text(cC.width-10, cC.height-10, `Version: ${vars.version}`, fontV).setOrigin(1);
            vText.tween = scene.tweens.add({ targets: vText, alpha: 0.33, hold: 5000, duration: 1000, yoyo: true, repeat: -1 });
        }
    }

};