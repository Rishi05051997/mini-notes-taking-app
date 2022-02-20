

// Add note to local storage
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function (e) {

  let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("note-text");

  if (addTitle.value == "" || addTxt.value == "") {
    return alert("Please add Note Title and Details")
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="note form container-card xxl-card-width pad-md mar-y-2">
            <div class="note-counter text-4">Note ${index + 1}</div>
            <h3 class="note-title head-2 highlightMainText"> ${element.title} </h3>
            <p class="note-text text-3 bold"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn btn btn-danger mar-y-3 text-2">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn btn btn-success mar-y-3 text-2">Edit Note</button>
        </div>
            `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h3 class="note-title text-3 bold">No Notes Yet! Add a note using the form above.</h3>`;
  }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);
  let confirmDel = confirm("Delete this note?");
  if (confirmDel == true) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }

}

// Function to Edit the Note
function editNote(index) {
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("note-text");

  if (addTitle.value !== "" || addTxt.value !== "") {
    return alert("Please clear the form before editing a note")
  }

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  console.log(notesObj);

  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addTxt.value = element.text;
  })
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


showNotes();