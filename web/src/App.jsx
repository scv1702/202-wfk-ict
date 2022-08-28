import { useEffect } from "react";
import { useState } from "react"
import {Card} from "./components/Card";
import { Chart } from "./components/Chart";
import { Preloader } from "./components/Preloader";
import { bgColor } from "./data/BgColor";



export default function App() {

// console.log(removeSameHour);  
  const API_ENDPOINT = "https://adminbempolije.com"
    // date now to localstring
  const [temp, setTemp] = useState(
    {
      temp: 0,
      humidity: 0
    }
  ); 

  const [dataset, setDataset] = useState([]);  
  const [isLoading, setIsLoading] = useState(true);  
  
  useEffect(() => {
    document.title = 'Smart City Monitoring | POLIJE - KNU';
    getTemp();
    getTemps();
  },[]);
  
  useEffect(() => {
    setInterval(getTemp, 3000);
    setInterval(getTemps, 60000);    
  },[]);

  async function getTemp() {    
    fetch(`${API_ENDPOINT}/api/temp` || "https://adminbempolije.com/api/temp")
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);        
        setTemp(temp => ({
          ...temp,
          temp: data.temp,
          humidity: data.humidity,
          total_car: data.total_car
        }));        
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function getTemps() {        
    fetch(`${API_ENDPOINT}/api/temps` || "https://adminbempolije.com/api/temps")
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);        

        // Filter data by date and hh:mm
        const uniqueIds = [];
        const unique = data.filter(element => {
          const isDuplicate = uniqueIds.includes(element.created_at.slice(11,16));
        
          if (!isDuplicate) {
            uniqueIds.push(element.created_at.slice(11,16));
        
            return true;
          }
        
          return false;
        });        
        setDataset(dataset => ({                    
          data: unique,
        }));                                 


      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (    
    <>                   
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden dark:bg-gray-900 py-6 px-12 sm:py-12">
      <span className="absolute top-20 left-6 inline-block h-96 w-96 rounded-full bg-[#ff8e8e] mix-blend-multiply blur-2xl z-0 animate-blob2 animation-delay-2000"></span>
      <span className="absolute top-40 -left-10 inline-block h-80 w-80 rounded-full bg-[#86fff7] mix-blend-multiply blur-2xl z-0 animate-blob animation-delay-4000"></span>
      <span className="absolute top-20 right-6 inline-block h-96 w-96 rounded-full bg-[#edff75] mix-blend-multiply blur-2xl z-0 animate-blob animation-delay-3000"></span>
      <span className="absolute top-60 right-0 inline-block h-80 w-80 rounded-full bg-[#7d84ff] mix-blend-multiply blur-2xl z-0 animate-blob2 animation-delay-2000 "></span>
      {/* <div className="grid grid-cols-2 items-center justify-items-center"> */}
      <div className="flex items-center justify-center flex-wrap">
        
        {
          isLoading ? (
            <>
            <div className="h-[60px] w-2/5 block animate-pulse rounded-lg bg-gray-500 bg-opacity-40 mx-5"></div>
            <div className="w-full"></div>
            <div className="h-[60px] w-2/5 block animate-pulse rounded-lg mt-2 bg-gray-400 bg-opacity-40 mx-5"></div>            
            <div className="w-full"></div>
            <div className="h-[200px] w-[200px] animate-pulse rounded-lg mt-10 bg-gray-300 bg-opacity-40 mx-5"></div>
            <div className="h-[200px] w-[200px] animate-pulse rounded-lg mt-10 bg-gray-300 bg-opacity-40 mx-5"></div>
            </>
          ) : (
            <>
            <h1 className="w-full text-center text-gray-800 text-6xl font-bold">Smart City Monitoring</h1>
            <h1 className="w-full text-center text-gray-800 text-4xl font-medium mt-4 italic">POLIJE - KNU Collaboration</h1>
            <img src="/polije-logo.png" alt="POLIJE Logo" width={200} height={200} />
            <img src="/knu-logo.jpg" alt="KNU Logo" width={260} height={260} />
            </>
          )
        }
        
      </div>
      <div className="flex justify-between items-center flex-col md:flex-row gap-6 flex-wrap">        
        <Card bgColor={bgColor.blue} title={"Humidity"} value={temp?.humidity} symbol={"%"}/>
        <Card bgColor={bgColor.yellow} title={"Temperature"} value={temp?.temp} symbol={"°C"}/>
        <Card bgColor={bgColor.red} title={"Total Car / Minute"}  value={temp?.total_car} symbol={"/ car"}/>
      </div>

        <Chart dataset={dataset} />
        <span className="absolute bottom-20 right-6 inline-block h-60 w-60 rounded-full bg-[#ff8e8e] mix-blend-multiply blur-2xl z-0 animate-blob2 animation-delay-2000"></span>
      <span className="absolute bottom-40 right-0 inline-block h-48 w-48 rounded-full bg-[#86fff7] mix-blend-multiply blur-2xl z-0 animate-blob animation-delay-4000"></span>
      <span className="absolute bottom-20 left-6 inline-block h-60 w-60 rounded-full bg-[#edff75] mix-blend-multiply blur-2xl z-0 animate-blob animation-delay-3000"></span>
      <span className="absolute bottom-60 -left-10 inline-block h-48 w-48 rounded-full bg-[#7d84ff] mix-blend-multiply blur-2xl z-0 animate-blob2 animation-delay-2000 "></span>      
    </div>          
    </>
  )
}