//Global Variables
var mouseDown = false;
var selectedElements = {};
var selectedStyle = ['dashed', '3px', 'rgb(0,127,256)'];

// Page load events
$(document).ready(function() 
{
	//Mouse Down/Up Event Listener
	$('body')
	.mouseup(function()
	{
		mouseDown = false;
		updateTxt0(mouseDown); //>>>>>DEBUG CODE - REMOVE<<<<<//
	})
	.mousedown(function( event )
	{
		mouseDown = true;
		updateTxt0(mouseDown); //>>>>>DEBUG CODE - REMOVE<<<<<//
		updateTxt1([event.clientX, event.clientY]); //>>>>>DEBUG CODE - REMOVE<<<<<//
		clickHandler([event.clientX, event.clientY]);
	});
	
});

//>>>>>DEBUG CODE - REMOVE<<<<<//
function updateTxt0(a)
{
	if(a==true){
		document.getElementById("0").innerHTML = "DOWN";
	}else{
		document.getElementById("0").innerHTML = "UP";
	}
}

function updateTxt1(a)
{
	document.getElementById("1").innerHTML = "X&rarr;" + a[0] + " / " + "Y&rarr;" + a[1];
}

function updateTxt2(a)
{
	document.getElementById("2").innerHTML = a;	
}

function updateTxt3(a)
{
	if (a in selectedElements) {
		document.getElementById("3").innerHTML = selectedElements[a][0];	
		document.getElementById("4").innerHTML = selectedElements[a][1];
		document.getElementById("5").innerHTML = selectedElements[a][2];
	}
}
//>>>>>DEBUG CODE - REMOVE<<<<<//

// Handles additional click events
// In first instance action executed as a single click
// aTimer is initiated. If mouseDown is true after timer
// Drag actions are called
function clickHandler(click) 
{
	var target = getClickElement(click);
	
	if (target[0]) { //If clicked item is an interactiveObject
		
		// If clicked interactiveObject is not already selected
		if(!(target[1].id in selectedElements)) {
			clearSelected();
			
			var values = getBorderStyles(target[1]);
			selectedElements[target[1].id] = values;
			
			updateTxt3(target[1].id); //>>>>>DEBUG CODE - REMOVE<<<<<//
			
			setBorderStyles(target[1].id, 0, selectedStyle[0]);
			setBorderStyles(target[1].id, 1, selectedStyle[1]);
			setBorderStyles(target[1].id, 2, selectedStyle[2]);
		} else {
			//Add script here for if element is already selected and clicked
			return false;
		}
	} else {
		clearSelected();
		return false;
	}
}

// Clear selected items array
// Revert elements Style to store values
function clearSelected() 
{
	if (getNumberOfKeys(selectedElements) > 0) {
		var keys = getKeys(selectedElements);
	
		if(enumerateArray(selectedElements, keys)) {
			selectedElements = {};
			return true;
		}else{
			return false;
		}
	} else {
		return true;
	}
}

// Recursive function to enumerate keys/list elements
// and reduce array to length of 0
function enumerateArray(anArray, keys)
{
	aKey = keys.pop();
	
	for (var i = 0; i < anArray[aKey].length; i++) {
		if(!(setBorderStyles(aKey, i, anArray[aKey][i]))) {
			return false;
		}
	}
	
	if(keys.length == 0){
		return true;
	}else{
		enumerateArray(anArray, keys);
	}
}

// Returns a list of keys in anArray
function getKeys(anArray)
{
	return (Object.keys(anArray));
}

// Returns the number of keys in anArray
function getNumberOfKeys(anArray) 
{	
	return (Object.keys(anArray).length);
}

// Sets anId border style of aValue to aStyle
function setBorderStyles(anId, aValue, aStyle) 
{
	if(aValue == 0){
		document.getElementById(anId).style.borderStyle = aStyle;
	}else if (aValue == 1){
		document.getElementById(anId).style.borderWidth = aStyle;
	}else if (aValue == 2){
		document.getElementById(anId).style.borderColor = aStyle;
	}else{
		return false;
	}
	return true;
}

// Returns an Elements border style values
function getBorderStyles(anObject) {	

	return [anObject.style.borderStyle, anObject.style.borderWidth, anObject.style.borderColor];
}

// If click is on an element.id with class="interactiveObject"
// Return [true, element]
// else [false, element]
function getClickElement(click) {
	
	var target = document.elementFromPoint(click[0],click[1]);
	
	updateTxt2(target.id); //>>>>>DEBUG CODE - REMOVE<<<<<//
	
	if (target.className == "interactiveObject") {
		return [true, target]; 
	} else {
		return [false, target];
	}
}


// Sets button length of anAxis for anID, button to aValue
function setButtonSize(aValue, anId, anAxis)
{
	setElementText(anId, aValue);	
	var numberOfElements = getNumberOfElements("menuButton");
	
	if(numberOfElements > 0)
	{
		var elementsList = getElementsOfClass("menuButton");
		
		for (var i = 0; i < numberOfElements; i++) {
			var value = aValue + "px";
			
			if (anAxis == 'x') {
				elementsList[i].style.width = value;
			}else if (anAxis == 'y') {
				elementsList[i].style.height = value;
			}else{
				return false;
			}
		}
		return true;
	}else{
		return false;
	}
}

// Returns the number of elements that have a class of aClass
function getNumberOfElements(aClass)
{
	return (document.getElementsByClassName(aClass).length);
}

// Returns anArray of the elements that have a class of aClass
function getElementsOfClass(aClass)
{
	return (document.getElementsByClassName(aClass));
}

// Sets the innerHTML of anId to aValue
function setElementText(anId, aValue)
{
	var textId = anId + "Text";
	document.getElementById(textId).innerHTML = aValue;
}

// Sets the RGB colour values of an element
function updateColourValue(anId, aColour)
{
	var values = getRGBValues();
	values[3] = "rgb("+values[0]+","+values[1]+","+values[2]+")";
	document.getElementById("colourDisplay").style.backgroundColor = values[3];
	
	var target = getColourTarget();
	var changedValue = getRGBValue(aColour);
	var numberOfElements = getNumberOfElements("menuButton");
	
	setElementText(anId, changedValue);
	
	if (numberOfElements > 0) {	
		var elements = getElementsOfClass("menuButton");
		
		for (var i = 0; i < numberOfElements; i++){	
			setRGBValues(elements[i], target, values[3]);
		}
		return true;
	}else{
		return false;
	}
}

// Sets the specific element's RGB values of anObject
function setRGBValues(anObject, anElement, colours)
{
	if (anElement == "0"){
		anObject.style.backgroundColor = colours;
	} else if (anElement == "1") {
		anObject.style.borderColor = colours;
	} else {
		return false;
	}
	return true;
}

// Returns the values of the RGB sliders
function getRGBValues()
{
	return [document.getElementById("valueOfRed").value, document.getElementById("valueOfGreen").value, document.getElementById("valueOfBlue").value];
}

// Returns the value aColour's slider
function getRGBValue(aColour)
{
	var values = getRGBValues();
	
	if(aColour == "red") {
		return values[0];
	} else if (aColour == "green") {
		return values[1];
	} else if (aColour == "blue") {
		return values[2];
	} else {
		return false;
	}
}

// Returns the selected option for colour target
function getColourTarget()
{
	return document.getElementById("colourWhichElement").value;
}

// Sets RGB Sliders to default values of 256
function resetColourValues()
{
	document.getElementById("valueOfRed").value = 256;
	document.getElementById("valueOfGreen").value = 256;
	document.getElementById("valueOfBlue").value = 256;
	
	updateColourValue("valueOfRed", "red");
	updateColourValue("valueOfGreen", "green");
	updateColourValue("valueOfBlue", "blue");
}

// Updates corners of button elements by aValue
function updateButtonCorners(aValue)
{
	setElementText("cornerRadius", aValue);
	var corners = getWhichCorners();
	
	for (var i = 0; i < 4; i++) {
		if (corners[i] == true){
			handleWhichCorner(i, aValue);
		}
	}
}

// Sets aCorner to aValue
function handleWhichCorner(cornerRef, aValue)
{
	var numberOfElements = getNumberOfElements("menuButton");
	
	if(numberOfElements > 0){
	
		var elements = getElementsOfClass("menuButton");
	
		if (cornerRef == 0){
			for (var i = 0; i < numberOfElements; i++) {
				setTopLeft(elements[i], aValue + "px");
			}
		} else if (cornerRef == 1){
			for (var i = 0; i < numberOfElements; i++) {
				setTopRight(elements[i], aValue + "px");
			}
		} else if (cornerRef == 2){
			for (var i = 0; i < numberOfElements; i++) {
				setBottomRight(elements[i], aValue + "px");
			}
		} else if (cornerRef == 3){
			for (var i = 0; i < numberOfElements; i++) {
				setBottomLeft(elements[i], aValue + "px");
			}
		} else {
			return false;
		}
	}
}

// Sets Top Left Corner Value
function setTopLeft(anElement, aValue)
{
	anElement.style.borderTopLeftRadius = aValue;
}

// Sets Top Right Corner Value
function setTopRight(anElement, aValue)
{
	anElement.style.borderTopRightRadius = aValue;
}

// Sets Bottom Right Corner Value
function setBottomRight(anElement, aValue)
{
	anElement.style.borderBottomRightRadius = aValue;
}

// Sets Bottom Left Corner Value
function setBottomLeft(anElement, aValue)
{
	anElement.style.borderBottomLeftRadius = aValue;
}

// Returns values of all corner checkbox's
function getWhichCorners()
{
	return [document.getElementById("cornerTL").checked, document.getElementById("cornerTR").checked, document.getElementById("cornerBR").checked, document.getElementById("cornerBL").checked];	
}












