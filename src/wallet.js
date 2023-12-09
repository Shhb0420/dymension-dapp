import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC);
const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
export default wallet;