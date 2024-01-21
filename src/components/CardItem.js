import React, { useState, useEffect } from "react";
import { MdOutlineHive } from "react-icons/md";
import {
  useAddress,
  useConnect,
  useTokenBalance,
  useContract,
  metamaskWallet,
  useTransferToken,
  useBalance,
} from "@thirdweb-dev/react";
import Timer from "./Timer";
import Button from "./Button";
import useItemModal from "hooks/useItemModal";
import Modal from "./Modal";
import Heading from "./Heading";
import { getBidItem } from "api/get";
import { bidItem, buyoutItem } from "api/post";
import wallet from "wallet";
import { ethers } from "ethers";
import { ImagePlaceHolder } from "styles/images";

const CardItem = ({ data, key }) => {
  const [isModal, setIsModal] = useState(false);
  const [isValueBid, setIsValueBid] = useState();
  const [isValueBuyOut, setIsValueBuyOut] = useState();
  const [getValueBid, setGetValueBid] = useState();
  const isAddressConnected = useAddress();
  const connect = useConnect();
  const walletConfig = metamaskWallet();

  async function handleConnect() {
    try {
      await connect(walletConfig);
    } catch (e) {
      console.error("failed to connect", e);
    }
  }

  const openModal = async () => {
    await getBidItem(data._id)
      .then((response) => {
        const isPayload = response[0];
        setIsModal(true);
        setIsValueBuyOut({
          userId: isAddressConnected,
          itemId: data._id,
          action: "buyout",
          isActive: true,
          amount: data.buyoutPrice,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const closeModal = () => {
    setIsModal(false);
    setIsValueBid();
    setIsValueBuyOut();
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Now, set your price Bid or Buy out" />
      <div class="mb-1">
        <label
          for="bidAction"
          class="block mb-2 text-sm font-medium text-black"
        >
          Bid
        </label>
        <input
          type="number"
          id="bidAction"
          className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={isValueBid}
          onChange={(e) => setIsValueBid(e.target.value)}
          required
        />
      </div>
      <div class="mb-1">
        <label
          for="buyOutAction"
          class="block mb-2 text-sm font-medium text-black"
        >
          Buy Out
        </label>
        <input
          type="number"
          id="buyOutAction"
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={isValueBuyOut?.amount}
          disabled
        />
      </div>
    </div>
  );

  const handleSubmitBuyOut = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contractAddress = "0x9Dcf8c40a5b1f4DB6920dDddFE86A4692Cd23074";

      const transaction = await signer.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther(String(isValueBuyOut?.amount)),
      });

      if (transaction.hash) {
        await buyoutItem(isValueBuyOut)
          .then((res) => {
            closeModal();
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleSubmitBid = async () => {
    const payload = {
      userId: isAddressConnected,
      itemId: data._id,
      action: "bid",
      isActive: true,
      amount: isValueBid,
    };
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contractAddress = "0x9Dcf8c40a5b1f4DB6920dDddFE86A4692Cd23074";

      const transaction = await signer.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther(String(isValueBid)),
      });

      if (transaction.hash) {
        await bidItem(payload)
          .then(() => {
            closeModal();
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } catch (error) {
      console.log("errr", error);
    }
  };

  return (
    <div
      className="
        col-span-1
        pt-5
        pl-10
      "
      key={key}
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
              onClick={isAddressConnected ? openModal : handleConnect}
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
                {/* <MdOutlineHive className="ml-1" size={12} /> */}
                {data?.bids?.[data?.bids?.length - 1]?.amount}
                <strong> ARU</strong>
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
                Winner <strong>{truncateAddress(data?.winnerId)}</strong>
              </div>
              <img
                className="rounded-full bg-slate-600 w-8 h-8 object-cover"
                width="30"
                height="30"
                alt="Avatar"
                src={ImagePlaceHolder}
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
      <Modal
        title={"Auction Bid"}
        isOpen={isModal}
        onClose={closeModal}
        secondActionLabel={"Buy out"}
        actionLabel={"Bid"}
        body={bodyContent}
        secondOnSubmit={() => handleSubmitBuyOut()}
        onSubmit={() => handleSubmitBid()}
      />
    </div>
  );
};

export default CardItem;
