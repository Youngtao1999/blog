import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'

import{ Button } from 'antd'

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Header />
    <div><Button>按钮</Button></div>
  </>
)
export default Home