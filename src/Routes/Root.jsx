import React from 'react';
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Outlet } from "react-router-dom";

function Root({error}) {
  return (
    <div>
      <Header />
      <main className="pt-[72px]">
        {!error ? <Outlet /> : error }
      </main>
      <Footer />
    </div>
  )
}

export default Root;