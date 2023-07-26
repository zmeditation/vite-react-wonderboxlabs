import React, { useEffect } from "react"
import { useThree } from "@react-three/fiber";
import * as c from "./config.json"
import { MoveMsg } from "../../utils/msgs";
import { Socket } from "socket.io-client";

const ControlsWrapper = ({ socket }: { [key: string]: Socket }): null =>
{
    const { camera } = useThree()

    const sendPosition = () =>
    {
        const { id } = socket
        const posArray: number[] = []
        const rotArray: number[] = []

        camera.position.toArray(posArray)
        camera.rotation.toArray(rotArray)
        const msg: MoveMsg = {
            id: id,
            position: posArray,
            rotation: rotArray,
        }

        socket.emit('move', msg)
    }
    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            sendPosition();
        }, 1 / c.clientTickRate * 1000);
        return () => clearInterval(interval);
    }, []);
    return null
}

export default ControlsWrapper