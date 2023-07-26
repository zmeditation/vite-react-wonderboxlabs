import React, { useEffect, useRef } from 'react'
import { MeshNormalMaterial, BoxBufferGeometry, Vector3, Mesh, BufferGeometry, Material } from 'three'
import { Text } from '@react-three/drei'
import { MoveMsg } from '../../utils/msgs'

const UserWrapper = ({ position, rotation, id }: MoveMsg) =>
{
    const mesh = useRef<Mesh>(null!)
    useEffect(() =>
    {
        mesh.current.position.fromArray(position)
        mesh.current.rotation.fromArray(rotation)
    }, [position, rotation])
    return (
        <mesh
            geometry={new BoxBufferGeometry(1, 4)}
            material={new MeshNormalMaterial()}
            ref={mesh}
        >
            {/* Optionally show the ID above the user's mesh */}
            <Text
                position={[0, 3.0, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {id}
            </Text>
        </mesh>
    )
}

export default UserWrapper