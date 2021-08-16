import React, { useState } from 'react'
import socket from '../socket'
import { MdCall } from 'react-icons/md'
import { BsCameraVideoFill } from 'react-icons/bs'
import { FcLike } from 'react-icons/fc'
import {RiSendPlaneFill} from 'react-icons/ri'

const Chatwindow = (props) => {
  let selectedUser = {
    ...props.selectedUser,
    messages: [],
  }

  const [messages, setMessages] = useState([])
  const [lastMessageTime, setLastMessageTime] = useState('')

  let messageContent = ''
  let ref;
  const getContent = (e) => {
    messageContent = e.target.value
    ref = e
  }

  const onMessage = (e, content) => {
    e.preventDefault()
   
    ref.target.value = ''
    if (props.selectedUser) {
      socket.emit('private message', {
        content,
        to: props.selectedUser.userID,
      })
      setMessages((messages) => [
        ...messages,
        { toUser: props.selectedUser.username, content, fromSelf: true, timestamp: new Date().toLocaleTimeString()
        },
      ])
    }
  }

  const showMessages = messages.map((message, index) => {
    if (
      message.fromSelf === true &&
      message.toUser === props.selectedUser.username
    )
      return (
        <>
        <div
          key={index}
          style={{ alignItems: 'flexEnd' }}
          className="my-message"
        >
          {message.content}
          </div>
          <span className="timeSection mine">  {message.timestamp}</span>        
        </>
      )
    if (
      message.fromSelf === false &&
      message.fromUser === props.selectedUser.username
    )
      return (
        <>
        <div
          key={index}
          style={{ textAlign: 'left' }}
          className="other-message"
        >
          {message.content}
          </div>
          <span className="timeSection other">  {message.timestamp}</span>   
          </>
      )
  })

  socket.on('private message', ({ content, from }) => {
    let newMessages = {}
    for (let i = 0; i < props.connectedUsers.length; i++) {
      const user = props.connectedUsers[i]
      if (user.userID === from) {
        const time = new Date().toLocaleTimeString()
        newMessages = {
          fromUser: props.connectedUsers[i].username,
          content,
          fromSelf: false,
          timestamp: time,
        }
        const messagesList = [...messages, newMessages]
        setMessages(messagesList)
      }
    }

  })
  if (messages !== []){
    localStorage.setItem('lastMessage',messages[messages.length-1]?.content)
    localStorage.setItem('lastMessageTime',messages[messages.length-1]?.timestamp)
  }
 

  return (
    <div className="chat-window">
      <div className="user-name-card">
        <img className="sideBarProfileImg" alt=""></img>
        <p>{props.selectedUser.username}</p>
        <div className="icons-for-actions">
          <MdCall className="icon call" />
          <BsCameraVideoFill className="icon video" />
          <FcLike className="icon favorite" />
        </div>
      </div>
      <div className="message-container">{showMessages}
      </div>
      <form className="sendMessageForm" onSubmit={(e) => onMessage(e, messageContent)}>
        <input
          className="chat-text-area"
          placeholder="Enter message to send"
          onChange={(e) => getContent(e)}
        ></input>
        <RiSendPlaneFill className="icon" onClick={(e) => onMessage(e, messageContent)}/>
      </form>
    </div>
  )
}

export default Chatwindow
