import React, { useState } from "react";
import { MdOutlineHive } from "react-icons/md";
import {
  ConnectWallet,
  useAddress,
  useConnect,
  metamaskWallet,
} from "@thirdweb-dev/react";
import Timer from "./Timer";
import Button from "./Button";
import useItemModal from "hooks/useItemModal";

const CardItem = ({ data, currentUser }) => {
    const itemModal = useItemModal()
  const isAddressConnected = useAddress();
  const connect = useConnect();
  const walletConfig = metamaskWallet();

  async function handleConnect() {
    try {
      const wallet = await connect(walletConfig);
    } catch (e) {
      console.error("failed to connect", e);
    }
  }

  return (
    <div
      className="
        col-span-1
        pt-5
        pl-10
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square
            w-52
            relative
            overflow-hidden
            rounded-xl
          "
        >
          <img
            fill
            // onClick={itemModal}
            alt="Auction Item"
            src={data.imageSrc}
            className="
              object-cover
              h-full
              w-full
              hover:scale-110
              transition
              cursor-pointer
            "
          />
        </div>
        <div
        //   onClick={() => handleCreateAuction()}
          className="cursor-pointer font-semibold text-lg flex-row flex items-center"
        >
          {data.title}
        </div>
        {data?.isActive && (
          <>
            <div className="font-light text-neutral-700">
              <div className="flex flex-row items-center">
                Start Price: <MdOutlineHive className="ml-2" size={12} />
                {data.initialPrice}
              </div>
              <div className="flex flex-row items-center">
                Buyout Price: <MdOutlineHive className="ml-2" size={12} />
                {data.buyoutPrice}
              </div>
            </div>
            <div className="font-light text-neutral-700">
              <div className="flex flex-row items-center">Last Bid:</div>
              <div className="flex flex-row items-center">
                <strong className="font-semibold">
                  {data?.bids?.[data?.bids?.length - 1]?.user.username || "Wow"}
                </strong>{" "}
                <MdOutlineHive className="ml-2" size={12} />
                {data?.bids?.[data?.bids?.length - 1]?.amount || 0}
              </div>
            </div>
            <Button
              label="Bid"
              onClick={
                isAddressConnected ? console.log("lalal") : handleConnect
              }
              small
            />
            {/* {showConnectWallet && <ConnectWallet />} */}
          </>
        )}
        {data?.winnerId ? (
          <div className="flex flex-col gap-8">
            <div className="text-sm">
              The auction has ended and the highest bid placed was{" "}
              <div className="inline-flex flex-row items-baseline text-base font-semibold">
                <MdOutlineHive className="ml-1" size={12} />
                {data?.bids?.[data?.bids?.length - 1]?.amount}
              </div>
              . Congratulations to the winning bidder!
            </div>
            <div
              className="
              flex
              flex-row
              items-center
              gap-2
            "
            >
              <div>
                Winner <strong>{data?.winner?.username}</strong>
              </div>
              <img
                className="rounded-full bg-slate-600 w-8 h-8 object-cover"
                width="30"
                height="30"
                alt="Avatar"
                src="styles/images/placeholder.jpg"
              />
            </div>
          </div>
        ) : (
          <div className="font-light text-neutral-500">
            <Timer
              isActive={data?.isActive}
              endDate={data?.endDate}
              startDate={data?.startDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardItem;
