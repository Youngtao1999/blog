import React, { useEffect, useState } from 'react'
import { Row, Col, Menu, Switch } from 'antd'
import Router from "next/router"
import Link from "next/link"
import axios from "axios"

import apiPath from "../config/api"
import '../styles/components/header.css'

const Header = () => {

  const [typeMenu, setTypeMenu] = useState([])
  useEffect(() => {
    fetchData();
  }, [])
  // 获取类型信息
  const fetchData = async () => {
    const res = await axios.get(apiPath.getTypeInfo);
    setTypeMenu(res.data.data);
  }
  // 跳转
  const handleClick = (e) => {
    console.log(e.key);
    if(e.key == 0) {
      Router.push("/index");
    }else {
      Router.push("/list?id="+e.key);
    }
  }
  // 改变背景色
  const changeBgc = () => {
    const toggle = document.getElementsByClassName("switch")[0];
    document.documentElement.classList.toggle("dark-mode");
  }
  
  return (
    <div className='header'>
      <Row type='flex' justify='center'>
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">Young</span>
          <span className="header-txt"> 一个偶像派歌手。</span>
        </Col>

        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            {
              typeMenu.map((item) => (
                <Menu.Item key={item.id} onClick={handleClick}>
                  <span className="icon-span" dangerouslySetInnerHTML={{__html: item.icon}} />
                  {item.typeName}
                </Menu.Item>
              )
              )
            }
          </Menu>
        </Col>
        <Switch
          className="switch"
          checkedChildren="黑夜" 
          unCheckedChildren="白昼"
          onChange={changeBgc}
        />
      </Row>
    </div>
  )
}

export default Header