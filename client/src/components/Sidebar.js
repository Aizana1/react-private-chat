import React, { useEffect, useState } from 'react'

const Sidebar = (props) => {
  const userList = props.connectedUsers
  const [lastMessage, setLastMessage] = useState(
    localStorage.getItem('lastMessage'),
  )
  const [lastMessageTime, setLastMessageTime] = useState(
    localStorage.getItem('lastMessageTime'),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      let message = localStorage.getItem('lastMessage')
      let time = localStorage.getItem('lastMessageTime')
      if (message === 'undefined' && time === 'undefined') {
        setLastMessage('')
        setLastMessageTime('')
      } else {
        setLastMessage(message)
        setLastMessageTime(time)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])


  let selectedUser = ''

  const userName_from_click = (e) => {
    selectedUser = e.target.innerText
    let selectedUserDetails = userList.find(
      (user) => user.username === selectedUser,
    )

    props.selectUser(selectedUserDetails)
  }

  return (
    <>
      {userList.map((user) => (
        <>
        <div className="user-list-el" onClick={(e) => userName_from_click(e)}>
          <img className="sideBarProfileImg" alt=""></img>
          <div key={user.key}>{user.username}</div>
         {/* <p> <span>{lastMessage}</span></p> */}
        <span className="timeSection mine" style={{  alignSelf: 'flexEnd'}}>{lastMessageTime}</span>
        </div>
       
      </>
      ))}
    </>
  )
}

export default Sidebar
