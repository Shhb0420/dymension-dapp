import React, { useState, useMemo, useEffect } from "react";
import useItemModal from "hooks/useItemModal";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineHive } from "react-icons/md";
import Heading from "./Heading";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import { addDays, setDate } from "date-fns";
import ImageUpload from "./ImageUpload";
import Input from "./Input";
import Calender from "./Calender";
import { useAddress, useBalance } from "@thirdweb-dev/react";
import { createItem, login } from "api/post";
import { getUserByAddress } from "api/get";


const ItemModal = () => {
  const isSteps = {
    information: 0,
    images: 1,
    description: 2,
    time: 3,
    price: 4,
  };

  const initialDateRange = {
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 1),
    key: 'selection'
  }

  const itemModal = useItemModal();
  const [isStepModal, setIsStepModal] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState(initialDateRange)

  const address = useAddress()
  const { data, balanceLoading} = useBalance()
  const [user, setUser] = useState(null)

  const getByAddress = async () => {
    let result
    await getUserByAddress(address)
    .then((res) => {
      if(!res) {
        const payload = {
          address,
          balance: parseFloat(data.displayValue),
          isLogin: true,
          itemIds: [],
          winItemIds: [],
          watchedItems: [],
          biddedItems: [],
          bids: [],
          history: []
        }

        login(payload)
        .then((res) => {
          setUser(res)
          result = res
        })
      } else {
        setUser(res)
        result = res
      }
    })
    .catch((err) => err)

    return result
  }

  const handleLogin = async () => {
    const detail = await getByAddress()
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      isActive: false,
      isEnded: false,
      buyoutPrice: 1,
      initialPrice: 1,
      imageSrc: '',
      winnerId: null,
      winnerBidId: null,
      joinedUserIds: [],
      watchBy: [],
      bids: []
    }
  })

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setIsStepModal((val) => val - 1);
  };

  const onNext = () => {
    setIsStepModal((val) => val + 1);
  };

  const actionLabel = useMemo(() => {
    if(isStepModal === isSteps.price) {
      if(itemModal.action) {
        return 'Update'
      }
      return 'List'
    }
      
    return 'Next'
  }, [isStepModal, itemModal.action])

  const secondaryActionLabel = useMemo(() => {
    if(isStepModal === isSteps.information) return undefined
    return 'Back'
  }, [isStepModal])

  const onSubmit = async (data) => {
    if (isStepModal !== isSteps.price) return onNext()
    data.startDate = dateRange.startDate
    data.endDate = dateRange.endDate
    data.ownerId = address
    data.initialPrice = Number(data.initialPrice)
    data.buyoutPrice = Number(data.buyoutPrice)
    
    setIsLoading(true)

    // for(let key in data) {
    //   if(key !== "isActive") {
    //     if(!data[key]) {
    //       return toast.error("Please fill up all the required data")
    //     }
    //   }
    // }

    await createItem(data)
    .then((res) => {
        itemModal.onClose();
        window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })
  }


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Information: Editing and Deleting Items"
        subtitle="Maintaining Fairness and Integrity in the Auction Process"
      />
      <div className="flex flex-row w-11/12 self-center justify-center rounded-md bg-blue-400 p-2 gap-2">
        <div className="bg-blue-400 flex items-center border-r-[2px] border-r-white pr-1">
          <IoInformationCircleOutline
            size={45}
            color="white"
            className="font-extrabold place-self-center"
          />
        </div>
        <div className="flex flex-col pl-1">
          <div className="text-lg text-white font-bold">Information</div>
          <div className="text-white font-bold max-w-fit">
            Please note that once your item auction has started, you will no
            longer be able to <strong className="font-extrabold">edit</strong>{" "}
            or <strong className="font-extrabold">delete</strong> your item.
          </div>
        </div>
      </div>
      <div>
        <div>
          This is to ensure fairness for all bidders and maintain the integrity
          of the auction process. We recommend carefully reviewing your item
          details before submitting them for auction.
        </div>
      </div>
      <div>
        <div>Thank you for your understanding.</div>
        <div className="mt-1">Regards,</div>
        <div className="font-semibold">Arunika Auction Team</div>
      </div>
    </div>
  );

  if (isStepModal === isSteps.images) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Add a photo of your item"
          subtitle="Show bidders what your item looks like!"
        />
        <ImageUpload 
          // value={imageSrc}
          changeValue={setCustomValue}
          // onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (isStepModal === isSteps.description) {
    bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title="How would you describe your item?"
            subtitle="Short and clear work best!"
          />
          <Input 
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            watch={watch}
            required
          />
          <hr />
          <Input 
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            watch={watch}
            required
          />
        </div>
      )
  }

  if (isStepModal === isSteps.time) {
    bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title="How long would you like this item to be auctioned for?"
            subtitle="Your item will be eligible for auction starting one day after it is listed, and auctions take place everyday at 10 AM."
          />
          <Calender
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      )
  }

  if (isStepModal === isSteps.price) {
    bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title="Now, set your price"
            subtitle="Set the initial price and the buyout price too"
          />
          <Input 
            id="initialPrice"
            label="Initial Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            watch={watch}
          />
          <hr />
          <Input 
            id="buyoutPrice"
            label="Buyout Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            required
            errors={errors}
            watch={watch}
          />
        </div>
      )
  }

//   useEffect(() => {
//     if(itemModal.action) {
//       const defaultValue = watch()
//       Object.keys(defaultValue).forEach((key) => {
//         if(key.includes("Date")) {
//           console.log(key, 'masuk', new Date(itemModal.item[key]))
//           setDateRange({startDate: new Date(itemModal.item["startDate"]), key: "selection", endDate: new Date(itemModal.item["endDate"])})
//         } else {
//           setValue(key, itemModal.item[key])
//         }
//       })
//     }
//   }, [itemModal.action, itemModal.item, setValue, watch])


useEffect(() => {
  if(address) {
    handleLogin()
  }
}, [address])

  return (
    <>
    <Modal
      title="List an Item"
      isOpen={itemModal.isOpen}
      onClose={itemModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={isStepModal === isSteps.information ? undefined : onBack}
      body={bodyContent}
    />
    </>
  );
};

export default ItemModal;
