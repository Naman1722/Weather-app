import React from 'react';
import { FcGlobe } from "react-icons/fc"; 

export default function Header() {
  return (
    <div>
      <header className="flex-row justify-between">
        <div className='text-5xl'>
          <a href="/#" className="flex items-center gap-1 w-auto">
            <FcGlobe className="w-20 h-15" />
            <span className="font-bold text-white">Weather App</span>
          </a>
        </div>
      </header>
    </div>
  );
}
