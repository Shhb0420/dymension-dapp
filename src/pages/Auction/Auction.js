import React, { useEffect, useState } from "react";
import Container from "components/Container";
import Navbar from "./Navbar";
import CardItem from "components/CardItem";
import Footer from "components/Footer";
import RegisterItemCard from "components/RegisterItemCard";
import ItemModal from "components/ItemModal";
import { Toaster } from "react-hot-toast";
import { useAddress } from "@thirdweb-dev/react";
import { getListItem, getUser } from "api/get";

const Auction = () => {
  const address = useAddress()
  const [itemList, setItemList] = useState(null)
  const [isModal, setIsModal] = useState(false)

  const openModal = () => setIsModal(!isModal);
  const closeModal = () => setIsModal(!isModal);

  const handleGetUser = async () => {
    await getUser()
    .then((res) => {
    //   console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const getItem = async () => {
    await getListItem()
    .then((res) => {
      setItemList(res)
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    handleGetUser()
    getItem()
  }, [])

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Container>
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          min-h-screen
          mb-7
        "
      >
        { address ? (
          <RegisterItemCard />
        ) : null}
      {itemList?.map((val, index) => {
        return (
            <CardItem data={val} key={index}/>
        )
      })}
      </div>
      </Container>
      <Footer />
      <ItemModal />
    </>
  );
};

export default Auction;
