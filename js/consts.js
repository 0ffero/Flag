const consts = {
    appName: 'Flags',
    canvas: {
		colour: '#111111',
		width: 1280, height: 720,
        cX: 1280/2, cY: 720/2
	},

	depths: { },

	newConfig: ()=> {
		return {
			title: "Flags by 0ffero",
			url: window.location.href,
			version: vars.version,
			type: Phaser.WEBGL,
			backgroundColor: '#111111',
			disableContextMenu: true,
			height: consts.canvas.height,
			width: consts.canvas.width,
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: consts.canvas.width,
				height: consts.canvas.height,
			},
			scene: { preload: preload, create: create, update: update }
		};
	}
};