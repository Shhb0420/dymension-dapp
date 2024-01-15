import React, { useState, useMemo, useEffect } from "react";
import useItemModal from "hooks/useItemModal";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineHive } from "react-icons/md";
import Heading from "./Heading";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Range } from "react-date-range";
import { addDays, setDate } from "date-fns";


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
      imageSrc: '',
      category: '',
      buyoutPrice: 1,
      initialPrice: 1
    }
  })

  const imageSrc = watch('imageSrc')

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
        <div className="font-semibold">AuctionHive Team</div>
      </div>
    </div>
  );

  useEffect(() => {
    if(itemModal.action) {
      const defaultValue = watch()
      Object.keys(defaultValue).forEach((key) => {
        if(key.includes("Date")) {
          console.log(key, 'masuk', new Date(itemModal.item[key]))
          setDateRange({startDate: new Date(itemModal.item["startDate"]), key: "selection", endDate: new Date(itemModal.item["endDate"])})
        } else {
          setValue(key, itemModal.item[key])
        }
      })
    }
  }, [itemModal.action, itemModal.item, setValue, watch])

  useEffect(() => {
    console.log('ItemModal', itemModal.isOpen)
  },[itemModal.isOpen])
  return (
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
  );
};

export default ItemModal;
