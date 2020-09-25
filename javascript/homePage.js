const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Para a contagen da quantidade.
var counting = 0;

canvas.width = window.innerWidth / 2;
canvas.height = 2 * window.innerHeight / 3;

// Para a aleatoriedade.
function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

var flakes = {
	list: [],

	// Na ordem, os elementos de cada floco em equivalem a:
	// -> Posição em x
	// -> Posição em y
	// -> Opacidade (alpha)
	// -> Comprimento
	// -> Velocidade

	create: function() {
		this.list.push([
			randInt(canvas.width), 
			0, 
			0.1 + 0.8 * Math.random(), 
			(0.05 + 0.2 * Math.random()) * canvas.height, 
			6 + 9 * Math.random()
		]);
	},

	update: function() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i][1] += this.list[i][4];
		}
		if (this.list.length > 0) {
			if (this.list[0][1] - this.list[0][3] > canvas.height) {
				this.list.shift();
			}
		}
	},

	draw: function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < this.list.length; i++) {
			ctx.strokeStyle = "rgba(89, 0, 222, " + this.list[i][2] + ")";
			ctx.lineWidth = Math.ceil(canvas.width / 100);
			ctx.beginPath();
			ctx.lineCap = "round";
			ctx.moveTo(this.list[i][0], this.list[i][1]);
			ctx.lineTo(this.list[i][0], this.list[i][1] - this.list[i][3]);
			ctx.stroke();
		}
	}
};

const stickMan = {
	main: new Image(),
	mainCount: 1,
	duskCount: 0,
	man1: new Image(),
	man2: new Image(),
	man3: new Image(),
	man4: new Image(),
	man5: new Image(),
	man6: new Image(),
	man7: new Image(),
	man8: new Image(),
	man9: new Image(),
	loaded: false,
	sizeX: canvas.width,
	sizeY: canvas.height,
	positionX: 0,
	positionY: 0,

	adjust: function() {
		if (this.sizeX >= this.sizeY) {
			this.sizeX = parseInt(this.sizeY * 620 / 877);
			this.positionX = canvas.width / 2 - this.sizeX / 2;
		} else {
			this.sizeY = parseInt(this.sizeX * 877 / 620);
			this.positionY = canvas.height / 2 - this.sizeY / 2;
		}
	},

	update: function() {
		this.duskCount += 1;
		if (this.duskCount >= 5) {
			this.mainCount = this.mainCount % 9 + 1;
			if (this.mainCount == 1) {
				this.main = this.man1;
			} else if (this.mainCount == 2) {
				this.main = this.man2;
			} else if (this.mainCount == 3) {
				this.main = this.man3;
			} else if (this.mainCount == 4) {
				this.main = this.man4;
			} else if (this.mainCount == 5) {
				this.main = this.man5;
			} else if (this.mainCount == 6) {
				this.main = this.man6;
			} else if (this.mainCount == 7) {
				this.main = this.man7;
			} else if (this.mainCount == 8) {
				this.main = this.man8;
			} else {
				this.main = this.man9;
			}
			this.duskCount = 0;
		}
		this.loaded = true;
	}
};

stickMan.adjust();
stickMan.man1.src = "sources/images/huehue/hue1.png";
stickMan.man2.src = "sources/images/huehue/hue2.png";
stickMan.man3.src = "sources/images/huehue/hue3.png";
stickMan.man4.src = "sources/images/huehue/hue4.png";
stickMan.man5.src = "sources/images/huehue/hue5.png";
stickMan.man6.src = "sources/images/huehue/hue6.png";
stickMan.man7.src = "sources/images/huehue/hue7.png";
stickMan.man8.src = "sources/images/huehue/hue8.png";
stickMan.man9.src = "sources/images/huehue/hue9.png";

function draw() {
	if (counting >= 2) {
		flakes.create();
		counting = 0;
	}

	flakes.update();
	flakes.draw();
	stickMan.update();

	if (stickMan.loaded) {
		ctx.drawImage(stickMan.main, stickMan.positionX, stickMan.positionY, stickMan.sizeX, stickMan.sizeY);
	}

	counting += 1;
	window.requestAnimationFrame(draw);
}

// Aqui começa.
window.onload = draw();