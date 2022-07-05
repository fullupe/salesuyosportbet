import React from 'react'
import { AiFillInstagram,AiOutlineTwitter } from 'react-icons/ai'


function Footer() {
  return (
    <div className="flex flex-col text-center justify-center items-center font-bold py-4 px-2 mt-0 text-[#324d67] space-y-4">
      <p>2022 R&S SportBet. All Rights Reserved</p>
      <p className=" flex text-2xl gap-4 ">
        <AiFillInstagram/>
        <AiOutlineTwitter/>

      </p>
    </div>
  )
}

export default Footer