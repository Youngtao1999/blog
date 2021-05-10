import React, { useEffect, useState, useContext } from 'react';
import { Comment, Tooltip, Avatar, Form, Input, Button, message } from 'antd';
import axios from 'axios'
import { HeartTwoTone, CloseSquareOutlined } from '@ant-design/icons';

import { artIdContext } from "../pages/detailed"
import apiPath from "../config/api"
import "../styles/components/comments.css"

const Comments = () => {
  const { TextArea } = Input;

  const articleId = useContext(artIdContext);
  // 评论字段
  const [commentsList, setCommentsList] = useState([]);
  const [commentUserName, setCommentUserName] = useState("匿名用户");
  const [commentContent, setCommentContent] = useState("");
  // 回复字段
  const [replyUserName, setReplyUserName] = useState("匿名用户");
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    getCommentsList();
  }, [articleId])

  // 获取评论列表
  const getCommentsList = () => {
    axios({
      method: 'get',
      url: apiPath.getCommentsById,
      params: { id: articleId }
    }).then(res => {
      if(res.data.success) {
        setCommentsList(res.data.data);
      }
    })
  }
  // 评论点赞&&回复点赞
  const like = (id, likes, type) => {
    if(type === "comment") {
      axios({
        method: 'post',
        url: apiPath.addCommentLikes,
        data: {id, comment_likes: likes}
      })
    }else if(type === "reply") {
      axios({
        method: 'post',
        url: apiPath.addReplyLikes,
        data: {id, reply_likes: likes}
      })
    }
    getCommentsList();
  };
  // 获取当前时间
  const getCurrentDate = (format) => {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var time = "";
    //精确到天
    if(format==1){
      time = year + "-" + month + "-" + date;
    }
    //精确到分
    else if(format==2){
      time = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
    }
    return time;
  }
  // 提交评论
  const submitCom = () => {
    if(!commentContent) {
      message.warning("请输入评论内容");
      return false;
    }
    const params = {
      article_id: articleId,
      comment_userName: commentUserName,
      comment_content: commentContent,
      comment_date: getCurrentDate(2)
    }
    axios({
      method: 'post',
      url: apiPath.addComment,
      data: params
    }).then(res => {
      if(res.data.success) {
        getCommentsList();
        message.success("评论成功");
        setCommentUserName("匿名用户");
        setCommentContent("");
      }else {
        message.error("评论失败");
      }
    }).catch(error => {
      message.error("评论失败");
    })
  }
  // 打开回复按钮
  const showItemReply = (id) => {
    const newList = commentsList.map(item => {
      if(item.id === id) {
        item.showReply = "block";
      }else {
        item.showReply = "none";
      }
      return item   
    })
    setCommentsList(newList);
  }
  // 打开回复的回复
  const showReplyBox = (id, commentId) => {
    const newList = commentsList.map(item => {
      if(item.id === commentId) {
        item.reply.forEach(citem => {
          if(citem.id === id) {
            citem.showReply = "block";
          }else {
            citem.showReply = "none";
          }
        })
      }
      return item   
    })
    setCommentsList(newList);
  }
  // 关闭回复按钮
  const closeItemReply = (id, type, commentId) => {
    if(type === "comment") {
      const newList = commentsList.map(item => {
        if(item.id === id) {
          item.showReply = "none"
        }
        return item   
      })
      setCommentsList(newList);
    }else if(type === "reply") {
      const newList = commentsList.map(item => {
        if(item.id === commentId) {
          item.reply.forEach(citem => {
            if(citem.id === id) {
              citem.showReply = "none";
            }
          })
        }
        return item   
      })
      setCommentsList(newList);
    }
  }
  // 提交回复
  const submitReply = (item, type) => {
    if(!replyContent) {
      message.warning("请输入回复内容");
      return false;
    }
    const params = {
      article_id: articleId,
      reply_userName: replyUserName,
      reply_content: replyContent,
      reply_date: getCurrentDate(2)
    }
    if(type === "comment") {
      params.comment_id = item.id;
      params.from_name = null;
    }else if(type === "reply") {
      params.comment_id = item.comment_id;
      params.from_name = item.reply_userName;
    }
    console.log(params,111);
    axios({
      method: 'post',
      url: apiPath.addReply,
      data: params
    }).then(res => {
      if(res.data.success) {
        getCommentsList();
        message.success("评论成功");
      }else {
        message.error("评论失败");
      }
    }).catch(error => {
      message.error("评论失败");
    })
    setReplyUserName("匿名用户");
    setReplyContent("");
  }
  // 回复框
  const replyBox = (item, type) => (
    <div key={item.id} className='submit-box' style={{display: item.showReply}}>
      <Form.Item>
        <Input 
          className='user-input' 
          value={replyUserName} 
          placeholder="匿名用户" 
          bordered={false} 
          onChange={(e) => setReplyUserName(e.target.value)}
        />
        <CloseSquareOutlined className="close-btn" onClick={() => closeItemReply(item.id, type, item.comment_id)} />
      </Form.Item>
      <Form.Item>
        <TextArea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)} 
          rows={4} 
          bordered={false} 
          allowClear={true}
          placeholder={type==="comment" ? "交流一下" : `@${item.reply_userName}`}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={() => submitReply(item, type)} >
          提交
        </Button>
      </Form.Item>
    </div>
  )

  return (
    <>
      {/* 提交框 */}
      <div className='submit-box'>
        <Form.Item>
          <Input 
            className='user-input' 
            value={commentUserName} 
            placeholder="匿名用户" 
            bordered={false} 
            onChange={(e) => setCommentUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)} 
            rows={4} 
            bordered={false} 
            allowClear={true}
            placeholder="夸夸我吧" 
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={submitCom}>
            提交
          </Button>
        </Form.Item>
      </div>
      {/* 评论列表 */}
      <div className="coments-count">{commentsList.length} 评论</div>
      {
        commentsList.map((item, index) => (
          <div>
            <Comment
              style={{display: item.comment_state}}
              key={index}
              actions={
                [
                  <Tooltip key="comment-basic-like" title="Like">
                    <span onClick={() => like(item.id, item.comment_likes, "comment")}>
                      <HeartTwoTone  twoToneColor="#eb2f96"/>
                      {/* <LikeOutlined /> */}
                      <span className="comment-action">{item.comment_likes>0 ? item.comment_likes : ""}</span>
                    </span>
                  </Tooltip>,
                  <span key="comment-basic-reply-to" onClick={() => showItemReply(item.id)} >回复</span>,
                ]
              }
              author={<a>{item.comment_userName}</a>}
              avatar={
                <div className='avatar-div'>
                  {item.comment_userName[0]}
                </div>
              }
              content={
                <p>
                  {item.comment_content}
                </p>
              }
              datetime={
                  <span>{item.comment_date}</span>
              }
            >
              {replyBox(item, "comment")}
              {/* 回复列表 */}
              {
                item.reply.map((item, index) => (
                  <div className="reply-box">
                    <Comment
                      style={{display: item.reply_state}}
                      key={index}
                      actions={
                        [
                          <Tooltip key="comment-basic-like" title="Like">
                            <span onClick={() => like(item.id, item.reply_likes, "reply")}>
                              <HeartTwoTone  twoToneColor="#52c41a"/>
                              {/* <LikeOutlined /> */}
                              <span className="comment-action">{item.reply_likes>0 ? item.reply_likes : ""}</span>
                            </span>
                          </Tooltip>,
                          <span key="comment-basic-reply-to" className="reply-to" onClick={() => showReplyBox(item.id, item.comment_id)} >回复</span>,
                        ]
                      }
                      author={<a>{item.reply_userName}</a>}
                      avatar={
                        <div className='avatar-div avatar-reply'>
                          {item.reply_userName[0]}
                        </div>
                      }
                      content={
                        <p>
                          {(item.from_name!=="null"&&item.from_name!==null) ? <span className="from-name">{`@${item.from_name}`}</span> : ""}{item.reply_content}
                        </p>
                      }
                      datetime={
                          <span>{item.reply_date}</span>
                      }
                    />
                    {replyBox(item, "reply")}
                  </div>
                ))
              }
            </Comment>
            {/* {replyBox(item)} */}
          </div>
        ))
      }
    </>
  );
};

export default Comments