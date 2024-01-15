import React from "react";
import Container from "components/Container";
import Logos from "./Logos";
import { ConnectWallet } from "@thirdweb-dev/react";
// import { Logo, Dymension } from "styles/images";

const Navbar = () => {
  return (
    <div className="py-4 border-b-[1px]">
      <Container>
        <div
          className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              lg:gap-0
            "
        >
          <Logos />
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold"
              >
                Home
              </a>
              <a
                href="#"
                class="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold"
              >
                Faucet
              </a>
              <a
                href="#"
                class="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold"
              >
                Mint NFT
              </a>
              <ConnectWallet
                switchToActiveChain={true}
                theme={"dark"}
                btnTitle={"Connect Wallet"}
                modalSize={"compact"}
                modalTitleIconUrl={""}
                style={{ backgroundColor: "#FACC15" }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
