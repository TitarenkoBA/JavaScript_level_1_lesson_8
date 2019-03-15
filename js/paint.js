var doc = document;

var size = doc.getElementById('sizeSelect');
var newColor = doc.getElementById('color');
var canvas = doc.getElementById('canv');
var ctx = canvas.getContext('2d');
var xCoord = doc.getElementById('xCoord');
var yCoord = doc.getElementById('yCoord');
var tools = ['brush', 'eraser', 'rectangle'];
var activeTool = '';

var system = {
	width: canvas.getAttribute('width'),
	height: canvas.getAttribute('height'),
	currentColor: newColor.value,
	currentTool: '',
	brushSize : size.value
};

//Рендер Системы
var renderSystem = function (obj, elem, action) {
	obj[elem] = action;
};

//Получение коодинат
var getCoordinates = function (evt) {
	let mas = {};
	let x = evt.offsetX;
	let y = evt.offsetY;

	mas = {x : x, y : y};
	xCoord.innerText = x;
	yCoord.innerText = y;

	return mas;
};

//Изменение размера кисти
var switchSize = function (list) {
	return list.value;
};

//Изменение цвета
var switchColor = function (colorInput) {
	return colorInput.value;
};

//Изменение инструмента
var switchTool = function (button) {
	if (button.id == 'brush') {
		return 'brush'
	} else if (button.id == 'eraser') {
		return 'eraser'
	} else if (button.id == 'spray') {
		return 'spray'
	} else if (button.id == 'pencel') {
		return 'pencel'
	}
};

//Мышинные события (клики)
var mouseActionsClick = function (evt) {
	if (evt.target.classList.contains('toolButton') == true) {
		renderSystem (system, 'currentTool', switchTool (evt.target));
	} else if (evt.target.id == 'sizeSelect') {
		renderSystem (system, 'brushSize', switchSize (evt.target));
	} else if (evt.target.id == 'color') {
		renderSystem (system, 'currentColor', switchColor (evt.target));
	}
};

//НЕПОСРЕДСТВЕННО РИСОВАНИЕ

var startDraw = function (evt) {
	if (system.currentTool == 'brush') {
		drawBrush (evt);
	}
	if (system.currentTool == 'eraser') {
		clear (evt);
	}
	if (system.currentTool == 'spray') {
		drawSprey (evt);
	}
	if (system.currentTool == 'pencel') {
		drawPencel (evt);
	}
};

var endDraw = function (evt) {
	canvas.onmousemove = null;
};

var drawBrush = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.fillStyle = system.currentColor;
		ctx.arc (xCoord.innerText, yCoord.innerText, system.brushSize / 2, 0, 360, false);
		ctx.fill();
		ctx.closePath ();
	}
};

var clear = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.clearRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
		ctx.closePath ();
	}
};

var drawSprey = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.fillStyle = system.currentColor;
		for (let i = 0; i < 20; i++) {
			ctx.fillRect ((parseInt(xCoord.innerText) + Math.round(Math.random() * system.brushSize)), (parseInt(yCoord.innerText) + Math.round(Math.random() * system.brushSize)), 2, 2);
		}
		ctx.closePath ();
	}
};

var drawPencel = function (evt) {
    let lastPointx;
    let lastPointy;
    canvas.onmousemove = function(evt) {
	    ctx.beginPath();
	    ctx.strokeStyle = system.currentColor;
	    ctx.lineWidth = system.brushSize;
	    ctx.moveTo(lastPointx, lastPointy);
	    ctx.lineTo(evt.offsetX, evt.offsetY);
	    ctx.stroke();
	    lastPointx = evt.offsetX;
	    lastPointy = evt.offsetY;
    }
};

// Время

var time = function () {
	
	var date = new Date ();

	h1 = date.getHours ();
	m1 = date.getMinutes ();
	s1 = date.getSeconds ();

	if (h1 < 10) h1 = '0' + h1;
	if (m1 < 10) m1 = '0' + m1;
	if (s1 < 10) s1 = '0' + s1;

	let time1 = h1 + ":" + m1 +":" + s1;
	doc.getElementById ('my_time').innerText = time1;
	setTimeout (time, 1000);
	
};

time ();

canvas.addEventListener ('mousemove', getCoordinates); //активация получения координат
doc.addEventListener ('click', mouseActionsClick); //активация кликов
canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);