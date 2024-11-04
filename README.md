
---

# Babylon Shape Extrusion with Colyseus

## Overview

The Babylon Shape Extrusion multiplayer game is built using BabylonJS and ColyseusJS. In this game, players can create 2D shapes, extrude them into 3D objects, and move them around a shared 3D space. The movements and shapes created by players are synchronized in real-time, allowing for an interactive multiplayer experience.

## Table of Contents
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Core Components](#core-components)
- [Gameplay Mechanics](#gameplay-mechanics)
- [Real-time Synchronization](#real-time-synchronization)
- [User Interface](#user-interface)
- [Testing the Application](#testing-the-application)
- [Error Handling](#error-handling)
- [Thought Process](#thought-process)
- [Contributing](#contributing)
- [License](#license)

## Features
- Draw 2D shapes using a simple interface.
- Extrude 2D shapes into 3D objects with a fixed height.
- Move 3D objects around a shared ground plane.
- Real-time updates of shapes and movements for all connected players.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd babylon-shape-extrusion
   ```

2. **Install Dependencies**:
   Make sure to have Node.js installed. Navigate to your project directory and run:
   ```bash
   npm install
   ```

3. **Start the Server**:
   You need to set up a Colyseus server. In your project directory, run:
   ```bash
   npm start
   ```

4. **Open the Application**:
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your server configuration) to view and interact with the game.

## Core Components

### BabylonJS
BabylonJS is used for rendering the 3D graphics. Key components include:
- **Scene**: The environment where the game takes place.
- **Camera**: To navigate through the 3D space.
- **Mesh**: To create and manipulate the 3D objects derived from 2D shapes.

### ColyseusJS
ColyseusJS is the framework used for multiplayer functionality. It helps manage game state and player interactions in real-time. Key components include:
- **Room**: The space where players connect and interact.
- **State**: Manages the current state of the game, including player positions and shapes.

## Gameplay Mechanics

1. **Drawing 2D Shapes**:
   - Players can click on a canvas to create points that define a 2D shape.
   - Once completed, the shape can be extruded into a 3D object.

2. **Extruding to 3D**:
   - Each 2D shape can be extruded into a 3D object with a fixed height.
   - The extruded shape is added to the BabylonJS scene.

3. **Moving 3D Objects**:
   - Players can move their 3D objects on the ground plane using keyboard inputs or mouse dragging.
   - Movement is synchronized across all clients using Colyseus.

## Real-time Synchronization
All player movements and shape creations are synchronized in real-time. Colyseus handles the communication between clients and the server, ensuring that all connected players see the same game state.

## User Interface
The UI is designed for simplicity:
- A drawing area for creating 2D shapes.
- Buttons for extruding shapes and moving them.
- A visual representation of all players and their shapes in the 3D space.

## Testing the Application
- Open multiple browser windows to simulate different players.
- Create and extrude shapes in each window.
- Move the shapes and observe real-time synchronization across all clients.

## Error Handling
- The application includes basic error handling for invalid shape creation (e.g., too few points).
- Users will be notified if there are issues with connection or synchronization.

## Thought Process
The main challenge in this project was to integrate BabylonJS for 3D rendering and Colyseus for real-time multiplayer functionality. I focused on creating a seamless user experience where players can easily create shapes, visualize them in 3D, and interact with others. Real-time synchronization was implemented using Colyseus's state management features, ensuring that all players see the same game environment.

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---
