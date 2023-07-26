import { ethers } from "ethers"
import { FetcherDeclarationEthers, FetchWrapper, NftMetadata } from "use-nft"

const fetcher: FetcherDeclarationEthers = ["ethers", { provider: ethers.getDefaultProvider() }]
const fetchWrapper: FetchWrapper = new FetchWrapper(fetcher)

export async function fetchNft(contract: string, itemId: string): Promise<NftMetadata>
{
    const ret = await fetchWrapper.fetchNft(contract, itemId)
    return ret
}