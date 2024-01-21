import React, { useEffect, useState } from "react";
import Navbar from "pages/Auction/Navbar";
import Container from "components/Container";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
  MediaRenderer,
} from "@thirdweb-dev/react";
import Footer from "components/Footer";
import { getListItem } from "api/get";

function MyItems() {
  const [itemList, setItemList] = useState(null);
  const contractAddress = process.env.REACT_APP_ADDRESS_NFT;
  const address = useAddress();
  const truncateAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const { contract } = useContract(contractAddress);

  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  const getItem = async () => {
    await getListItem()
      .then((res) => {
        setItemList(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div className="border h-20 my-5 rounded-md bg-gradient-to-r from-blue-500 to-blue-100 px-2 pt-1">
          <h1 className="title-font mb-1 tracking-wides text-2xl">Profile</h1>
          <h2 className="title-font text-lg font-medium text-gray-900">
            Address: {truncateAddress(address) || ""}
          </h2>
        </div>
        <hr />
        <section className="min-h-screen body-font text-gray-600 mt-5">
          <h1 className="title-font mb-1 tracking-wides text-2xl">My NFT</h1>
          <div className="-m-4 flex flex-wrap">
            {ownedNFTs?.length > 0 &&
              ownedNFTs?.map(({ metadata }) => (
                <div className="p-4">
                  <MediaRenderer
                    src={metadata.image}
                    className="block w-full object-cover object-center cursor-pointer"
                    style={{ width: "200px" }}
                  />
                  <div className="mt-4">
                    <h2 className="title-font text-lg font-medium text-gray-900">
                      {metadata.name}
                    </h2>
                    <p className="mt-1">{metadata.description}</p>
                  </div>
                </div>
              ))}
            {/* This is item bid */}
            {itemList?.length > 0 &&
              itemList?.map((val) => {
                if (val.isEnded && val.winnerId === address) {
                  return (
                    <div className="p-4">
                      <img
                        src={val?.imageSrc}
                        className="block w-full object-cover object-center cursor-pointer"
                        style={{ width: "200px" }}
                      />
                      <div className="mt-4">
                        <h2 className="title-font text-lg font-medium text-gray-900">
                          {val.title}
                        </h2>
                        <p className="mt-1">{val.description}</p>
                      </div>
                    </div>
                  );
                } else if (!val.isEnded && val.ownerId === address) {
                  return (
                    <div className="p-4">
                      <img
                        src={val?.imageSrc}
                        className="block w-full object-cover object-center cursor-pointer"
                        style={{ width: "200px" }}
                      />
                      <div className="mt-4">
                        <h2 className="title-font text-lg font-medium text-gray-900">
                          {val.title}
                        </h2>
                        <p className="mt-1">{val.description}</p>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default MyItems;
