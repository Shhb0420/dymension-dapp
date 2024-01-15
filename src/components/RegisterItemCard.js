import React from 'react'
import Button from './Button'
import { TiPlus } from "react-icons/ti";
import useItemModal from 'hooks/useItemModal';

function RegisterItemCard() {
    const itemModal = useItemModal((state) => {
        console.log('isOpenwewew', state)
        return state.onOpen
    })
  return (
    <div className="flex flex-col items-center mt-40 gap-4">
    <div
      className="
        text-4xl
        bg-yellow-400
        font-extrabold
        rounded-full
        text-white
        hidden
        sm:flex
        items-center
        hover:opacity-80
      "
    >
      <div
        onClick={itemModal}
        className='
          p-2
          bg-yellow-400
          rounded-full
          text-white
          cursor-pointer
        '
      >
        <TiPlus size={28} />
      </div>
    </div>
    <div
        className="
          hidden
          sm:flex
          items-center
          w-full
          text-center
        "
      >
        <div>Click on &ldquo;+&rdquo; Button to register new item</div>
      </div>
    <div
      className="
        flex
        sm:hidden
        w-full
      "
    >
      <Button 
        label="Register an Item"
        onClick={itemModal}
        small
      />
    </div>
  </div>
  )
}

export default RegisterItemCard