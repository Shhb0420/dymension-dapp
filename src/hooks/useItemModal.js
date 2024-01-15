import { create } from "zustand";

const useItemModal = create((set) => ({
  isOpen: false,
  action: null,
  item: {
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: false,
    category: "",
    imageSrc: "",
    buyoutPrice: 0,
    initialPrice: 0,
    isEnded: false,
    createdAt: "",
    updatedAt: "",
    userId: "",
    userIds: [""],
    winnerId: "",
    winner: {
      username: "",
      image: "",
    },
    owner: {
      username: "",
      image: "",
    },
    bidId: "",
    bidderIds: [""],
  },
  onOpen: (data, action) => {
    set({ isOpen: true })
    set({ item: data })
    set({ action })
  },
  onClose: () => {
    set({ isOpen: false });
    set({ action: null });
    set({
      item: {
        id: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        isActive: false,
        category: "",
        imageSrc: "",
        buyoutPrice: 0,
        initialPrice: 0,
        isEnded: false,
        createdAt: "",
        updatedAt: "",
        userId: "",
        userIds: [""],
        winnerId: "",
        winner: {
          username: "",
          image: "",
        },
        owner: {
          username: "",
          image: "",
        },
        bidId: "",
        bidderIds: [""],
      },
    });
  },
}));

export default useItemModal;