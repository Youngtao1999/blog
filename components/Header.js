import React from 'react'
import '../styles/components/header.css'

import { Row, Col, Menu} from 'antd'

const Header = () => (
  <div className='header'>
    <Row type='flex' justify='center'>
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <span className="header-logo">Young</span>
        <span className="header-txt">一个偶像派歌手。</span>
      </Col>

      <Col xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            首页
          </Menu.Item>
          <Menu.Item key="video">
            视频
          </Menu.Item>
          <Menu.Item key="life">
            生活
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default Header