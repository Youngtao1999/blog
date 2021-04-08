import React, { useState, useEffect } from 'react'
import axios from "axios"
import '../styles/components/bgimg.css'

const Bgimg = () => {
  const [hitokoto, setHitokoto] = useState("");
  const [from, setFrom] = useState("");
  
  useEffect(() => {
    getHitokoto();
  }, [])

  const getHitokoto = async() => {
    const params = {
      min_length: 2,
      max_length: 16,
    }
    const res = await axios({
      method: 'GET',
      url: 'http://v1.hitokoto.cn',
      params,
    })
    setHitokoto(res.data.hitokoto);
    setFrom(`-《${res.data.from}》`);
  }


  return (
    <div className='bgimg'>
      <div>
        {/* <h1 className="motto">好好学习 天天敲代码_</h1> */}
        <h1 className="hitokoto">{hitokoto}</h1>
        <div className="from">{from}</div>
      </div>
    </div>
  )
}

export default Bgimg