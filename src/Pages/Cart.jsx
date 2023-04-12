import React from 'react';
import { Link } from "react-router-dom";

function Cart() {
  return (
    <>
      <section id="cart">
        <div className="max-w-5xl mx-auto py-10">
          <h1 className="font-serif font-extrabold text-3xl">Review your bag</h1>

          <div className="space-x-8 mt-6">
            <div className="flex justify-between">
              <div className="flex space-x-8">
                <img src="" alt="" className="w-40 h-40 bg-green-200" />
                <div className="flex flex-col space-y-2">
                  <h3 className='font-semibold text-xl'>Book title</h3>
                  <p>Book author</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-8">
                <div className="flex space-x-8 items-center">
                  <input type="number" name="quantity" className='border py-4 px-3' />
                  <p className="font-bold text-lg ">$3,000</p>
                </div>
                <button className="text-lg text-red-600 underline">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <Link to="/checkout" className="bg-primary py-4 px-20 mt-10 flex w-min text-white text-lg font-semibold">
            Checkout
          </Link>
        </div>
      </section>
    </>
  )
}

export default Cart