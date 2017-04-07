
var todoAPI = require('./todo_api');
var todoExample = new todoAPI();

function getListToContainerByCat_Radio() {
		var list_string="<form>";
		
		
		for (var catid=0; catid<todoExample.getCatLength(); catid++) {
			list_string += "<p>" + todoExample.getCatNameByCatIndex(catid) + "</p>";
			for (var i = 0; i<todoExample.getListLength(); i++) {
				if (todoExample.getCatByIndex(i) == catid) {
					list_string += "<input type='radio' name='todoListItemRadio' id='todoListItemRadio' value='" + i + "'>" + todoExample.getItemByIndex(i) + "<br>";
				}
			}
			//End table
			
		}
		list_string += "</form>";
		
		
		
		//Place list in HTML element
		document.getElementById( "listContainer" ).innerHTML = list_string;
}

function getCatToContainer_Radio() {
		var list_string="<form>";
		
		for (var catid=0; catid<todoExample.getCatLength(); catid++) {
			list_string += "<input type='radio' name='todoCatItemRadio' id='todoCatItemRadio' value='" + catid + "'>" + todoExample.getCatNameByCatIndex(catid) + "<br>";
		}
		
		list_string += "</form>";
		
		
		
		//Place list in HTML element
		document.getElementById( "catContainer" ).innerHTML = list_string;
}

function userAddCategory() {
	var elText = document.getElementsByName('todoCat')[0].value;
	
	//only add if not null
	if ( elText != "" ) {
		todoExample.addCat( elText );
	}
	
	//update catlist
	updateAll();
}

function userAddItem() {
	var elText = document.getElementsByName('todoDesc')[0].value;
	var selValue = document.getElementsByName('todoCatItemRadio');
	var selCat = 0;
	
	//loop through all
	for (var i=0; i<selValue.length; i++) {
		if (selValue[i].checked) {
			selCat = selValue[i].value;
		}
	}
	
	//only add if not null
	if ( elText != "" ) {
		todoExample.addItem( elText, selCat );
	}
	
	
	
	updateAll();

}

function userEditItem() {
	var elText = document.getElementsByName('todoDesc')[0].value;
	var selValue = document.getElementsByName('todoCatItemRadio');
	var selCat = 0;
	
	//Get Cat
	for (var i=0; i<selValue.length; i++) {
		if (selValue[i].checked) {
			selCat = selValue[i].value;
		}
	}

	selValue = document.getElementsByName('todoListItemRadio');
	var selItem = 0;
	
	// Get item
	for (var i=0; i<selValue.length; i++) {
		if (selValue[i].checked) {
			selItem = selValue[i].value;
		}
	}
	
	//only add if not null
	if ( elText != "" ) {
		todoExample.editItemByIndex( selItem, elText);
	}
	
	todoExample.editCatByIndex( selItem, selCat );
	
	updateAll();
	
}

function userDelCategory() {
	var selValue = document.getElementsByName('todoCatItemRadio');
	
	//loop through all
	for (var i=0; i<selValue.length; i++) {
		if (selValue[i].checked) {
			todoExample.deleteCat ( selValue[i].value );
		}
	}
	
	updateAll();
}

function userDelItem() {
	var elText = document.getElementsByName('todoDesc')[0].value;
	var selValue = document.getElementsByName('todoListItemRadio');
	
	//loop through all
	for (var i=0; i<selValue.length; i++) {
		if (selValue[i].checked) {
			todoExample.deleteItem ( selValue[i].value );
		}
	}
	
	updateAll();
}

function updateAll() {
	getCatToContainer_Radio();
	getListToContainerByCat_Radio();
	todoExample.getList();
	document.getElementsByName('todoCat')[0].value="";
	document.getElementsByName('todoDesc')[0].value="";
	
}

//Init
updateAll();

//Events
document.getElementsByName('todoCatSubmit')[0].addEventListener("click", userAddCategory, false);

document.getElementsByName('todoCatSubmit')[1].addEventListener("click", userDelCategory, false);

document.getElementsByName('todoEdit')[0].addEventListener("click", userEditItem, false);

document.getElementsByName('todoAdd')[0].addEventListener("click", userAddItem, false);

document.getElementsByName('todoDel')[0].addEventListener("click", userDelItem, false);




