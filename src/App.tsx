import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, Stats } from "@react-three/drei";
import { MeshNormalMaterial, BoxBufferGeometry } from "three";
import { io, Socket } from "socket.io-client";
import Player from "./components/Player/Player";
import World from "./components/world";
import ControlsWrapper from "./components/Networking/controlsWrapper";
import UserWrapper from "./components/Networking/userWrapper";
import "./App.css";
import { Clients } from "./utils/msgs";

function App() {
  const [socketClient, setSocketClient] = useState<Socket>(null!);
  const [clients, setClients] = useState<Clients>({});

  useEffect(() => {
    // On mount initialize the socket connection
    setSocketClient(io());
    // Dispose gracefuly
    return () => {
      if (socketClient) socketClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketClient) {
      socketClient.on("move", (clients) => {
        setClients(clients);
      });
    }
  }, [socketClient]);

  return (
    socketClient && (
      <Canvas
        camera={{
          position: [0, 4, 5],
          rotation: [0, 0, 0],
          near: 0.1,
          far: 1000,
        }}
      >
        <Stats />
        <ControlsWrapper socket={socketClient} />
        <Player />
        <pointLight intensity={2} position={[0, 4, 4]}></pointLight>
        <World />

        {/* Filter myself from the client list and create user boxes with IDs */}
        {Object.keys(clients)
          .filter((clientKey) => clientKey !== socketClient.id)
          .map((client) => {
            const { position, rotation } = clients[client];
            console.log("position", position, rotation);
            return (
              <UserWrapper
                key={client}
                id={client}
                position={position}
                rotation={rotation}
              />
            );
          })}
      </Canvas>
    )
  );
}

export default App;
