const Colyseus = require('colyseus');
const express = require('express');
const http = require('http');
const path = require('path');
const { WebSocketTransport } = require('@colyseus/ws-transport');

const port = process.env.PORT || 2567;

class State {
  constructor() {
    this.shapes = new Map();
  }
}

class GameRoom extends Colyseus.Room {
  onCreate(options) {
    this.setState(new State()); // Initialize room state

    this.onMessage('createShape', (client, data) => {
      this.state.shapes.set(client.sessionId, {
        position: data.position,
        shapeData: data.shapeData,
        color: data.color,
      });
    });

    this.onMessage('moveShape', (client, data) => {
      const shape = this.state.shapes.get(client.sessionId);
      if (shape) {
        shape.position = data.position;
      }
    });

    this.onMessage("deleteShape", (client) => {
      this.state.shapes.delete(client.sessionId);
    });
  }

  onJoin(client, options) {}

  onLeave(client, consented) {
    this.state.shapes.delete(client.sessionId);
  }
}

const app = express();
const server = http.createServer(app);

const transport = new WebSocketTransport({
  server: server
});

const gameServer = new Colyseus.Server({
  transport: transport
});

gameServer.define('game', GameRoom);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
