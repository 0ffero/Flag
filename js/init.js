var game = new Phaser.Game(consts.newConfig());
function preload() { vars.Phaser.scene=this; vars.init(); }
function create() { vars.App.start(); };