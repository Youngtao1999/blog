import React, { useState, useEffect } from "react"
import { Avatar, Divider, Popover, Image } from "antd"
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  NotificationTwoTone
} from '@ant-design/icons';
import axios from "axios"

import apiPath from "../config/api"
import "../styles/components/author.css"

const Author = () => {

  const [info, setInfo] = useState({});

  useEffect(() => {
    fetchData();
  }, [])
  // 获取类型信息和logo
  const fetchData = async () => {
    const info = await axios.get(apiPath.getLogoAvatar);
    setInfo(info.data.data[0]);
  }
  const qqContent = (
    <div>
      <Image width={100} src={info.qq}/>
    </div>
  )
  const wechatContent = (
    <div>
      <Image width={100} src={info.wechat}/>
    </div>
  )

  return (
    <div>
      <div className="author-div comm-box">
        <div>
          <Avatar size={100} src={info.avatar} />
        </div>
        <div className="author-intr">
          {info.introduce}
          <Divider>社交账号</Divider>
          <a href={info.github} target="_blank" className="github">
            <GithubOutlined className="account" />
          </a>
          <Popover content={qqContent} trigger="hover">
            <QqOutlined className="account qq" />
          </Popover>
          <Popover content={wechatContent} trigger="hover">
            <WechatOutlined className="account wechat" />
          </Popover>
        </div>
      </div>
      <div className="notice-nav comm-box">
        <div className="notice-logo"><NotificationTwoTone twoToneColor="#eb2f96"/>公告</div>
        <div className="notice-text">{info.notice}</div>
      </div>
    </div>
  )
}

export default Author;