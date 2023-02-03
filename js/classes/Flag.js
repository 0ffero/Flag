"use strict"
let Flag = class {
    constructor(_which='scotland', flagVars) {
        let defaults = {containerXY: { x: consts.canvas.cX, y: consts.canvas.cY }, animate: true, animateDuration: 1000 , waveDuration: 1000 };
        flagVars = { ...defaults, ...flagVars };
        this.flagType = _which;
        this.containerXY = flagVars.containerXY;
        this.animateContainer = flagVars.animate;
        this.animateContainerDuration = flagVars.animateDuration;
        this.waveDuration = flagVars.waveDuration;
        this.spacing = { x: 60, y: 30 };
        
        this.scene = vars.getScene();
        this.preInit();

        this.init();
    }

    preInit() {
        let scene = this.scene;

        // GENERATE THE FLAG DOT
        let graphics = scene.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(5, 5, 5);
        graphics.generateTexture('flag_position', 100, 100);
        graphics.clear();

        // generate a border around a black dot (for flags like germany)
        graphics.fillStyle(0x111111, 1);
        graphics.fillCircle(6, 6, 5);
        graphics.lineStyle(1,0x555555);
        graphics.strokeCircle(6,6,6);
        graphics.generateTexture('flag_position_black', 101, 101);
        graphics.clear();
        
        

        // INIT FLAG VARS
        this.flags = {
            '04': [
                [2,2,2,2,2,2,2,2,2],
                [2,2,1,2,2,2,2,2,2],
                [2,1,2,1,2,2,2,2,2],
                [2,1,2,1,2,1,2,1,2],
                [2,1,2,1,2,1,2,1,2],
                [2,2,1,2,2,1,1,1,2],
                [2,2,2,2,2,2,2,1,2],
                [2,2,2,2,2,2,2,1,2],
                [2,2,2,2,2,2,2,2,2],
            ],
            england: [
                [1,1,1,1,3,1,1,1,1],
                [1,1,1,1,3,1,1,1,1],
                [1,1,1,1,3,1,1,1,1],
                [1,1,1,1,3,1,1,1,1],
                [3,3,3,3,3,3,3,3,3],
                [1,1,1,1,3,1,1,1,1],
                [1,1,1,1,3,1,1,1,1],
                [1,1,1,1,3,1,1,1,1],
                [1,1,1,1,3,1,1,1,1]

            ],
            france: [
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
                [2,2,2,1,1,1,3,3,3],
            ],
            germany: [
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [3,3,3,3,3,3,3,3,3],
                [3,3,3,3,3,3,3,3,3],
                [3,3,3,3,3,3,3,3,3],
                [4,4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4,4]
            ],
            italy: [
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3],
                [5,5,5,1,1,1,3,3,3]
            ],
            portugal: [
                [5,5,5,3,3,3,3,3,3],
                [5,5,5,3,3,3,3,3,3],
                [5,5,5,4,3,3,3,3,3],
                [5,5,4,4,4,3,3,3,3],
                [5,5,4,3,4,3,3,3,3],
                [5,5,4,4,4,3,3,3,3],
                [5,5,5,4,3,3,3,3,3],
                [5,5,5,3,3,3,3,3,3],
                [5,5,5,3,3,3,3,3,3]
            ],
            scotland: [
                [1,1,2,2,2,2,2,1,1],
                [1,1,1,2,2,2,1,1,1],
                [2,1,1,1,2,1,1,1,2],
                [2,2,1,1,1,1,1,2,2],
                [2,2,2,1,1,1,2,2,2],
                [2,2,1,1,1,1,1,2,2],
                [2,1,1,1,2,1,1,1,2],
                [1,1,1,2,2,2,1,1,1],
                [1,1,2,2,2,2,2,1,1]
            ],
            spain: [
                [3,3,3,3,3,3,3,3,3],
                [3,3,3,3,3,3,3,3,3],
                [4,4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4,4],
                [3,3,3,3,3,3,3,3,3],
                [3,3,3,3,3,3,3,3,3]
            ],
            uk: [
                [1,1,2,2,3,2,2,3,1],
                [3,1,1,2,3,2,3,1,1],
                [2,3,1,1,3,3,1,1,2],
                [2,2,3,1,3,1,1,2,2],
                [3,3,3,3,3,3,3,3,3],
                [2,2,1,1,3,1,3,2,2],
                [2,1,1,3,3,1,1,3,2],
                [1,1,3,2,3,2,1,1,3],
                [1,3,2,2,3,2,2,1,1]
            ]
        };

        this.flagColours = [
            0x222222,   // black  (0)
            0xffffff,   // white  (1)
            0x5EB8,     // blue   (2)
            0xff0000,   // red    (3)
            0xffff00,   // yellow (4)
            0xff00      // green  (5)
        ];

        let fC = this.flagContainer = scene.add.container();
        fC.width = this.spacing.x*9;
        fC.height = this.spacing.y*9;

        this.availableFlags = Object.keys(this.flags);
    }
    
    init() {
        this.generateFlag();
    }

    addContainerAnimation(_c,) {
        let scene = this.scene;
        let aWE = this.addWaveEffect;
        // push the container onto the screen
        _c.tween = scene.tweens.add({
            targets: _c, x: _c.endX, duration: this.animateContainerDuration, ease: 'Quad.easeInOut',
            onComplete: ()=> { delete(_c.tween); aWE(this,_c); }
        });
    }

    addWaveEffect(_class,_c) {
        let scene = _class.scene;

        let children = _c.getAll();
        let wD = _class.waveDuration/2; // wave is a yoyo, so we halve the requested duration

        let delay = 0; let delayInc = 50;
        for (let c=0; c<9; c++) {
            let col = children.filter(m=> m.vars.col===c);
            col.forEach((_c)=> {
                scene.tweens.add({
                    targets: _c, scale: 2, delay: delay, duration: wD, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
                });
            });
            delay+=delayInc;
        };
    }

    changeFlagTo(_which=null) {
        if (!this.availableFlags.includes(_which)) return `Invalid flag type! - Valid: ${this.availableFlags.join(', ').trim()}.`;
        this.flagType=_which;

        this.destroyCurrentFlag();
        this.generateFlag();
    }

    destroyCurrentFlag() {
        let children = this.flagContainer.getAll();
        if (!children.length) return;

        children.forEach((_c)=> {
            vars.getScene().tweens.getTweensOf(_c).forEach((_t)=> { _t.remove(); });
            _c.destroy();
        });
    }

    generateFlag() {
        let flagData = this.flags[this.flagType];
        if (!flagData) return `Invalid flag type! - Valid: ${this.availableFlags.join(', ').trim()}.`;

        let scene = this.scene;


        let spacing = this.spacing;
        let flagColours = this.flagColours;

        let container = this.flagContainer;
        container.tween && container.tween.remove();
        let x = 0; let y = 0;
        let maxX = 0; let maxY = 0;
        let hO = vars.App.hue.objects = [];
        flagData.forEach((_row,_r)=> {
            _row.forEach((_col,_c)=> {
                let frame = !_col ? 'flag_position_black' : 'flag_position';
                let tint = flagColours[_col];
                let image = scene.add.image(x, y, frame).setTint(!_col ? 0xffffff : tint);
                image.vars = { row: _r, col: _c }; // used for animating
                container.add(image);
                (this.flagType==='04' && tint===0xffffff && _col) && (hO.push(image));
                x+=spacing.x;
                x>maxX&&(maxX=x);
            });
            x=0;
            y+=spacing.y;
            maxY=y;
        });

        this.placeContainer();
    }

    placeContainer() {
        let container = this.flagContainer;

        let realXY = { x: this.containerXY.x-container.width/2+90, y: this.containerXY.y-container.height/2 };
        if (this.animateContainer) {
            // place container off of screen
            container.setPosition(-container.width/2, realXY.y);
            container.endX = realXY.x;
            this.addContainerAnimation(container);
            return;
        };

        
        container.setPosition(realXY.x, realXY.y);
        this.addWaveEffect(this,container);
    }

    switchFlagInstantly(_newFlag=null) {
        if (!this.availableFlags.includes(_newFlag)) return `Invalid flag type! - Valid: ${this.availableFlags.join(', ').trim()}.`;
        let newFlag = _newFlag;
        let newFlagVars = this.flags[newFlag].flat(1);
        let colours = this.flagColours;

        let hO = vars.App.hue.objects = [];
        let children = this.flagContainer.getAll();
        children.forEach((_c,_i)=> {
            let colour = colours[newFlagVars[_i]]
            if (colour===0x222222) {
                _c.clearTint().setTexture('flag_position_black');
            } else {
                _c.setTexture('flag_position');
                (_newFlag==='04' && colour===0xffffff) && (hO.push(_c));
                _c.setTint(colour);
            };
        });
    }
};