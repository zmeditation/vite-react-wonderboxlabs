import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import usePlayerControls from '../usePlayerControls/usePlayerControls';
import React from 'react';

const Player = (props: any) =>
{
    const { camera } = useThree()
    const {
        forward,
        backward,
        left,
        right,
        speed,
        setspeed
    } = usePlayerControls()

    useFrame(() =>
    {
        const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward))
        const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0)

        const direction = new THREE.Vector3()
        //calculate direction aligned with the camera
        direction.subVectors(frontVector, sideVector).normalize().applyEuler(camera.rotation)
        direction.setY(0).normalize().multiplyScalar(speed)
        camera.position.add(direction)
    })

    return (
        // null
        <PointerLockControls onLock={() => setspeed(0.2)} onUnlock={() => setspeed(0)} {...props} />
    )
}

export default Player