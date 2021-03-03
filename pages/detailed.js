import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import marked from "marked"
import hljs from "highlight.js"
import "markdown-navbar/dist/navbar.css"
import{ Row, Col, Breadcrumb, Affix } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Tocify from "../components/tocify.tsx"
import apiPath from "../config/api"
import "highlight.js/styles/monokai-sublime.css"
import "../styles/pages/detailed.css"

const Detailed = (props) => {

  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor} class="anchor-fix">
              <h${level}>${text}</h${level}>
            </a>\n`
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,  // 容错
    sanitize: false,  // 忽略 html
    tables: true,
    breaks: false,
    smartLists: true, //自动渲染列表
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_content);

  return (
    <>
      <Head>
        <title>博客详情页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>学习</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {props.title}
              </div>
              <div className="list-icon center">
                <span><CalendarOutlined />{props.addDate.substring(0,10)}</span>
                <span><FolderOutlined />{props.typeName}</span>
                <span><FireOutlined />{props.view_count}人</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html: html}}
              >
              </div>
            </div>
          </div>
        </Col>
        {/* 右侧 */}
        <Col  className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <Author />
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async(context) => {
  let id = context.query.id;

  const res = await axios.get(apiPath.getArticleById + id);
  return res.data.data[0];
}

export default Detailed;