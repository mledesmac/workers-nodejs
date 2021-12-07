
const workerpool = require('workerpool');
const router = require('express').Router();
const express = require('express');


const app = express();

// create a worker pool using an the asyncWorker. This worker contains
// asynchronous functions.
const pool = workerpool.pool(__dirname + '/worker.js', {maxWorkers:1 });
console.log(pool);


app.get('/', (req, res) => {
  
  pool.proxy()
  .then( async(worker) =>  {
    //console.log(pool.stats());
    const response = await worker.asyncAdd(3, 4.1);
    pool.terminate();
    //console.log(pool.stats());
    return res.send('response' + response);
  })
  
});



// * Startup
const port = 8181;
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Listening to request on ${'localhost'}:${port}`);
});
