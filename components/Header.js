import React, { useEffect, useState } from 'react'
import { Row, Col, Menu, Input } from 'antd'
import Router from "next/router"
import Link from "next/link"
import axios from "axios"

import {
  UnorderedListOutlined
} from '@ant-design/icons';

import apiPath from "../config/api"
import '../styles/components/header.css'

const Header = () => {

  const { Search } = Input;

  const [typeMenu, setTypeMenu] = useState([])
  const [logo, setLogo] = useState()
  const [slogan, setSlogan] = useState()
  useEffect(() => {
    fetchData();
  }, [])
  // 获取类型信息和logo
  const fetchData = async () => {
    const res = await axios.get(apiPath.getTypeInfo);
    const info = await axios.get(apiPath.getLogoAvatar);
    setTypeMenu(res.data.data);
    setLogo(info.data.data[0].logo);
    setSlogan(info.data.data[0].slogan);
  }
  // 跳转
  const handleClick = (e, item) => {
    if(e.key == 0) {
      Router.push("/");
    }else {
      Router.push(`/list?id=${e.key}&type=${item.typeName}`);
    }
  }
  
  return (
    <div className='header'>
      <Row type='flex' justify='center'>
        <Col xs={20} sm={20} md={6} lg={10} xl={6}>
          <span className="header-logo">{logo}</span>
          <span className="header-txt"> {slogan} </span>
        </Col>
        <Col xs={0} sm={0} md={4} lg={4} xl={4}>
          <Search 
            className="search-input"
            placeholder="请输入标题"
            allowClear
            size="middle"
          />
        </Col>
        <Col xs={4} sm={4} md={14} lg={8} xl={10}>
          <Menu mode="horizontal" overflowedIndicator={<UnorderedListOutlined />}>
            <Menu.Item key={0} onClick={handleClick}>
                  <span className="icon-span" />
                  全部
            </Menu.Item>
            {
              typeMenu.map((item) => (
                <Menu.Item key={item.id} onClick={(event) => handleClick(event,item)}>
                  <span className="icon-span" dangerouslySetInnerHTML={{__html: item.icon}} />
                  {item.typeName}
                </Menu.Item>
              )
              )
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header