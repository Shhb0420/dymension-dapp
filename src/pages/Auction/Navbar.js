import React, { useEffect, useState } from "react";
import Container from "components/Container";
import Logos from "./Logos";
import { ConnectWallet, useAddress, useBalance } from "@thirdweb-dev/react";
import wallet from "wallet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUserByAddress } from "api/get";
import { login } from "api/post";
// import { Logo, Dymension } from "styles/images";

const Navbar = () => {
  const address = useAddress();
  const navigate = useNavigate();

  const sendFaucet = async (e) => {
    const isToastLoading = toast.loading("Faucet is in progress...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    try {
      const transaction = await wallet.sendTransaction({
        to: address,
        value: "1000000000000000000000",
      });
      toast.dismiss(isToastLoading);
      toast.success(`You got faucet`, {
        duration: 3000,
        icon: "🚀🚀🚀",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.dismiss(isToastLoading);
      toast.error(`Faucet is fail`, {
        icon: "🤷‍♂️🤷‍♂️🤷‍♂️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

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
          <Logos navigate={() => navigate("/")} />
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <button
                className="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold"
                onClick={() => {
                  window.open(
                    `https://portal.dymension.xyz/rollapp/arunika_6875752-1`
                  );
                }}
              >
                RollApps
              </button>
              <button
                className="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold focus:bg-yellow-400 focus:text-white active:bg-yellow-400 active:text-white"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              {address && (
                <button
                  onClick={sendFaucet}
                  className="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold focus:bg-yellow-400 focus:text-white active:bg-yellow-400 active:text-white"
                >
                  Get Faucet
                </button>
              )}
              <button
                className="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold focus:bg-yellow-400 focus:text-white active:bg-yellow-400 active:text-white"
                onClick={() => navigate("/mint-nft")}
              >
                Mint NFT
              </button>
              {address && (
                <button
                  className="text-black hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-lg font-extrabold focus:bg-yellow-400 focus:text-white active:bg-yellow-400 active:text-white"
                  onClick={() => navigate("/my-items")}
                >
                  My Items
                </button>
              )}
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
