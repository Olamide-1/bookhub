import React from 'react';

function Input({type, name, id, reff, error, def, handleChange, placeholder, disabled=false}) {
  return (
      <>
        <input type={type} name={name} placeholder={placeholder} onChange={handleChange} id={id} disabled={disabled} className={`border px-4 py-4 rounded-md font-lg
            placeholder-zinc-400 disabled:opacity-50 focus:outline-none focus:ring-1 w-full invalid:border-red-500
            invalid:focus:border-red-500 invalid:focus:ring-red-500
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-sky-500 focus:ring-sky-500 border-zinc-200"}`}
            ref={reff} defaultValue={def} />
      </>
  )
}

export default Input;