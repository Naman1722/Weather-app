import Header from "../header/Header";
import {Outlet} from "react-router-dom";
import React from 'react';

export default function Layout()
{
  return (
    <div>
      {/* <Header /> */}
      <div className="p-7 flex flex-col bg-gradient-to-r from-[#040C17] to-[#383937] min-h-screen">
            <Header />
            <Outlet />
        </div>
    </div>
  );
}