import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import EventEmitter from 'events';

const eventemitter = new EventEmitter();
var receiveddata = null;
const array=['']

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("hello");
});

app.post('/sendmessage', (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);
  io.emit('receive_message', message);
  res.status(200).send({ success: true });
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('send_message', (data) => {
    console.log("socket listening to:", data, socket.id);
  });

  socket.on('Set', (data) => {
    receiveddata = data;
    eventemitter.emit('newData', data);
    console.log(`i got ${data}`);
    io.emit('permission', data);
    while(array.length>0){
      array.pop();
    }
  });

  socket.on('send_name', (data) => {
    console.log('send_name: ', data);
    array.push(data)
    console.log('length of array',array.length)
  });

  socket.on('array',()=>{
    console.log('got the news sending you the array')
    io.emit('arraydata',array)
  })

  console.log("newdata", receiveddata);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});
