import React, { useEffect, useState } from 'react'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Moment from 'moment';
import {FcSalesPerformance,FcDebt} from 'react-icons/fc'
import {BsCashStack} from 'react-icons/bs'
import Currency from 'react-currency-formatter';
//import Data from '../Data'
//import { chain, groupBy } from "lodash";
//import _ from 'lodash';

function Management() {

  const URL_GET:string = process.env.NEXT_PUBLIC_BASE_URL_GET_DATASALE as string

    const [DataApi, setDataApi] = useState<any>([])
    const [reflesh, setReflesh] = useState<boolean>(false)

    // const [allGroup, setAllGroup] = useState<any>([])



    function httpGet(URL: string | URL) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", URL, false ); // false for synchronous request
        xmlHttp.send( null );
        const ApiData = JSON.parse(xmlHttp.responseText)
          setDataApi(ApiData.data)
      }
    
       useEffect(() => {
      //console.log(DataApi)
        httpGet(URL_GET)
    
    },[reflesh])

    
//groupBy BRANCH
    const result = DataApi.reduce(function(r: { [x: string]: any[]; }, a: { salesPersonName: string | number; }){
        r[a.salesPersonName]=r[a.salesPersonName] || [];
        r[a.salesPersonName].push(a);
        return r;

    },Object.create(null));

    // review[1].reduce((total: any, value: { salesSi: any; })=>total+Number(value.salesSi),0)

   const salesSi = DataApi.reduce((total: any, value: { salesSi: any; })=>total+Number(value.salesSi),0)
   const sport = DataApi.reduce((total: any, value: { sport: any; })=>total+Number(value.sport),0)
   const vitual = DataApi.reduce((total: any, value: { vitual: any; })=>total+Number(value.vitual),0)
   const float = DataApi.reduce((total: any, value: { float: any; })=>total+Number(value.float),0)

   const TotalSales = salesSi+sport+vitual+float;

   const cashIn = DataApi.reduce((total: any, value: { cashin: any; })=>total+Number(value.cashin),0)
   const expenses = DataApi.reduce((total: any, value: { expenses: any; })=>total+Number(value.expenses),0) 

   const TotalCashInExpenses = cashIn + expenses;

   const TotalDebt = TotalSales - TotalCashInExpenses;


    console.log("home",salesSi)

// total Tpm 
//const TotalTpm = DataApi.length;


//   working tpm
//  const TotalWorkingTpm = DataApi.filter((record: { status: string; })=>{

//  return record.status=="Already Out"

// })


// const BranchTotalAlreadyOut =(branchArry: [])=>{

//   const   ok: any[] =  branchArry.filter((record: { status: string; })=>{
//       return  record.status=='Already Out'

      
// })
//  return ok.length
// }





//  const ActiveTpm = TotalWorkingTpm.length;

//  const OtherTpm =TotalTpm - ActiveTpm;


//  const ActivePercentage = Math.round((ActiveTpm / TotalTpm)*100)

//  const OtherPercentage =Math.round((OtherTpm/TotalTpm)*100)




 const newdata = Object.entries(result)



  return (
      <div className="h-full w-full p-2 items-center flex justify-center m-0">
    <div
      className={`py-3 pb-4  items-center px-3 bg-whitee bg-gradient-to-r from-sky-500 to-indigo-500 shadow-2xl h-full md:max-w-md !important text-lg rounded-2xl relative  flex flex-col  w-full  text-white mt-8 mb-8`}
    >
       <div className=" bg-gray-200 flex flex-col w-full h-2/4 mb-2 shadow-xl items-center justify-center space-x-2 rounded-2xl">
                    <p className="text-gray-500 text-sm py-4  mb-2   font-cinzel ">Summary Report RnS Sports Bet Uyo </p>
                    <small className="animate-bounce">⚽️</small>
        <div className="bg-whites flex w-full h-2/4 mb-2 shadow-xls items-center justify-center space-x-2 rounded-2xl">
                   
            <div className=" shadow-xl border-2 items-center  border-red-300  flex flex-col px-2">
            <div className="bg-gradient-to-r from-sky-900 to-indigo-400 p-12 rounded-full w-8 items-center justify-center h-8 flex  m-1"> 
            <p className="font-cinzel font-semibold text-xs">
            <Currency
            quantity={TotalSales}
            currency="NGN"
            />
            
              
              </p>
            </div>
            <p className="text-orange-500 text-sm pb-2 font-cinzel ">Total Sales</p>
            </div>

            <div className="shadow-xl border-2 items-center border-red-300 flex flex-col px-2">
          
            <div className="bg-gradient-to-r from-yellow-500 to-indigo-500 p-12 rounded-full w-8 items-center justify-center  h-8 flex m-1">
                
                <p className="text-xs font-semibold font-cinzel">

            <Currency
            quantity={TotalCashInExpenses}
            currency="NGN"
            />
                 
                  </p>
            </div>
            <p className="text-orange-500 text-sm pb-2 font-cinzel">Total CashIn + Exp</p>
            </div>

            <div className="shadow-xl border-2 items-center border-red-300 flex flex-col px-2">
            <div className="bg-gradient-to-r from-red-500 to-indigo-500 p-12 rounded-full w-8 items-center justify-center  h-8 flex m-1">
                <p className="text-xs font-semibold font-cinzel">
              <Currency
            quantity={TotalDebt}
            currency="NGN"
            />
                
                  </p>
            </div>
            <p className="text-orange-500 text-sm pb-2 font-cinzel">Total Debt</p>
            </div>

        </div>

        </div>
        
        <div className="bg-white  flex  w-full h-3/4 shadow-xl rounded-2xl items-center flex-col pt-1 overflow-y-scroll">
           

        <Swiper className="flex  flex-col h-full w-80 md:w-2/2 gap-5 mt-4 "
         // install Swiper modules
         modules={[Pagination]}
         spaceBetween={40}
         slidesPerView={1}
         navigation
        //  scrollbar={{ draggable: true }}
         pagination={{ clickable: true }}
        
      >
        {newdata.map((review: any[])=>(

          
        <SwiperSlide key={0} className=" flex  mb-2 md:mb-12 flex-col space-y-4 items-center text-center p-2 select-none border-2 rounded-lg bg-gray-000 ">
        
       
            <div className="flex h-full  space-y-2 flex-col items-start w-full">

            <p className="text-red-500 italic justify-self-center font-tapestry">{review[0]}</p>

                    <div className="flex w-full p-x-2 items-center justify-center space-x-2">

                    <div className="flex flex-col shadow-xl bg-gradient-to-r from-black to-indigo-500 opacity-100 p-1 rounded-md h-20   w-full space-y-2"> 
                    <div className="flex justify-center items-center space-x-4">
                    <FcSalesPerformance/>
                    <p className="text-sm">Sales</p>
                    </div>
                    <p 
                    
                    className="text-sm"> 
                    <Currency
                    quantity={review[1].reduce((total: any, value: { salesSi: any; })=>total+Number(value.salesSi),0)+review[1].reduce((total: any, value: { sport: any; })=>total+Number(value.sport),0)+review[1].reduce((total: any, value: { vitual: any; })=>total+Number(value.vitual),0)+review[1].reduce((total: any, value: { float: any; })=>total+Number(value.float),0) }
                    currency='NGN'
                    />
                    
                    
                    
                    </p> 
                    </div> 


                    <div className="flex flex-col shadow-xl bg-gradient-to-r from-black to-indigo-500 opacity-100 p-1 rounded-md h-20  w-full space-y-2"> 
                    <div className="flex justify-center items-center space-x-4">
                    <BsCashStack color="orange"/>
                    <p className="text-sm">CashIn</p>
                    </div>
                     <p className="text-sm">  
                     <Currency
                     quantity={review[1].reduce((total: any, value: { cashin: any; })=>total+Number(value.cashin),0) + review[1].reduce((total: any, value: { expenses: any; })=>total+Number(value.expenses),0)}
                     currency="NGN"
                     />
                     
                     
                     </p>
                    </div> 



                    <div className="flex flex-col shadow-xl bg-gradient-to-r from-black to-indigo-500 opacity-100 p-1 rounded-md h-20  w-full space-y-2 "> 
                    <div className="flex justify-center items-center space-x-4">
                    <FcDebt color="orange"/>
                    <p className="text-sm">Debt</p>
                    </div>
                    <p className="text-sm"> 

                    <Currency
                    quantity={(review[1].reduce((total: any, value: { salesSi: any; })=>total+Number(value.salesSi),0)+review[1].reduce((total: any, value: { sport: any; })=>total+Number(value.sport),0)+review[1].reduce((total: any, value: { vitual: any; })=>total+Number(value.vitual),0)+review[1].reduce((total: any, value: { float: any; })=>total+Number(value.float),0))-(review[1].reduce((total: any, value: { cashin: any; })=>total+Number(value.cashin),0) + review[1].reduce((total: any, value: { expenses: any; })=>total+Number(value.expenses),0))}
                    currency='NGN'
                    />
                    
                    
                    </p>
                    </div> 

                    </div>

                 

                    <div className="flex flex-col h-full w-full overflow-y-scroll  bg-yellow-00 pb-8 space-y-2 scrollbar-hide ">
                    
                    {
                     
                   
                      review[1].map((details:any)=>(

                    

                          // <div className=" flex w-full h-[10%]  bg-red-900 p-2 shadow-xl z-10 rounded-xl  my-2  ">

                          <div className=" h-full ">
                        
                          <div className=" flex justify-around space-xx-1 shadow-xl z-10 rounded-lg px-1  ">

                            <div className="flex flex-col items-center">
                            <p className=" flex text-xs text-orange-500">Sales</p>
                            <p className="text-xs text-gray-500 p-4"> 
                            <Currency
                            quantity={details?.salesSi+details.sport+details.vitual+details.float}
                            currency="NGN"
                            
                            />
                              </p>
                            </div>

                            <div className=" flex-flex-col items-center">
                            <p className="text-xs text-orange-500">CashIn</p>

                            <p className="text-xs text-gray-500 p-4">
                            <Currency
                            quantity={details?.cashin+details?.expenses}
                            currency="NGN"
                            />
                             

                            </p>
                            </div>

                            <div className="flex  flex-col items-center">
                            <p className="text-xs text-orange-500">Dept</p>

                            <p className="text-xs text-gray-500 p-4">

                            <Currency
                            quantity={(details?.salesSi+details.sport+details.vitual+details.float)-(details?.expenses+details?.cashin)}
                            currency="NGN"
                            />
                              </p>
                            </div>

                            <div className="flex flex-col items-center">
                            <p className="text-xs text-orange-500">Date</p>
                            <p className="text-xs text-gray-500 p-4">{Moment(details?.createdAt).format('DD/MM')}</p>
                            </div>

                            
                          </div>

                          

                      
                        </div>
             
                      ))
                     
                
                    }
                    </div>

                   

                    
            </div>

        
        </SwiperSlide>
        
     
        
        ))}

      </Swiper>

        </div>
      
    </div>
    </div>
  )
}

export default Management
