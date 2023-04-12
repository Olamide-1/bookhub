import React from 'react';

function Error({text, active}) {
  return (
    <span className={`text-red-600 dark:text-red-400 font-medium text-[15px] ${active ? "block mt-[4px]" : "hidden"}`}>
        {text}
    </span>
  )
}

export default Error;