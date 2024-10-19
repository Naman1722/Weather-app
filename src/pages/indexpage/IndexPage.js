import React from 'react';
import { useRef, useState} from "react";
import axios from "axios";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight } from "react-icons/md";


function IndexPage()
{
  // const[search,setSearch]=useState('London');
  const inputRef = useRef(null);
  const inputRefcode = useRef(null);
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  // const [defaultLocation, setDefaultLocation] = useState('m-2 justify-between');

  function currentDate(timezoneIn, dtIn) {
      let dateTime = new Date(dtIn * 1000 + (timezoneIn * 1000));

      let month = dateTime.toLocaleString('default', { month: 'short' });
      let date = dateTime.getDate();
      let year= dateTime.getFullYear();
      
      return `${date} ${month} ${year} `; 
  }
  function currentDay(timezoneIn, dtIn) {
      let dateTime = new Date(dtIn * 1000 + (timezoneIn * 1000));
      let weekday = dateTime.toLocaleString('default', { weekday: 'long' });
      
      return `${weekday}`; 
  }
  function apiRequest(location) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=dbb50c1700b55d9da3791433a7f39284`)
          .then(response => {
              setData(response.data)
              setIsFetching(false)
          }).catch(() => {
              // pass
              alert('City Data not found or City Name Invalid')
      })
  }
  function apiRequestcode(code) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${code}&units=metric&appid=dbb50c1700b55d9da3791433a7f39284`)
          .then(response => {
              setData(response.data)
              setIsFetching(false)
          }).catch(() => {
              // pass
              alert('City Data not found or City Code Invalid')
      })
  }
  
  function handleKeyPress(e) {
      setIsFetching(true);
      if (e.key === 'Enter') {
          apiRequest(inputRef.current.value.toLowerCase());
      }
  }
  function handleKeyCodePress(e) {
      setIsFetching(true);
      if (e.key === 'Enter') {
          apiRequestcode(inputRefcode.current.value);
      }
  }

  return (
    <div className='h-auto p-4 m-auto w-full '>
      <div className='w-full p-5  h-auto rounded-2xl flex-column bg-bag'>
        <div className='py-2 justify-between flex w-full '>
          <div className='px-2 w-2/4'>
            <input type="search" placeholder='City Name' 
            className='flex gap-2 border border-gray-300 rounded-full p-2 text-bold shadow-sm shadow-gray-100 w-full'
            onKeyPress={(e) => {handleKeyPress(e)}} 
            ref={inputRef}/>
            <div className='px-2 m-2 text-xl text-white'>
                Please Enter City Name to Search
            </div>
          </div>
          <div className='px-4 w-2/4'>
            <input type="search" placeholder='City Code' 
            className='flex gap-2 border border-gray-300 rounded-full p-2 text-bold shadow-sm shadow-gray-100 w-full'
            onKeyPress={(e) => {handleKeyCodePress(e)}} 
            ref={inputRefcode}/>
            <div className='px-2 m-2 text-xl text-white'>
                Please Enter City Code to Search
            </div>
          </div>
        </div>
      
        <div className='p-5 mx-auto  min-h-[40rem] h-fit'>
          {isFetching? 
          <p className='text-white text-5xl font-bold flex justify-center'>SELECT A CITY</p> : 
          (
            <div className='text-white flex h-full mx-auto'>
              <div className='bg-gradient-to-tr from-red-500  p-5 w-2/6 rounded-2xl min-h-[38rem] h-full hover:from-red-800 hover:to-amber-100'>
                <div className='mx-auto my-2 text-4xl font-bold'>
                  {
                    <p>{currentDay(data.timezone,data.dt)}</p>
                  }
                </div>
                <div className='my-3 text-3xl'>
                  {
                    <p>{currentDate(data.timezone,data.dt)}</p>
                  }
                </div>
                <div className='my-3 flex'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><path fill="#bd2e2e" d="M14 2.25A9.75 9.75 0 0 1 23.75 12c0 4.12-2.895 8.61-8.61 13.518a1.75 1.75 0 0 1-2.283-.002l-.378-.328C7.017 20.408 4.25 16.028 4.25 12A9.75 9.75 0 0 1 14 2.25m0 6a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"/></svg>
                  <div className='text-3xl '> {data.name} , {data.sys.country}</div>
                </div>
                <img className='mx-auto mt-20 mb-5' src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png` } 
                    width={130}
                    height={130}/>
                <div className='mx-auto mb-20 text-5xl font-bold w-fit'>{data.main.temp}° C</div>
                <div className='m-auto my-4 text-4xl '>{data.weather[0].main} </div>
              </div>
              <div className='w-4/6 p-2'>
                <div className='bg-mainbag rounded-2xl p-2 mx-2 w-full my-2'>
                  {
                    (data.weather[0].icon.at(-1) === `d`)?
                    
                    <div className='m-4 flex justify-between'>
                      <div className='font-bold text-xl '>DAY</div>
                      <WiDaySunny className='w=10 h=10'/>
                    </div>
                    :
                    <div className='m-4 flex justify-between'>
                      <div className='font-bold text-xl '>NIGHT</div> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 128 128"><path fill="#fcc21b" d="M119.39 56.23H85.04v43.46h-37.4V85.24H11.76v37.41h24.35v.76h72.59v-5.35h10.69zm-48.2-21.28c.53.44.87 1.39.74 2.08l-.63 3.82c-.11.69.28.96.88.6l3.3-1.96c.59-.37 1.59-.38 2.19-.05l3.39 1.82c.62.33 1 .04.85-.65l-.8-3.78c-.14-.68.16-1.65.66-2.11l2.69-2.59c.51-.48.36-.96-.33-1.04l-3.78-.45c-.7-.07-1.52-.66-1.83-1.28l-1.68-3.31c-.31-.61-.8-.61-1.09.02l-1.51 3.38c-.29.65-1.08 1.26-1.78 1.37l-3.78.61c-.68.1-.82.59-.29 1.05zm17.92-21.27c.53.44.87 1.39.74 2.08l-.63 3.82c-.11.69.28.96.88.6l3.3-1.96c.59-.37 1.59-.38 2.19-.05l3.39 1.82c.62.33 1 .04.85-.65l-.8-3.78c-.14-.68.16-1.65.66-2.11l2.69-2.59c.51-.48.36-.96-.33-1.04l-3.78-.45c-.7-.07-1.52-.66-1.83-1.28l-1.68-3.31c-.31-.61-.8-.61-1.09.02l-1.51 3.38c-.29.65-1.08 1.26-1.78 1.37l-3.78.61c-.68.11-.82.59-.29 1.05zM56.15 52.93c1.49-.31 5.26-1.38 5.08-3.44c-.21-2.5-5.54-3.01-7.35-3.53c-14.73-4.16-17.63-26.29-6.8-36.16c1.63-1.49 3.46-2.75 5.22-4.07c1.04-.78 4.46-1.92 4.14-3.63C55.95.05 50.09.05 48.6.06c-5.59.02-11.2 1.28-16.17 3.88c-7.21 3.77-11.95 11.65-12.65 19.59c-.7 7.88.23 14.56 6 20.4c8.36 8.45 18.87 11.42 30.37 9"/><path fill="#006ca2" d="M112.99 50.69H87.8c-5.24 0-9.52 4.29-9.52 9.52v31.76H51.1v-5.45c0-5.24-4.29-9.52-9.52-9.52H15.01c-5.24 0-9.52 4.29-9.52 9.52v31.91c0 .28.06.54.08.82v8.7H122.5V60.21c.01-5.23-4.28-9.52-9.51-9.52m-91.91 63.89c0 1.44-1.18 2.62-2.62 2.62H15.4c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.43 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 2.62zm0-14.89c0 1.44-1.18 2.62-2.62 2.62H15.4c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.43 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 2.62zm11.66 14.89c0 1.44-1.18 2.62-2.62 2.62h-3.06c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.43 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 2.62zm0-14.89c0 1.44-1.18 2.62-2.62 2.62h-3.06c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.43 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 2.62zm11.66 0c0 1.21-.84 2.18-1.96 2.48c-.22.06-.43.14-.66.14h-3.06c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.43 1.18-2.62 2.62-2.62h3.06c.23 0 .44.07.66.14c1.11.3 1.96 1.28 1.96 2.48zm11.66 14.89c0 1.44-1.18 2.62-2.62 2.62h-3.05c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.43 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 2.62v4.86zM95 68.96c0 1.44-1.18 2.62-2.62 2.62h-3.06c-1.44 0-2.62-1.18-2.62-2.62V64.1c0-1.44 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 2.62zm9.26 31.59c0 .48-1.18 1.66-2.62 1.66h-3.06c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.44 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 1.66zM115.46 86c0 .48-1.18 1.66-2.62 1.66h-3.06c-1.44 0-2.62-1.18-2.62-2.62v-4.86c0-1.43 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 1.66zm0-16.08c0 .48-1.18 1.66-2.62 1.66h-3.06c-1.44 0-2.62-1.18-2.62-2.62V64.1c0-1.44 1.18-2.62 2.62-2.62h3.06c1.44 0 2.62 1.18 2.62 1.66z"/></svg>
                    </div>
                  }
                  <div className='m-4 flex justify-between'>
                    <div className='font-bold text-xl '>DESCRIPTION</div>
                    <div className='text-xl font-normal '>  {data.weather[0].description}</div>  
                  </div>
                </div>
                <div className='bg-mainbag rounded-2xl p-2 mx-2 w-full my-5'>
                  <div className='m-4 flex justify-between'>
                    <div className='font-bold text-xl '>HUMIDITY</div>
                    <div className='text-xl font-normal '>  {data.main.humidity} %</div>  
                  </div>
                  <div className='m-4 flex justify-between'>
                    <div className='font-bold text-xl '>PRESSURE</div>
                    <div className='text-xl font-normal '>  {data.main.pressure} hPa </div>  
                  </div>
                  <div className='m-4 flex justify-between'>
                    <div className='font-bold text-xl '>WIND SPEED</div>
                    <div className='text-xl font-normal '>  {data.wind.speed} m/s , {data.wind.deg}° </div>  
                  </div>
                  <div className='mx-4 my-2 flex justify-between'>
                    <div className='font-bold text-xl '>CLOUDS</div>
                    <div className='text-xl font-normal '>  {data.clouds.all} % </div>  
                  </div>
                </div>
                <div className='bg-mainbag rounded-2xl p-2 mx-2 w-full my-5'>
                  <p className='m-4 font-bold text-xl '>
                    TEMPERATURE</p>
                  <div className='m-4 flex justify-between'>
                    <div className='font-bold text-xl '>FEELS LIKE</div>
                    <div className='text-xl font-normal '>  {data.main.feels_like}° C</div>  
                  </div>
                  <div className='m-4 flex justify-between'>
                    <div className='font-bold text-xl '>MAX</div>
                    <div className='text-xl font-normal '> {data.main.temp_max}° C  </div>  
                  </div>
                  <div className='m-4 flex justify-between'>
                    <div className='font-bold text-xl '>MIN</div>
                    <div className='text-xl font-normal '> {data.main.temp_min}° C</div>  
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
}
export default IndexPage;