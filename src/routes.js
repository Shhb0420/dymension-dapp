import MintNFT from "pages/MintNFT/MintNft";
import Auction from "pages/Auction/Auction";
import MyItems from "pages/MyItems/MyItems";

const routes = [
    {
        path: "/",
        component: Auction
    },
    {
        path: "/mint-nft",
        component: MintNFT
    },
    {
        path: "/my-items",
        component: MyItems
    }
]

export default routes