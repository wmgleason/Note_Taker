var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// trying to solve the window undefined issue
// const url = window.location.origin;
// going to convert everything to Jquery for asynchronicity
// start having the server listen for requests
// app.listen(process.env.PORT || 3000, 
// 	() => console.log("Server is running..."));

// if (window.location.pathname === '/notes') {
  // noteTitle = document.querySelector('.note-title');
  // noteText = document.querySelector('.note-textarea');
  // saveNoteBtn = document.querySelector('.save-note');
  // newNoteBtn = document.querySelector('.new-note');
  // noteList = document.querySelectorAll('.list-container .list-group');
// }

// Show an element
// const show = (elem) => {
//   elem.style.display = 'inline'; 
// };

// Hide an element
// const hide = (elem) => {
//   elem.style.display = 'none';
// };

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

//changing all of these functions to use Ajax asynchronous requests to the server
const getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json'
    });
  };

  const saveNote = function(note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
    });
  };

// A function for deleting a note from the db
const deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

const renderActiveNote = function() {
  $saveNoteBtn.hide();
  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } 
  else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

const handleNoteSave = function() {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};


// Delete the clicked note
const handleNoteDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};


// Sets the activeNote to an empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// Save button is only visible when there is something to save -
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  var jsonNotes = await notes.json();
  var noteListItems = [];

    noteList.forEach((el) => (el.innerHTML = ''));
  };



  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });


    noteListItems.forEach((note) => noteList[0].append(note));


// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);
getAndRenderNotes();
