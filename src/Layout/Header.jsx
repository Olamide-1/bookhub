import React from 'react'
import search from "./../img/svgs/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../Context/FetchContext";

function Header() {
    const navigate = useNavigate();
    const { loggedIn, logout } = useFetch();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    
  return (
    <header className="fixed top-0 left-0 bg-white z-50 shadow-md w-full sm:px-4">
        <div className="container mx-auto py-4 flex flex-row items-center justify-between">
            <Link to={loggedIn ? "/dashboard" : "/"} className="font-serif uppercase font-extrabold text-3xl">
                Bookhub
            </Link>

            <form className="w-1/2 hidden">
                <div className="flex-row hidden md:flex relative w-full">
                    <input type="search" name="search" id="search" placeholder="Search by title" className="border border-gray-400 flex-1 p-2 py-2 px-4 pr-6 rounded-l-lg" />
                    <button className="bg-primary p-2 relative -left-2 rounded-r-lg">
                        <img src={search} alt="Search icon" className="h-6 w-6 fill-white stroke-white" />
                    </button>
                </div>
            </form>

            <nav className="hidden items-center space-x-4 sm:flex">
            {
              !loggedIn ? (
                <>
                  <Link to="/login" className="text-black text-base hover:text-primary hover:underline">Login</Link>
                  <span className="h-full w-px bg-black self-start">&nbsp;</span>
                  <Link to="/register" className="text-black text-base hover:text-primary hover:underline">Register</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="text-black text-base hover:text-primary hover:underline">Shop</Link>
                  <span className="h-full w-px bg-black self-start">&nbsp;</span>
                  <Link to="/checkout" className="text-black text-base hover:text-primary hover:underline">Checkout</Link>
                  <span className="h-full w-px bg-black self-start">&nbsp;</span>
                  <Link to="/dashboard" className="text-black text-base hover:text-primary hover:underline">Dashboard</Link>
                  <span className="h-full w-px bg-black self-start">&nbsp;</span>
                  <Link to="/account" className="text-black text-base hover:text-primary hover:underline">My Account</Link>
                  <span className="h-full w-px bg-black self-start">&nbsp;</span>
                  <button type="button" onClick={handleLogout} className="text-black text-base hover:text-primary hover:underline">Logout</button>
                </>
              )}
            </nav>
        </div>
    </header>
  )
}

export default Header