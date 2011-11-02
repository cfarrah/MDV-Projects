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
	
	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].gender;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				genderValue = radios[i].value;
			}
			
		}
	}
	
	
	
	function storeData(){
		var id 			= Math.floor(Math.random()*10000000001);
		//Gather up form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectedRadio();
		var item				= {};
			item.name  			= ["Name:", $('name').value];
			item.age  			= ["Age:", $('age').value];
			item.date  			= ["Date:", $('date').value];
			item.actName  		= ["Activity Name:", $('actName').value];
			item.time  			= ["Time Spent:", $('time').value];
			item.addl  			= ["Additional Comments:", $('addl').value];
			item.gender			= ["Gender:", genderValue];
		
		
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("This activity has been added.");
		
	
	}
	
	//Clear all data
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There are no activities to clear.")
		}else{
			localStorage.clear();
			alert("All activities have been deleted.")
			window.location.reload();
			return false;
			}
	}
	
	
	//Variable Defaults
	var actGroup = ["--What kind of activity was it?--", "Book", "Game", "Show"],
					genderValue
	;
	
	makeCats();
	
	//Set Link & Submit Click Events
	/*
	var displayData = $("displayData")
	displayData.addEventListener("click", getData);
	var clearData = $("clearData");
	clearData.addEventListener("click", clearLocal);
	*/
	var saveData = $("submit");
	saveData.addEventListener("click", storeData);
	
});
