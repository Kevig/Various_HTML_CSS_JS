var numberOfBlocks = 54;
var increment = 10;
var zoomValue = -500;

var elementTransforms = [];
var cubeTransforms = {};
var hCubeTransforms = {};
var yCubeTransforms = {};

// Page Load event
window.onload = cubeInit();

function cubeInit()
{
	loadTransforms();
	buildCube();
	buildBlocks();
}

function loadTransforms()
{
	cubeTransforms = {y:-60, x:0, z: 0};
	hCubeTransforms = {y:0, x:0, z:0};
	yCubeTransforms = {y:0, x:0, z:0};
	
	// Front Face on init
	for(var i = 0; i < 9; i++){
		elementTransforms.push([0,0,150]); // 0 -> 8 index values front face
	}
	
	//Back Face on init
	for(var i = 0; i < 9; i++){
		elementTransforms.push([180,0,150]); // 9 -> 17 index values back face
	}
	
	//Top Face on init
	for(var i = 0; i < 9; i++){
		elementTransforms.push([0,0,150]); // 18 -> 26 index values top face
	}
	
	//Bottom Face on init
	for(var i = 0; i < 9; i++){
		elementTransforms.push([180,0,150]); // 27 -> 35 index values bottom face
	}
	
	//Right Face on init
	for(var i = 0; i < 9; i++){
		elementTransforms.push([0,0,150]); // 36 -> 44 index values left face
	}
	
	//Left Face on init
	for(var i = 0; i < 9; i++){
		elementTransforms.push([180,0,150]); // 45 -> 53 index values right face
	}
}

function buildCube()
{
	var element = document.getElementById("cube");
	setTransform(element, getValuesString(-1));
	document.getElementById("console").innerHTML = getValuesString(-1); //Debug Line
}

function buildBlocks()
{
	for (var i = 0; i < numberOfBlocks; i++)
	{
		var element = document.getElementById("block"+i);
		setTransform(element, getValuesString(i));
	}
}

function getValuesString(anIndex)
{
	
	if(anIndex == -1){
		return "rotateY(" 	+ cubeTransforms.y + "deg) rotateX("
							+ cubeTransforms.x + "deg) translateZ("
							+ cubeTransforms.z + "px)";
	} else {
		return "rotateY(" 	+ elementTransforms[anIndex][0] + "deg) rotateX("
							+ elementTransforms[anIndex][1] + "deg) translateZ("
							+ elementTransforms[anIndex][2] + "px)";
	}
}

function setTransform(anElement, aValue)
{
	anElement.style.transform = aValue;
	return true;
}

function zoomIn()
{
	zoomValue += (increment * 10);
	zoomUpdate();
}

function zoomOut()
{
	zoomValue -= (increment * 10);
	zoomUpdate();
}

function zoomUpdate()
{
	var anElement = document.getElementById("dist");
	var aValue = "rotateY(0deg) rotateX(-10deg) translateZ(" + zoomValue + "px)";
	setTransform(anElement, aValue);
}

function rotateCubeRight() // Positive y
{
	cubeTransforms.y += increment;
	if (cubeTransforms.y > 180){
		var diff = cubeTransforms.y - 180;
		cubeTransforms.y = -180 + diff;
	}
	buildCube();
}

function rotateCubeLeft() // Negative y
{
	cubeTransforms.y -= increment;
	if (cubeTransforms.y < -180){
		var diff = cubeTransforms.y + 180;
		cubeTransforms.y = 180 + diff;
	}	
	buildCube();
}

function rotateCubeUp() // Positive x
{
	cubeTransforms.x += increment;
	if (cubeTransforms.x > 180){
		var diff = cubeTransforms.x - 180;
		cubeTransforms.x = -180 + diff;
	}	
	buildCube();
}

function rotateCubeDown() // Negative x
{
	cubeTransforms.x -= increment;
	if (cubeTransforms.x < -180){
		var diff = cubeTransforms.x + 180;
		cubeTransforms.x = 180 + diff;
	}	
	buildCube();
}
