"use strict";

/* Todo list API 



	Example: (some example code)
	var test = new todoList();
	test.addItem('do inventor stuff');
	test.addItem('wowzer');
	test.addItem('another item!!');
	test.getList();
	test.deleteItem(2);
	test.getList();

*/
const _devMode = 1;

class todoList {

	constructor() {
		this.todoCategories = ['null'];	
		this.todoListPointer = [];
		
		if (_devMode)
			console.log ("To-Do List Initialized.");
	}
	
	/* DEBUG Command */
	getList() {
		if (_devMode) {
			var todoListLength = this.todoListPointer.length;
			console.clear();
			console.log("DRN's SUPER TO-DO LIST API");
			console.log("");
			console.log("List Length: " + todoListLength);
			console.log(" ");
			console.log("id  description  catid");
			console.log("----------------------");
			if ( todoListLength ) {
				for (var i = 0; i < todoListLength; i++) {
					console.log ( i + " " + this.getItemByIndex( i ) + " " + this.getCatByIndex( i ));
				}
				
			} else {
				console.log("List is Empty");
			}
			
			console.log("");
			console.log("Categories: " + this.getCatLength());
			console.log(" ");
			console.log("id  description ");
			console.log("----------------------");
			if ( this.getCatLength() ) {
				
				for (var j = 0; j < this.getCatLength(); j++) {
					console.log ( j + " " + this.getCatNameByCatIndex( j ));
				}
				
			} else {
				console.log("List is Empty");
			}
		}
	}
		
	/*  Retrieve Commands */
	getItemByIndex( index ) {
		return this.todoListPointer[index].getItem();
	}
	
	getCatByIndex( index ) {
		return this.todoListPointer[index].getCategory();
	}
	
	/*new*/
	getCatNameByCatIndex( index ) {
		return this.todoCategories[index];
	}
	
	getListLength() {
		return this.todoListPointer.length;
	}
	
	getCatLength() {
		return this.todoCategories.length;
	}
	
	/* HTML Commands */
	getListToContainer( containerID ) {
		var list_string;
		
		//Start an initial table
		list_string = "<ul>";
		
		for (var i = 0; i<this.getListLength(); i++) {
			list_string += "<li id='todoListItem'>" + this.getItemByIndex(i) + "</li>";
		}
		
		//End table
		list_string += "</ul>";
		
		//Place list in HTML element
		document.getElementById( containerID ).innerHTML = list_string;
	}

	/* Edit Commands */
	editItemByIndex( index, itemName ) {
		this.todoListPointer[index].setName( itemName );
	}
	
	editCatByIndex( index, catid ) {
		this.todoListPointer[index].setCategory( catid );
	}
	
	/* Add/Remove Commands */
	addItem(itemName, catIndex) {
		this.todoListPointer.push( new todoListItem( itemName, catIndex) );
	}
	
	addCat( catName ) {
		this.todoCategories.push( catName );
	}
	
	deleteItem( index ) {
		/*
		if the pointer is delete, the
		item will no longer be reachable.
		The garbage collector should
		take care of the memory at this
		point.
		*/
		this.todoListPointer.splice(index, 1);
	}
	
	deleteCat( index ) {
		//Do not delete null default cat
		if ( (this.todoCategories.length > 1) && (index != 0) ) {
			
			//Check for anything that is in this cat and move it to null
			//Also check to move everything above the deleted cat to the cat below
			//  Everything moves down an index
			for (var listid = 0; listid<this.getListLength(); listid++) {
				var catID = this.getCatByIndex( listid );
				
				if ( catID == index ) {
					this.editCatByIndex( listid, 0 );
				}
				
				if ( catID > index ) {
					this.editCatByIndex( catID, (catID - 1) );
				}
			}
		
			//Remove Cat
			this.todoCategories.splice(index, 1);
		}
		
	}
	
}

class todoListItem {
	constructor(item, cat) {
		this.itemName = item;
		
		if (cat === undefined)
			this.catIndex = 0;
		else
			this.catIndex = cat;
	}
	
	getItem() {
		return this.itemName;
	}
	
	getCategory() {
		return this.catIndex;
	}
	
	setName( newName ) {
		this.itemName = newName;
	}
	
	setCategory( newCat ) {
		this.catIndex = newCat;
	}
}

module.exports = todoList;