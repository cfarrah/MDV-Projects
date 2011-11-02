//Cody Farrah
//VFW Project 2
//Term 1111

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	
	//getElementID Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=actGroup.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = actGroup[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	
	//Variable Defaults
	var actGroup = ["--What kind of activity was it?--", "Book", "Game", "Show"];
	
	makeCats();
	
	//Set Link & Submit Click Events
	/*
	var displayData = $("displayData")
	displayData.addEventLister("click", getData);
	var clearData = $("clearData");
	clearData.addEventLister("click", clearLocal);
	var saveData = $("submit");
	saveData.addEventLister("click", storeData);
	*/
});
