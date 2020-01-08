/*
You can add breakpoints to your applications by inserting 
the debugger statement into your codebase.
*/

function add (a, b) {
    debugger
    return a + b
  }
  
  var res = add('apple', 4)


  //command to install "node-inspector", debugger in chrome
  //npm install -g node-inspector
  
  //command to start using it
 // node-debug index.js --debug-brk