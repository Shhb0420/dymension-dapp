import React, { useEffect, useState, useCallback } from "react";
import {
  MediaRenderer,
  Web3Button,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  useTotalCount,
} from "@thirdweb-dev/react";
import wallet from "wallet";
import Snowfall from "react-snowfall";
import Navbar from "pages/Auction/Navbar";
import Container from "components/Container";
import Footer from "components/Footer";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function MintNFT() {
  const address = useAddress();
  const maxClaimQuantity = 2;
  const contractAddress = process.env.REACT_APP_ADDRESS_NFT;

  const { contract } = useContract(contractAddress);

  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useContractMetadata(contract);

  const { data: activeClaimPhase, isLoading: isActiveClaimPhaseLoading } =
    useActiveClaimConditionForWallet(contract, address);

  const {
    data: claimIneligibilityReasons,
    isLoading: isClaimIneligibilityReasonsLoading,
  } = useClaimIneligibilityReasons(contract, {
    walletAddress: address || "",
    quantity: 1,
  });

  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useTotalCount(contract);
  const { data: totalClaimSupply, isLoading: isTotalClaimSupplyLoading } =
    useTotalCirculatingSupply(contract);

  const [claimQuantity, setClaimQuantity] = useState(1);
  const increment = () => {
    if (claimQuantity < maxClaimQuantity) {
      setClaimQuantity(claimQuantity + 1);
    }
  };
  const decrement = () => {
    if (claimQuantity > 1) {
      setClaimQuantity(claimQuantity - 1);
    }
  };
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Container>
        <div class="flex font-sans h-screen pt-5">
          {isContractMetadataLoading ? (
            <div class="flex-none w-48 relative h-48 rounded shadow animate-pulse dark:border-gray-700">
              <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg
                  class="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
            </div>
          ) : (
            <div class="flex-none w-48 relative h-48">
              <MediaRenderer src={contractMetadata?.image} className="border" />
            </div>
          )}
          <div class="flex-auto p-10">
            <div class="flex flex-wrap">
              <h1 class="flex-auto text-lg font-semibold text-slate-900">
                {contractMetadata?.name}
              </h1>
              <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                {contractMetadata?.description}
              </div>
            </div>
            <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
              <div class="space-x-2 flex text-sm">
                {!isTotalSupplyLoading && !isTotalClaimSupplyLoading ? (
                  <p>
                    Claimed: {totalClaimSupply?.toNumber()} /{" "}
                    {totalSupply?.toNumber()}
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
            <div class="flex space-x-4 mb-6 text-sm font-medium">
              <div class="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  onClick={decrement}
                >
                  <svg
                    class="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={claimQuantity}
                />
                <button
                  type="button"
                  class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  onClick={increment}
                >
                  <svg
                    class="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-auto flex space-x-4">
                {address ? (
                  claimIneligibilityReasons?.length > 0 ? (
                    claimIneligibilityReasons?.map((reason, index) => (
                      <button key={index} className="h-10 px-6 font-semibold rounded-md bg-black text-white" disabled>{reason}</button>
                    ))
                  ) : (
                    <Web3Button
                      contractAddress={contractAddress}
                      action={(contract) =>
                        contract.erc721.claim(claimQuantity)
                      }
                      onSuccess={() => toast.success(`Succesfully minted`, {
                        duration: 3000,
                        icon: "✅✅✅",
                        style: {
                          borderRadius: "10px",
                          background: "#333",
                          color: "#fff",
                        },
                      })}
                      onError={() => toast.error(`Error minted`, {
                        duration: 3000,
                        icon: "✖️✖️✖️",
                        style: {
                          borderRadius: "10px",
                          background: "#333",
                          color: "#fff",
                        },
                      })}
                      className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                    >
                      Mint NFT
                    </Web3Button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
