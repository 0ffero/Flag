var game = new Phaser.Game(consts.newConfig());
function preload() { vars.Phaser.scene=this; vars.init(); }
function create() { vars.App.start(); };
function update() { 
    vars.App.which==='04' && vars.App.hue.update();
}