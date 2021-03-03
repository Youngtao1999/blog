import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from "axios"
import Link from "next/link"
import{ Row, Col, List, Breadcrumb } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import apiPath from "../config/api"
import "../styles/pages/comm.css"



const MyList = (list) => {
  const [ mylist, setMylist ] = useState(list.data)
  useEffect(() => {
    setMylist(list.data);
  })

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>列表页</Breadcrumb.Item>
            </Breadcrumb>
          </div>
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

MyList.getInitialProps = async(context) => {
  let id = context.query.id;

  const res = await axios.get(apiPath.getListById + id);
  return res.data;
}

export default MyList;