import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from "axios"
import Link from "next/link"
import{ Row, Col, List, Breadcrumb, Space } from 'antd'
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
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const [ mylist, setMylist ] = useState(list.data);
  const [ type, setType ] = useState('');

  useEffect(() => {
    setMylist(list.data);
    setType(list.url.query.type);
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
              <Breadcrumb.Item>{type}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>博客列表</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item
                actions={[
                  <IconText icon={CalendarOutlined} text={item.addDate.substring(0,10)} key="list-vertical-star-o" />,
                  <IconText icon={FolderOutlined} text={item.typeName} key="list-vertical-like-o" />,
                  <IconText icon={FireOutlined} text={item.view_count} key="list-vertical-message" />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <Link href={{pathname:'/detailed',query:{id:item.id}}}>{item.title}</Link>
                    </Space>
                  }
                />
                  <Col xs={0} sm={24} md={24} lg={24} xl={24}>{item.introduce}</Col>
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