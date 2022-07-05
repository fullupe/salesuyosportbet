import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import toast, { Toaster } from 'react-hot-toast'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle,Circles } from  'react-loader-spinner'


function SalesForm() {
  

 
  const URL_GET:string = process.env.NEXT_PUBLIC_BASE_UR_GET as string

  const URLAddData:string = process.env.NEXT_PUBLIC_BASE_URL as string
  
    const [input, setInput] = useState<string>('')

    const [salesperson, setSalesperson] = useState<string>('')
    const [salessi, setSalessi] = useState<any>()
    const [sports, setSports] = useState<any>()
    const [vitual, setVitual] = useState<any>()
    const [float, setFloat] = useState<any>()
    const [cashin, setCashin] = useState<any>()
    const [expenses, setExpenses] = useState<any>()



   //const [tpmInfo, setTpmInfo] = useState<any>('')


  const [DataApi, setDataApi] = useState<any>([])

  const [reflesh, setReflesh] = useState<boolean>(false)

  const[Loading, SetLoading] = useState<boolean>(false)



   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const request = {

      salesPersonName:salesperson,
      salesSi:salessi,
      sport:sports,
      vitual:vitual,
      float:float,
      cashin:cashin,
      expenses:expenses,
      createdAt:new Date(),
      
  }

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", URLAddData, true ); // false for synchronous request
  //console.log('READYSTATE', xmlHttp.readyState);

  if(xmlHttp.readyState==1){
    SetLoading(true)
  }else {
    SetLoading(false)
  }
  
  xmlHttp.send(JSON.stringify(request)) // Make sure to stringify


  xmlHttp.onload = function() {
             
              SetLoading(false)
              toast('Records Added!',{
                      icon:'🚀'
                    })
              console.log(xmlHttp.responseText)
              setSalesperson('')
              setSalessi('')
              setSports('')
              setVitual('')
              setFloat('')
              setCashin('')
              setExpenses('')

              setReflesh(!reflesh)

           }
           console.log('READYSTATE', xmlHttp.readyState);
       xmlHttp.onerror = function(){ alert (xmlHttp.responseText);  console.log(request)}
  }



 
    function GetData(URL: string | URL) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", URL, false ); // false for synchronous request
      xmlHttp.send( null );
      const ApiData = JSON.parse(xmlHttp.responseText)

        setDataApi(ApiData.data)
    }




      useEffect(()=>{
      GetData(URL_GET)
      },[])


      console.log('okk',DataApi)

  return (
    <div
      className={`py-4  px-6 bg-whitee bg-gradient-to-r from-sky-900 to-indigo-900 shadow-2xl h-full md:max-w-md !important text-lg rounded-2xl relative  flex flex-col  leading- w-4/5 text-white mt-`}
    >
      <Toaster />
  
       
        
        <div className=" h-96 bg-gray-00  items-center flex flex-col pt-8 ">
          <p className="text-orange-500 text-2xl font-bold font-poppins border-b mb-4">
            Daily Sales Log
          </p>

          <form className="flex flex-col mt-3 space-y-3 mb-4">

         
            <select
            className=" p-2 flex w-full text-xl rounded-lg bg-gray-100 text-black outline-none placeholder:text-xl font-cinzel"
            onChange={(e) => setSalesperson(e.target.value)}
            value={salesperson}
           >
            <optgroup className="font-poppins" label="Status">
            <option value="Name">Sales Person's Name</option>
              
              {DataApi.map((name: { name: string  })=>(

            <option value={name.name}>{name.name}</option>
              ))}
           

            </optgroup>
          </select> 


          <div className="flex flex-col">
          <label className=" font-cinzel text-sm ">Sale SI</label>
          <input
              value={salessi}
              onChange={(e) => setSalessi(e.target.value)}
       
              type="number"
           
              placeholder="Amount ₦"
              className=" p-1 w-44 flex-1 text-xl rounded-lg bg-gray-100 text-black outline-none placeholder:text-sm"
            />
            </div>
          <div className="flex flex-col">
          <label className=" font-cinzel text-sm ">Sports</label>
          <input
              value={sports}
              onChange={(e) => setSports(e.target.value)}
       
              type="number"
           
              placeholder="Amount ₦"
              className=" p-1 w-44 flex-1 text-xl rounded-lg bg-gray-100 text-black outline-none placeholder:text-sm"
            />
            </div>
          <div className="flex flex-col">
          <label className=" font-cinzel text-sm ">Vitual</label>
          <input
              value={vitual}
              onChange={(e) => setVitual(e.target.value)}
              type="number"
              placeholder="Amount ₦"
              className=" p-1 w-44 flex-1 text-xl rounded-lg bg-gray-100 text-black outline-none placeholder:text-sm"
            />
            </div>

          <div className="flex flex-col">
          <label className=" font-cinzel text-sm ">Float</label>
          <input
              value={float}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFloat(e.target.value)}
              type="number"
              placeholder=" Amount ₦"
              className=" p-1 w-44 flex-1 text-xl rounded-lg bg-gray-100 text-black outline-none placeholder:text-sm"
            />
            </div>
          <div className="flex flex-col">
          <label className=" font-cinzel text-sm ">Cash In</label>
          <input
              value={cashin}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCashin(e.target.value)}
              type="number"
              placeholder=" Amount ₦"
              className=" p-1 w-44 flex-1 text-xl rounded-lg bg-gray-100 text-black outline-none placeholder:text-sm"
            />
            </div>
          <div className="flex flex-col">
          <label className=" font-cinzel text-sm ">Expenses</label>
          <input
              value={expenses}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpenses(e.target.value)}
              type="number"
              placeholder=" Amount ₦"
              className=" p-1 w-44 flex-1 text-xl rounded-lg bg-gray-100 text-black outline-none placeholder:text-sm"
            />
            </div>

            <hr />

            <div className="flex flex-col items-center">
           {Loading && <Circles color="#FC6238" width="24" height="24"/>}
            </div>

            <button type="submit" disabled={!salesperson || !salessi || !sports || !vitual || !float} onClick={handleSubmit}className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded disabled:text-gray-500">
            Submit
             </button>

           </form>

          
        </div>

       

       
      </div>
    
  )
    }

export default SalesForm
