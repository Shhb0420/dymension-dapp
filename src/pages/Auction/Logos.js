import React from 'react'
import { Logo, Arunika, Dymension } from "styles/images";

const Logos = ({navigate}) => {

  return (
    <div
    className="
        flex
        flex-row
        items-center
        justify-between
        gap-3
        lg:gap-0
        cursor-pointer
    "
    onClick={navigate}
    >
    <Dymension
        alt="logo"
        className="hidden sm:hidden md:hidden lg:block"
        width="35"
        height="35"
        // src="/hive.svg"
    />
    <span
        className="text-3xl self-center hidden md:block text-black">
        Arunika
        <span className="text-yellow-400 font-extrabold">{window.location.pathname.includes('/mint-nft') ? ` MintNFT` : ` Auction`}</span>
    </span>
    </div>
  )
}

export default Logos