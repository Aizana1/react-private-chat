import React from 'react'
import { MdCall } from 'react-icons/md'
import { BsCameraVideoFill } from 'react-icons/bs'
import { FcLike } from 'react-icons/fc'

function UserInfoWindow(props) {
  return (
    <div className="user-name-info">
      <img className="sideBarProfileImg big" alt="" />
      <div id="username">
        <h2>{props.selectedUser.username}</h2>
      </div>
      <div className="icons">
        <MdCall className="icon call " />
        <BsCameraVideoFill className="icon video " />
        <FcLike className="icon favorite " />
      </div>
    </div>
  )
}

export default UserInfoWindow
