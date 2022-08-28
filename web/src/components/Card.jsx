import React, { useEffect, useState } from 'react'

export const Card = ({ bgColor, value,title, symbol }) => {    
    //   get formatted date from date now to mm/dd/yyyy    
    const [date, setDate] = useState(new Date().toDateString());
    // get formatted time from date now to hh:mm withoout seconds
    const [time, setTime] = useState(new Date().toTimeString().slice(0,5));    
    // update component every 1 minute
    useEffect(() => {
        setInterval(() => {
            setDate(new Date().toDateString());
            setTime(new Date().toTimeString().slice(0,5));
        }, 60000);
    } , [time]);

    return (
        <div className={`relative w-11/12 md:w-2/5 bg-gradient-to-t ${bgColor} bg-opacity-25 px-6 my-4 pt-10 pb-8 shadow-xl ring-1 ring-white/5 backdrop-blur-lg backdrop-filter sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10`}>
            <div className="mx-auto max-w-md">
                <div className="flex items-center justify-between">
                    {
                        value ? (
                            <h2 className="text-2xl font-bold text-white my-2  after:h-full after:w-full after:block after:absolute after:inset-0 relative ">{title ? title : "Title"}</h2>                            
                            ):(                                
                                <div className="h-[32px] w-full animate-pulse rounded-lg my-2 bg-gray-300 bg-opacity-40"></div>
                        )                        
                    }
                </div>
                {
                    value ? (
                        <h1 className="mt-10 text-center text-7xl font-bold text-white  after:h-full after:w-full after:block after:absolute after:inset-0 relative ">{value ? value : 0} {symbol}</h1>
                    ) : (
                        <div className="h-[60px] w-full animate-pulse rounded-lg mt-10 bg-gray-300 bg-opacity-40"></div>
                    )

                }                            
                    <ul className="space-y-4 py-10">
                        <li className="flex items-center">
                            
                            {value ? (
                                <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-transparent stroke-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                             <p className="ml-4">
                                <code className="text-base text-white  after:h-full after:w-full after:block after:absolute after:inset-0 relative ">{date}</code>
                            </p>                                 
                                </>
                                ) : (
                                    <>
                                    <span className='h-[24px] w-[24px] bg-gray-300 opacity-30 animate-pulse rounded-lg'></span>
                                <p className='ml-4 h-[25px] w-full bg-gray-300 bg-opacity-30 animate-pulse rounded-lg'></p>
                                </>
                            )}
                        </li>
                        <li className="flex items-center">
                            
                            {value ? (
                                <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-transparent stroke-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                             <p className="ml-4">
                                <code className="text-base text-white  after:h-full after:w-full after:block after:absolute after:inset-0 relative ">{time}</code>
                            </p>                                 
                                </>
                                ) : (
                                    <>
                                    <span className='h-[24px] w-[24px] bg-gray-300 opacity-30 animate-pulse rounded-lg'></span>
                                <p className='ml-4 h-[25px] w-full bg-gray-300 bg-opacity-30 animate-pulse rounded-lg'></p>
                                </>
                            )}
                        </li>
                    </ul>                    
            </div>
        </div>
    )
}
