const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 10, -10), scene);
camera.attachControl(canvas, true);

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);

const client = new Colyseus.Client('ws://localhost:2556');

client.join("my_room").then(room => {
    const playerShapes = {};

    room.onStateChange((state) => {
        for (const playerId in state.players) {
            const player = state.players[playerId];
            if (!playerShapes[playerId]) {
                const newShape = BABYLON.MeshBuilder.CreateBox(`playerShape_${playerId}`, { size: 1 }, scene);
                playerShapes[playerId] = newShape;
            }
            playerShapes[playerId].position.x = player.position.x;
            playerShapes[playerId].position.z = player.position.z;
        }
    });

    room.state.players.onAdd = (player, key) => {
        const newShape = BABYLON.MeshBuilder.CreateBox(`playerShape_${key}`, { size: 1 }, scene);
        playerShapes[key] = newShape;
    };

    room.state.players.onRemove = (player, key) => {
        const shape = playerShapes[key];
        if (shape) {
            shape.dispose();
            delete playerShapes[key];
        }
    };

    // Example for moving player shape
    window.addEventListener("keydown", (event) => {
        const deltaX = event.key === "ArrowRight" ? 0.1 : event.key === "ArrowLeft" ? -0.1 : 0;
        const deltaZ = event.key === "ArrowUp" ? 0.1 : event.key === "ArrowDown" ? -0.1 : 0;

        room.send('input', {
            position: { x: deltaX, z: deltaZ },
            shapeData: null // You can send shape data here if needed
        });
    });

    engine.runRenderLoop(() => {
        scene.render();
    });
});