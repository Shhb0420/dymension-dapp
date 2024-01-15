import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { MdOutlineHive } from 'react-icons/md';

const Input = ({
    id,
    label,
    type = 'text',
    disabled,
    watch,
    required,
    formatPrice,
    register,
    errors
  }) => {
  const hasValue = watch(id)
  return (
    
    <div className='w-full relative'>
      {formatPrice && (
        <span className='text-sm absolute top-7 left-2 right-2 text-yellow-400'>ARU</span>
      )}
      <input 
        id={id}
        disabled={disabled}
        { ...register(id, { required })}
        placeholder=' '
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-yellow-400'}
        `}
      />
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          left-4
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          ${hasValue ? 'scale-75' : 'scale-100'}
          ${hasValue ? '-translate-y-4' : 'translate-y-0'}
          ${hasValue ? 'text-black' : 'text-black'}
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-focus:text-zinc-400
          ${errors[id] ? 'text-rose-500' : 'text-black'}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input