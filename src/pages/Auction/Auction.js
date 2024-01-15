import React from "react";
import Container from "components/Container";
import Navbar from "./Navbar";
import CardItem from "components/CardItem";
import Footer from "components/Footer";
import RegisterItemCard from "components/RegisterItemCard";

const Auction = () => {
  const isDataCard = [
    {
      title: "Vintage Turntable",
      description: "Rare",
      startDate: "2024-01-09T17:00:00.000+00:00",
      endDate: "2024-01-20T17:00:00.000+00:00",
      isActive: true,
      category: "Electronics",
      imageSrc:
        "https://res.cloudinary.com/dcez1sltp/image/upload/v1684572410/gzr48lofgchhd7erqd8b.jpg",
      buyoutPrice: 200000,
      initialPrice: 10,
      isEnded: false,
      createdAt: "2023-05-20T08:47:24.616+00:00",
      updatedAt: "2023-05-20T09:21:42.038+00:00",
      userId: "646888afbd1e43483b776cc6",
      bidderIds: [],
      bidId: null,
      winnerId: null,
    },
    {
        title: "Vintage Turntable",
        description: "Rare",
        startDate: "2024-01-09T17:00:00.000+00:00",
        endDate: "2024-01-20T17:00:00.000+00:00",
        isActive: true,
        category: "Electronics",
        imageSrc:
          "https://res.cloudinary.com/dcez1sltp/image/upload/v1704788075/vwspdtaoakgyvjtmfglg.png",
        buyoutPrice: 200000,
        initialPrice: 10,
        isEnded: false,
        createdAt: "2023-05-20T08:47:24.616+00:00",
        updatedAt: "2023-05-20T09:21:42.038+00:00",
        userId: "646888afbd1e43483b776cc6",
        bidderIds: [],
        bidId: null,
        winnerId: null,
      },
  ];
  return (
    <>
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
          h-screen
        "
      >
    <RegisterItemCard />
      {isDataCard.map((val) => {
        return (
            <CardItem data={val} />
        )
      })}
      </div>
      </Container>
      <Footer />
    </>
  );
};

export default Auction;
