import React from 'react';
import { useNavigate } from "react-router-dom";
// import cover from "./../img/book-cover-1.webp";

function Book({book, setBook}) {
  const navigate = useNavigate();

  const handleBuy = () => {
    // Add book to checkout page
    setBook();

    // Set id in local localStorage
    localStorage.setItem("book", JSON.stringify(book));

    // Redirect to checkout page
    navigate("/checkout");
  }

  return (
    <div className="card w-full space-y-2 sm:w-40 self-stretch">
        <img src={book.cover_page} alt={`${book.title} cover`} className="w-full object-cover bg-zinc-200 h-60" />

        <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base">{book.title}</h4>
            <p className="text-sm font-light">{book.author}</p>
            <p className="font-bold text-xl">${parseFloat(book.price).toLocaleString("en-US")}</p>
        </div>

        <div className="flex justify-center sm:justify-start">
            <button type="button" onClick={handleBuy}
              className="bg-primary hover:bg-primaryDark outline focus:outline-offset-2 p-2 px-4 
                text-white rounded-md font-semibold">
              Buy now
            </button>
        </div>
    </div>
  )
}

export default Book