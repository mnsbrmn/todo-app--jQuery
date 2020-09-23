// storing key for local storage in variable
const LOCAL_STORAGE_TODO_KEY = "todo.list";

// getting data from local storage and storing as a array in variable and if no data is available, creating a blank array
var todoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) || [];

// function for form submition
$("#todoForm").submit(function (e) {
	//preventin default form submission
	e.preventDefault();

	// validating input for blank submission
	if ($("#todoTextInput").val() == null || $("#todoTextInput").val() === "") {
		console.log("black");

		return;
	} else {
		//function to creat the todo array
		const todo = { id: Date.now().toString(), todo: $("#todoTextInput").val(), complete: false };

		// // cleanig the input area
		$("#todoTextInput").val("");

		// adding the todo array at 1st position
		todoList.unshift(todo);

		// calling function to save todoList array in local storage and displaying in browser
		saveAndDisplay();
	}
});

//creating instance for Date
var date = new Date().toDateString();

// creating p element to display date
// adding current date to p element for date
// appending date element to header section
$("#date").add("p").text(date);

// function to diplay date in browser
function display() {
	// calling function to clear if any child element present in ul
	clearTodos();

	// going through each object on todoList array and adding them to ul
	todoList.forEach((todo) => {
		// creating variable to add check uncheck option in checkbox
		var checked = "";

		// checking if complete in todoList object is true or false
		if (todo.complete == true) {
			checked = "checked";
		} else {
			checked = "";
		}

		//adding li element and its childrens in ul as shown below
		/**
		 * <li class="todoItem">
			<input type="checkbox" class="checkBox" id="checkBox" />
			<label for="checkBox" class="todoLabel">
				coding
			</label>
			<span class="customCheckbox"></span>
			<span class="blank"></span>
			<span id="deletebtn">X</span>
		</li>
		 */

		const html = `<li class='todoItem' id="${todo.id}">
				<input type='checkbox' class='checkBox' id="${todo.id.substring(todo.id.length - 5)}" ${checked} />
				<label contenteditable for="${todo.id.substring(todo.id.length - 5)}" class='todoLabel' onclick='taskCompleted("${todo.id}")'>${todo.todo}</label>
				<span class='customCheckbox' onclick='taskCompleted("${todo.id}")'></span>
				<span class='blank'></span>
				<span id='deletebtn' onclick='deleteTodo("${todo.id}")'>X</span>
			</li>`;
		// const newLi = htmlLi;
		$("#todoList").append(html);
	});
}

// function to save data in local storage
function save() {
	localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todoList));
}

// function to clean child elements of ul
function clearTodos() {
	$("#todoList").empty();
}

// function to save todoList array in local storage and displaying in browser
function saveAndDisplay() {
	save();
	display();
}

// calling display function to display todoList in browser
display();

// toggling true and false in todoList object complete key
function taskCompleted(id) {
	var todoIndex = todoList.findIndex((todo) => todo.id == id);

	if (todoList[todoIndex].complete == false) {
		todoList[todoIndex].complete = true;
	} else {
		todoList[todoIndex].complete = false;
	}
	setTimeout(() => {
		saveAndDisplay();
	}, 500);
}

// function to delete todo
function deleteTodo(id) {
	// filtering objects dont having id not elqual to id passed in function and adding them to todoList again
	todoList = $.grep(todoList, function (todo) {
		return todo.id != id;
	});

	// calling function to save todoList array in local storage and displaying in browser
	saveAndDisplay();
}

// deleting completed todos
$("#btnDeleteCompleted").click(() => {
	// filtering objects dont having complete as true and adding them to todoList again
	todoList = $.grep(todoList, function (todo) {
		return todo.complete != true;
	});

	// calling function to save todoList array in local storage and displaying in browser
	saveAndDisplay();
});

// deleting all todos
$("#btnDeleteAll").click(() => {
	todoList = [];

	// calling function to save todoList array in local storage and displaying in browser
	saveAndDisplay();
});
