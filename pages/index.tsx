import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import Management from './components/Management'
import SalesForm from './components/SalesForm'
import {AiOutlineMenuFold} from 'react-icons/ai'


const Home: NextPage = () => {

  const [passCode, setPassCode]=useState<any>()

  const pass = 2020;
  const passAdm =5050;

  const client = pass == passCode
  const admin = passAdm == passCode



  return (
    <div className="flex h-screen flex-col items-center justify-center py-4">
      <Head>
        <title>Sport Bet Uyo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { client ||  admin &&
        <div onClick={()=>setPassCode('')} className="text-xl m-1 text-orange-600 font-bold">
        <AiOutlineMenuFold/>
        </div>
     }
      {
        !client && !admin &&
       <div className=" flex flex-col space-y-2 bg-gray-400 h-44 shadow-lg w-96 items-center justify-center rounded-lg ">

       <input value={passCode} onChange={(e: ChangeEvent<HTMLInputElement>)=>setPassCode(e.target.value)} type="password" placeholder="PassCode" className=" px-2 outline-dotted rounded-lg p-2 "/>

       <button className=" bg-orange-500 p-2 px-6 rounded-lg mt-8 text-white ">Send</button>

      </div>

    }

     {client && <SalesForm/>}

     {admin && <Management/>}
    </div>
  )
}

export default Home