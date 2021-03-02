import React, { useState } from 'react'
import Head from 'next/head'
import Link from "next/link"
import axios from 'axios'
import{ Row, Col, List } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

import Header from '../components/Header'
import Bgimg from '../components/Bgimg'
import Author from '../components/Author'
import Footer from '../components/Footer'
import "../styles/pages/index.css"



const Home = (list) => {
  const [ mylist, setMylist ] = useState(list.data)

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Bgimg />
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>博客头部</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    {item.title}
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined />{item.addDate.substring(0,10)}</span>
                  <span><FolderOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}人</span>
                </div>
                <div className="list-introduce">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        {/* 右侧 */}
        <Col  className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Home.getInitialProps = async () => {
  return await axios.get("http://127.0.0.1:7001/front/getArticleList/").then(res => {
    console.log(res);
    return res.data;
  });
}

export default Home;