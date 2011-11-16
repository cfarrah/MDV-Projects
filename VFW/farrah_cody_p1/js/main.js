//Cody Farrah
//VFW Project 4
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
	var errMsg = $('errors');

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
	
	
	function storeData(key){
		//If there is no key, this is a brand new item and need a new key
		if(!key){
			var id = Math.floor(Math.random()*10000000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over daya.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here, into the storeData function.
			id = key;
		}
		
		//Gather up form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectedRadio();
		
		var item				= {};
			item.name  			= ["Name:", $("name").value];
			item.age  			= ["Age:", $('age').value];
			item.gender			= ["Gender:", genderValue];
			item.date  			= ["Date:", $('date').value];
			item.actName  		= ["Activity Name:", $('actName').value];
			item.group			= ["Activity Type:", $('groups').value];
			item.time  			= ["Time Spent:", $('time').value];
			item.addl  			= ["Additional Comments:", $('addl').value];
		
		
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("This activity has been added.");
		
	
	}
	
	function getRangeValue() {
		var r = document.forms[0],
			range = r['time'],
			amt = r['amt'],
			cachedRangeValue = localStorage.rangeValue ? localStorage.rangeValue : 5;
			range.value = cachedRangeValue;
			amt.value = cachedRangeValue;
			range.addEventListener("change", function() {
				amt.value = range.value;
			}, false);
	
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			autoFillData();
			alert("There are no activities currently saved, default data has been added.")
		}
		getRangeValue();
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
			getImage(obj.group[1], makeSubList);
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
	//Get the image for chosen group
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "../images/" + catName + ".png");
		image.Li.appendChild(newImg);
	}
	
	//JSON Object for auto populate 
	function autoFillData(){
		json = {
			"contact1": {
				"name": ["Name: ", "Cody Farrah"],
				"age": ["Age: ", "25"],
				"gender": ["Gender: ", "Male"],
				"date": ["Date: ", "12/12/2012"],
				"actName": ["Activty Name: ", "Olivia"],
				"group": ["Group: ", "Book"],
				"time": ["Time: ", "10"],
				"addl": ["Additional Comments: ", "She really relates!"]
			},
			"contact2": {
				"name": ["Name: ", "Clarity Farrah"],
				"age": ["Age: ", "4"],
				"gender": ["Gender: ", "Female"],
				"date": ["Date: ", "11/11/2012"],
				"actName": ["Activty Name: ", "The Giving Tree"],
				"group": ["Group: ", "Book"],
				"time": ["Time: ", "15"],
				"addl": ["Additional Comments: ", "Great read!"]
			},
			"contact3": {
				"name": ["Name: ", "Rob Farrah"],
				"age": ["Age: ", "85"],
				"gender": ["Gender: ", "Male"],
				"date": ["Date: ", "10/10/2012"],
				"actName": ["Activty Name: ", "Olivia"],
				"group": ["Group: ", "Book"],
				"time": ["Time: ", "25"],
				"addl": ["Additional Comments: ", "None"]
			}
			
		};
		
		//Store the JSON OBJECT into Local Storage
		for(var n in json){	
			var id = Math.floor(Math.random()*10000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};
	
	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Activity";
		editLink.addEventListener("click", editItem);
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
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//Populate the form fields with current localStorage values.
		$('name').value = item.name[1];
		$('age').value = item.age[1];
		var radios = document.forms[0].gender
		for (var i=0; i<radios; i++){
			if(radios[i].value == "Male" && item.gender[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && item.gender[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('date').value = item.date[1];
		$('actName').value = item.actName[1];
		$('groups').value = item.group[1];
		$('time').value = item.time[1];
		$('addl').value = item.addl[1];
		
		//Remove the listener from the input 'save' button.
		saveData.removeEventListener("click", storeData);
		//Change Submit value to say edit.
		$('submit').value = "Edit Activity";
		var editSubmit = $('submit');
		//Save the key value established in this function as a property of the editSubmit
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	
	function deleteItem(){
		var ask = confirm("Delete this Activity?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Activity was Deleted.");
			window.location.reload();
		}else{
			alert("Activity was NOT deleted.")
		}
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
	
	function validate(e){
		//Define the elements we want to check
		var getName = $('name');
		var getAge = $('age');
		var getDate = $('date');
		var getActName = $('actName');
		var getGroup = $('groups');
		
		//Reset Error Messages
		errMsg.innerHTML = "";
		getName.style.border = "1px solid black";
		getAge.style.border = "1px solid black";
		getDate.style.border = "1px solid black";
		getActName.style.border = "1px solid black";
		getGroup.style.border = "1px solid black";
		
		//Get Error Messages
		var messageAry = [];
		
		//Name Validation
		if(getName.value === ""){
			var nameError = "Please enter a name.";
			getName.style.border = "1px solid red";
			messageAry.push(nameError);
		}
		
		//Age Validation
		if (getAge.value === ""){
			var ageError = "Please enter an Age.";
			getAge.style.border = "1px solid red";
			messageAry.push(ageError);
		}
		
		//Date Validation
		if (getDate.value === ""){
			var dateError = "Please enter an Age.";
			getDate.style.border = "1px solid red";
			messageAry.push(dateError);
		}
		
		//Activity type validation
		if (getActName.value === ""){
			var actNameError = "Please enter an Age.";
			getActName.style.border = "1px solid red";
			messageAry.push(actNameError);
		}
		
		//Group Validation
		if(getGroup.value === "--What kind of activity was it?--"){
			var groupError = "Please choose what kind of Activity this was.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		
		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//if no errors save data.  Send key value (which came from the editData function).
			//Remember this key value was passed through the editSubmit even listener as a property.
			storeData(this.key);
		}
		
	}
	
	getRangeValue();
	makeCats();
	
	//Set Link & Submit Click Events
	var displayData = $("displayData")
	displayData.addEventListener("click", getData);
	var clearData = $("clearData");
	clearData.addEventListener("click", clearLocal);
	var saveData = $("submit");
	saveData.addEventListener("click", validate);
	
});
