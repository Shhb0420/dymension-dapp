import React from "react";

function Button({ label, onClick, disabled, outline, small, Icon, htmlLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        text-gray-800
        font-semibold
        ${outline ? "bg-white" : "bg-yellow-400"}
        ${outline ? "border-black" : "border-yellow-400"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {htmlLabel ? htmlLabel : label}
    </button>
  );
}

export default Button;
