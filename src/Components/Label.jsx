import React from 'react';

function Label({htmlFor, text}) {
  return (
    <label htmlFor={htmlFor} className="text-base font-semibold">
        {text} <span className="text-red-600">*</span>
    </label>
  )
}

export default Label;