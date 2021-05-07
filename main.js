// вершинный шейдер
var VSHADER_SOURCE = 
'attribute vec4 a_Position;\n' + 
'void main() {\n' + 
'	gl_Position = a_Position;\n' + 
'	gl_PointSize = 7.0;\n' + 
'}\n';

// фрагментный шейдер
var FSHADER_SOURCE = 
'void main() {\n' + 
'	gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' + 
'}\n';

function main() {
	var canvas = document.getElementById('example');
	var gl = getWebGLContext(canvas);
	initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

	var a_Position = gl.getAttribLocation(gl.program,'a_Position');

	// обработка нажатий мыши
	canvas.onmousedown = (ev) => { click(ev , gl , canvas , a_Position); }

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = [];
function click(ev , gl , canvas , a_Position) {
	var x = ev.clientX; // x координата события
	var y = ev.clientY; // y координата события
	var rect = ev.target.getBoundingClientRect();

	// координаты относятся ко всему окну вкладки
	// преобразуем их в координаты canvas
	// преобразуем координаты canvas в вид шейдерных координат vec4(0.0,0.0,0.0,1.0)
	// canvas.width / 2 и т.д. - смещения центра коорд.оси в стандартный шейдерный вид
	x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
	y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

	// сохранить координаты в массиве g_points
	g_points.push(x); g_points.push(y);

	// чистим canvas
	gl.clear(gl.COLOR_BUFFER_BIT);

	var len = g_points.length;
	for (let i = 0; i < len; i+=2) {
		// передать координаты щелчка в a_Position
		gl.vertexAttrib3f(a_Position , g_points[i] , g_points[i+1] , 0.0);
		// рисуем точку
		gl.drawArrays(gl.POINTS , 0 , 1)
	}

}


