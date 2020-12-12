module.exports = (socket, msg) => {
  socket.emit('example-response', { msg });
};
