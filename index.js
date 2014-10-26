// Load native UI library
var gui = require('nw.gui');

// We can not create a clipboard, we have to receive the system clipboard
var clipboard = gui.Clipboard.get();

// Read from clipboard
var text = clipboard.get('text');
console.log(text);

// Or write something
clipboard.set('I love node-webkit :)', 'text');

// And clear it!
clipboard.clear();
