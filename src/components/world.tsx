import { Plane } from "@react-three/drei"
import NFTPaint from "./NFT/NFTPaint";
import React from 'react'
const World = () =>
{
    return (
        <group position={[0, 0, 0]}>
            <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 1]} >
                <meshStandardMaterial color={'white'} />
            </ Plane>
            <Plane position={[0, 2.5, -25]} rotation={[0, 0, 0]} scale={[50, 5, 1]} >
                <meshStandardMaterial color={'red'} />
            </ Plane>
            <Plane position={[-25, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} scale={[50, 5, 1]} >
                <meshStandardMaterial color={'white'} />
            </ Plane>
            <Plane position={[0, 2.5, 25]} rotation={[0, Math.PI, 0]} scale={[50, 5, 1]} >
                <meshStandardMaterial color={'white'} />
            </ Plane>
            <Plane position={[25, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[50, 5, 1]} >
                <meshStandardMaterial color={'white'} />
            </ Plane>
            <NFTPaint contract="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" itemId="5673" />
        </group>
    );
}

export default World