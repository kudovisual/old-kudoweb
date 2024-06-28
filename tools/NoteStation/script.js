const editor = document.getElementById('editor');
const saveButton = document.getElementById('saveButton');
const fileInput = document.getElementById('fileInput');

// Load saved content from local storage, if any
if (localStorage.getItem('kudovisual-notepad')) {
    editor.value = localStorage.getItem('kudovisual-notepad');
}

// Save content to local storage when typing stops (using a timeout)
let typingTimer;
editor.addEventListener('input', function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {
        localStorage.setItem('kudovisual-notepad', editor.value);
    }, 1000);
});

// Save content to a file when "Save" button is clicked
saveButton.addEventListener('click', function() {
    const textToSave = editor.value;
    const blob = new Blob([textToSave], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'kudovisual-notepad.txt');
});

// Load file content into the editor when a file is selected
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        editor.value = e.target.result;
        localStorage.setItem('kudovisual-notepad.txt', editor.value);
    };
    reader.readAsText(file);
});
