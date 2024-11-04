const { Server } = require('colyseus');
const { Schema, MapSchema } = require('@colyseus/schema'); // Correct import for Schema

class Player extends Schema {
    constructor() {
        super();
        this.position = new Schema();
        this.shapeData = null;
    }
}

class MyRoom extends Schema {
    constructor() {
        super();
        this.players = new MapSchema();
    }

    onCreate(options) {
        this.onMessage("input", (client, message) => {
            const player = this.players[client.sessionId];
            if (player) {
                player.position.x += message.position.x; // Update position based on input
                player.position.z += message.position.z;
                player.shapeData = message.shapeData;
            }
        });
    }

    onJoin(client) {
        const player = new Player();
        player.position = { x: 0, z: 0 };
        this.players[client.sessionId] = player;
    }

    onLeave(client) {
        delete this.players[client.sessionId];
    }
}

const gameServer = new Server();
gameServer.define('my_room', MyRoom);
gameServer.listen(2556);
console.log("Server is running on ws://localhost:2556");