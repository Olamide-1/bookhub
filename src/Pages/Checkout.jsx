import React, { useState, useEffect, useRef } from 'react';
import { useBook } from "./../Context/BookContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./../Components/Spinner";
import { walletURL, walletClientID, walletCodeChallange, redirectURI } from "./../Routes/urls";

function Checkout() {
  const { book } = useBook();
  const [loading, setLoading] = useState(true);
  const navigate = useRef(useNavigate());

  useEffect(() => {
    // If no book is in the cart redirect to home page
    console.log(Object.keys(book).length);
    if (Object.keys(book).length === 0) {
      navigate.current("/");
      return;
    }

    setLoading(false);
  }, [book]);

  const handleCheckout = () => {
    /** Handle checkout with wallet */
    const url = `${walletURL}/oauth/authorize/?response_type=code&code_challenge=${walletCodeChallange}&code_challenge_method=S256&client_id=${walletClientID}&redirect_uri=${redirectURI}&scope=transfer`;
    window.location.replace(url);
  };

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <section id="checkout">
            <div className="container mx-auto flex min-h-[80vh] flex-col-reverse lg:flex-row">
              <article className="w-full bg-slate-50 py-10 flex flex-col items-center px-10 space-y-6 lg:w-1/2">
                <p>
                  <span className="font-bold">Order summary </span>
                  <span>(1) item</span>
                </p>

                <div className="space-y-10 max-w-lg w-full">
                  <div className="p-3 bg-zinc-200 flex space-x-4">
                    <img src={book.cover_page} alt={`${book.title} cover`} className="bg-green-300 object-cover w-32 h-50" />

                    <div className="space-y-2">
                      <h4 className="font-bold">{book.title}</h4>
                      <p>{book.description }</p>
                      <div className="h-px bg-zinc-500">&nbsp;</div>
                      <p>Price: <span className="font-bold">${book.price.toLocaleString("en-US")}</span></p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-zinc-500 w-full">&nbsp;</div>
                <p className="flex justify-between items-center w-full">
                  <span className=''>Order total</span>
                  <span className="font-bold">${book.price.toLocaleString("en-US")}</span>
                </p>
              </article>

              <article className="w-full py-10 px-10 flex flex-col justify-center lg:w-1/2">
                  <h1 className="font-serif text-center w-full text-4xl font-extrabold mb-4">Checkout</h1>
                  <button type="button" onClick={handleCheckout}
                      className="rounded-md justify-center items-center text-lg font-medium px-8 py-3.5 bg-primary
                        text-white drop-shadow-lg outline-offset-2 outline-primary outline-1 focus:outline
                        active:drop-shadow-none hover:underline hover:bg-primaryLight flex">
                    <span>Pay with FastWallet</span>
                  </button>
              </article>       
            </div>
          </section>
        )
      }
    </>
  )
}

export default Checkout;