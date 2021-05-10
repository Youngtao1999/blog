import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from "axios"
import Link from "next/link"
import{ Row, Col, List, Breadcrumb, Space, Pagination } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  EyeOutlined,
  NotificationTwoTone
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

  const [ mylist, setMylist ] = useState(list);
  const [ type, setType ] = useState(list.url.query.type);
  const [ current, setCurrent ] = useState(1)
  const [ pageSize, setPageSize ] = useState(10)

  useEffect(() => {
    setType(list.url.query.type);
    setMylist(list)
  }, [list.id])
  // 换页
  const changePage = (page) => {
    axios({
      method: 'get',
      url: apiPath.getListById,
      params: {
        id: list.id,
        page: page,
        size: pageSize
      }
    }).then(res => {
      setMylist(res.data);
    })
  }

  return (
    <>
      <Head>
        <title>{type}</title>
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
            dataSource={mylist.data}
            renderItem={item => (
              <List.Item
                actions={[
                  <IconText icon={CalendarOutlined} text={item.addDate.substring(0,10)} key="list-vertical-star-o" />,
                  <IconText icon={FolderOutlined} text={item.typeName} key="list-vertical-like-o" />,
                  <IconText icon={EyeOutlined} text={item.view_count} key="list-vertical-message" />,
                ]}
                extra={
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
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
                      <Link href={{pathname:'/detailed',query:{id:item.id}}}>{item.title}</Link>
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

MyList.getInitialProps = async(context) => {
  let id = context.query.id;
  // const res = await axios.get(apiPath.getListById + id);
  const res = await axios({
    method: 'get',
    url: apiPath.getListById,
    params: {
      id,
      page: 1,
      size: 10
    }
  })
  res.data[id] = id;
  return res.data;
}

export default MyList;