var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(5000, () => console.log(`Server listening on ${5000}`));




io.on("connection", socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on("announce", input => {
    socket.broadcast.emit("announce","Hello!")
  });
});
