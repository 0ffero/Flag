var vars = {
    DEBUG: false,

    getScene: ()=> { return vars.Phaser.scene; },

    version: 1.00,
    init: function() { vars.input.init(); },

    // APP
    App: {
        flag: null,
        flagsAvailable: ['england','france','germany','italy','portugal','scotland','spain','uk'],
        which: 'scotland',

        getNextFlag: (aV)=> {
            let currentFlag = aV.which;
            let index = aV.flagsAvailable.findIndex(m=>m===currentFlag);
            index+2>aV.flagsAvailable.length ? (index=0) : index++;

            return aV.which = aV.flagsAvailable[index];
        },

        start: ()=> {
            let aV = vars.App;
            aV.flag = new Flag(aV.which);
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
            });
        }
    },

    Phaser: { scene: null }

};