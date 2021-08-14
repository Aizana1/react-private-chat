import React, { useEffect, useState } from 'react'

const Sidebar = (props) => {
  const userList = props.connectedUsers
  //  const [lastMessage, setLastMessage] = useState('')
  //  const [lastMessageTime, setLastMessageTime] = useState('')

  //  useEffect(()=>{
  //     setLastMessage(localStorage.getItem('lastMessage'))
  //     setLastMessageTime(localStorage.getItem('lastMessageTime'))

  //  },[])

  console.log('In sidebar userlist:', userList)
  let selectedUser = ''

  const userName_from_click = (e) => {
    selectedUser = e.target.innerText
    let selectedUserDetails = userList.find(
      (user) => user.username === selectedUser,
    )

    props.selectUser(selectedUserDetails)
  }

  let showUsers = userList.map((user) => {
    return (
      <div className="user-list-el" onClick={(e) => userName_from_click(e)}>
        <img className="sideBarProfileImg" alt=""></img>
        <div key={user.key}>{user.username}</div>
        {/* <span>{lastMessage}</span>
        <span>{lastMessageTime}</span> */}
      </div>
    )
  })
  return <div>{showUsers}</div>
}

export default Sidebar
