const express = require('express');

// create new express app and save it as "app"
const server = express();

// server configuration
const PORT = 9000;

// create a route for the app
server.get('/', (req, res) => {
  res.send('Hello World');
});



server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
  });


module.exports=server;