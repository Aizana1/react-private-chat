import React, { useState } from 'react'
import Chatwindow from './Chatwindow'
import Sidebar from './Sidebar'
import UserInfoWindow from './UserInfoWindow'
const Home = (props) => {
  const [selectedUser, setSelectedUser] = useState({})
  const [userSelected, setUserSelected] = useState(false)

  const getSelectedUser = (user) => {
    setSelectedUser(user)
    setUserSelected(true)
  }

  return (
    <div className="chat-container">
      <div className="sidebar">
        {/* <div className="user-card">{props.user}</div> */}
        <div className="user-list"></div>
        <Sidebar
          connectedUsers={props.connectedUsers}
          selectUser={getSelectedUser}
        />
      </div>
      {userSelected ? (
        <>
          <Chatwindow
            selectedUser={selectedUser}
            connectedUsers={props.connectedUsers}
          />
          <UserInfoWindow selectedUser={selectedUser} />
        </>
      ) : (
        <div className="no-render-message">Click chat to start messaging</div>
      )}
    </div>
  )
}

export default Home
