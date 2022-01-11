'use strict';

const express = require('express');

const app = express();

const messages = [];
class Message {
  constructor(text, author) {
    this.text = text;
    this.author = author;
  }
}

app.get('/message', (req, res) => {
  console.log('request sent!: ', req.method);


  res.send('Here\'s a message');

});

function createMessage(req, res, next) {

  const messageText = req.query.text;
  const authorName = req.query.author;

  console.log('createMessage hit');

  if (!messageText || !authorName) {
    next('No text or author found');
  } else {
    // create new message
    const message = new Message(messageText, authorName);

    req.message = message;
    next();
  }
}

function saveMessage(req, res, next) {

  console.log('data added to the request - req.message: ', req.message);
  let message = req.message;
  messages.push(message);
  next();
}

// create message with createMessage
// save message with saveMessage
app.post('/message', createMessage, saveMessage, (req, res, next) => {
  // send message back to client
  res.send(messages);
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.send('Error handler hit!');
});

// runs if handlers aren't triggered
app.use((req, res) => {
  res.status(404).send('No data found');
});

module.exports = {
  // export start as method
  // listens on given port
  start: function (port) {
    app.listen(port, () => {
      console.log('Server is listening on: ', port);
    });
  },
  // export app
  app,
};