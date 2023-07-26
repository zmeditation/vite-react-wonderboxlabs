import { Plane, useTexture } from "@react-three/drei"
import React, { useEffect, useRef, useState } from "react"
import { fetchNft } from "./NFTFetcher"
import { NftMetadata } from "use-nft"
import { TextureLoader } from "three"
import { useControls } from "leva"

function NFTPaint(props: { contract: string, itemId: string }): JSX.Element
{
    const [nftMetadata, setNftMetadata] = useState<NftMetadata>()

    const material: any = useRef()
    const { nftContract, nftid } = useControls({
        nftContract: props.contract,
        nftid: props.itemId
    })
    useEffect(() =>
    {
        fetchNft(nftContract, nftid)
            .then((v) =>
            {
                setNftMetadata(v)
                console.log(v);
            }, (a) => console.log("rejected")
            )
    }, [nftContract, nftid])

    useEffect(() =>
    {
        if (nftMetadata)
        {
            const textureLoader = new TextureLoader()
            textureLoader.load(nftMetadata.image, (t) =>
            {
                material.current.map = t
                material.current.needsUpdate = true
            })
        }
    }, [nftMetadata])
    return (
        <Plane scale={[5, 5, 5]} position={[0, 5, 0]} >
            < meshStandardMaterial ref={material} />
        </Plane>
    )
}
export default NFTPaint