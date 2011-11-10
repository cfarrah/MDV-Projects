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

	//Variable Defaults
	var actGroup = ["--What kind of activity was it?--", "Book", "Game", "Show"], genderValue;


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
	function toggleControls(n) {
		switch (n) {
			case "on":
				$('activityForm').style.display = "none";
				$('clearData').style.display = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('activityForm').style.display = "block";
				$('clearData').style.display = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	
	function storeData(){
		var id = Math.floor(Math.random()*10000000001);
		
		
		//Gather up form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectedRadio();
		
		var item				= {};
			item.name  			= ["Name:", $("name").value];
			item.age  			= ["Age:", $('age').value];
			item.gender			= ["Gender:", genderValue];
			item.date  			= ["Date:", $('date').value];
			item.actName  		= ["Activity Name:", $('actName').value];
			item.activity		= ["Activity Type:", $('groups').value];
			item.time  			= ["Time Spent:", $('time').value];
			item.addl  			= ["Additional Comments:", $('addl').value];
		
		
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("This activity has been added.");
		
	
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There are no activities currently saved.")
		}
		//Write data from local storage to the browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert a string from local storage value back to an object by using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" " +obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);	
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Activity";
		//editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add edit single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Activity";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
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
	
	
	makeCats();
	
	//Set Link & Submit Click Events
	var displayData = $("displayData")
	displayData.addEventListener("click", getData);
	var clearData = $("clearData");
	clearData.addEventListener("click", clearLocal);
	var saveData = $("submit");
	saveData.addEventListener("click", storeData);
	
});
