// This example worker runs asynchronous tasks. In practice, this could be
// interacting with a database or a web service. The asynchronous function
// returns a promise which resolves with the task's result.

var workerpool = require('workerpool');

// an async function returning a promise
function asyncAdd (a, b) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      const dateObj = new Date();
      const month = monthNames[dateObj.getMonth()];
      const day = String(dateObj.getDate()).padStart(2, '0');
      const year = dateObj.getFullYear();
      const hour = dateObj.getHours();
      const min = dateObj.getMinutes();
      const secs = dateObj.getSeconds();
      const output = month + day  + ',' + year + '-'+ hour +':'+min+':'+secs;

      console.log(output);
      resolve(a + b);
    }, 10000);
  });
}

// an async function returning a promise
function asyncMultiply (a, b) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(a * b);
    }, 2000);
  });
}

// create a worker and register public functions
workerpool.worker({
  asyncAdd: asyncAdd,
  asyncMultiply: asyncMultiply
});