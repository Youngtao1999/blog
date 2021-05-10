import React, { useState } from 'react'
import Head from 'next/head'
import Link from "next/link"
import axios from 'axios'
import{ Row, Col, List, Space, Pagination } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  EyeOutlined,
  NotificationTwoTone
} from '@ant-design/icons';

import Header from '../components/Header'
import Bgimg from '../components/Bgimg'
import Author from '../components/Author'
import Footer from '../components/Footer'
import apiPath from "../config/api"
import "../styles/pages/index.css"



const Home = (list) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const [ mylist, setMylist ] = useState(list)
  const [ current, setCurrent ] = useState(1)
  const [ pageSize, setPageSize ] = useState(10)

  const changePage = (page) => {
    axios({
      method: 'get',
      url: apiPath.getArticleList,
      params: {
        page: page,
        size: pageSize
      }
    }).then(res => {
      setMylist(res.data)
    })
  }

  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <Header />
      <Bgimg />
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>全部博客</div>}
            itemLayout="vertical"
            dataSource={mylist.data}
            renderItem={item => (
              <List.Item
                actions={[
                  <IconText icon={CalendarOutlined} text={item.addDate.substring(0,10)} key="list-vertical-star-o" />,
                  <IconText icon={FolderOutlined} text={item.typeName} key="list-vertical-like-o" />,
                  <IconText icon={EyeOutlined} text={item.view_count} key="list-vertical-message" />,
                ]}
                extra={
                  <Link href={{pathname:'/detailed',query:{id:item.id, type:item.typeName}}}>
                    <img
                      className="image-cover"
                      alt="logo"
                      src={item.image}
                    />
                  </Link>
                }
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <Link href={{pathname:'/detailed',query:{id:item.id, type:item.typeName}}}>{item.title}</Link>
                    </Space>
                  }
                />
                <Col xs={0} sm={24} md={24} lg={24} xl={24}>{item.introduce}</Col>
              </List.Item>
            )}
          />
          <div className="page-div">
            <Pagination
              className="pagination"
              size="small" 
              total={mylist.total}
              pageSize={pageSize}
              onChange={changePage}
            />
          </div>
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
  const res = await axios({
    method: 'get',
    url: apiPath.getArticleList,
    params: {
      page: 1,
      size: 10
    }
  });
  return res.data;
}

export default Home;