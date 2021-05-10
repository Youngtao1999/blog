import React, { useState, createContext, useEffect } from 'react'
import Head from 'next/head'
import Link from "next/link"
import Router from "next/router"
import axios from 'axios'
import marked from "marked"
import hljs from "highlight.js"
// import "markdown-navbar/dist/navbar.css"
import{ Row, Col, Breadcrumb, Affix, Divider, BackTop, Space } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  EyeOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Comments from '../components/Comments'
import Tocify from "../components/tocify.tsx"
import apiPath from "../config/api"
import "../styles/pages/detailed.css"
import "highlight.js/styles/monokai-sublime.css"

export const artIdContext = createContext();

const Detailed = (props) => {

  useEffect(() => {
    axios({
      method: 'post',
      url: apiPath.addViewCount,
      params: {id: props.id, view_count: props.view_count}
    })
  }, [props.id]);

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
    gfm: true,  // 允许 Git Hub标准的markdown.
    pedantic: false,  // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false,  // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: false,  // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
    highlight(code) {
      return hljs.highlightAuto(code).value;  // 代码高亮
    }
  })

  let html = marked(props.article_content); //将内容转换成 HTML 形式

  const goOtherPage = (type) =>{
    if(type === "last") {
      Router.push({
        pathname:'/detailed',
        query:{
          id: props.lastId, 
          type: props.lastType
        }
      });
    }else if(type === "next") {
      Router.push({
        pathname:'/detailed',
        query:{
          id: props.nextId, 
          type: props.nextType
        }
      });
    }
  }

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <BackTop visibilityHeight={1000} />
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {props.title}
              </div>
              <div className="list-icon center">
                <Space split={<Divider type="vertical" />}>
                  <span><CalendarOutlined />{props.addDate.substring(0,10)}</span>
                  <span><FolderOutlined />{props.typeName}</span>
                  <span><EyeOutlined />{props.view_count}人</span>
                </Space>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html: html}}
              >
              </div>
            </div>
          </div>
          <Divider />
          <Row type="flex" justify="space-between" className="other-article">
            <Col span={12}>
              {props.lastTitle && 
                <>
                  <span className="last-article hidden-mobile" onClick={() => goOtherPage("last")}><LeftOutlined />{props.lastTitle}</span>
                  <span className="last-article visible-mobile" onClick={() => goOtherPage("last")}><LeftOutlined />上一篇</span>
                </>
              }
            </Col>
            <Col span={12}>
              {props.nextTitle && 
                <>
                  <span className="next-article hidden-mobile" onClick={() => goOtherPage("next")}>{props.nextTitle}<RightOutlined /></span>
                  <span className="next-article visible-mobile" onClick={() => goOtherPage("next")}>下一篇<RightOutlined /></span>
                </>  
              }
            </Col>
          </Row>
          <artIdContext.Provider value={props.id}>
            <Comments />
          </artIdContext.Provider>
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