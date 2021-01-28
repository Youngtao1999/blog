import { Avatar, Divider } from "antd"
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons';
import "../styles/components/author.css"

const Author = () => {

  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="https://i.loli.net/2021/01/25/3VvIAh2LYfEGPuB.jpg" />
      </div>
      <div className="author-intr">
        前端程序员，也是一个偶像派歌手。
                <Divider>社交账号</Divider>
        <GithubOutlined className="account" />
        <QqOutlined className="account" />
        <WechatOutlined className="account" />
      </div>
    </div>
  )
}

export default Author;