import React from 'react'
import './message.css'
import {format} from 'timeago.js'

export default function Message({message,own}) {
  return (
    <div className={own ? "message own":"message"}>
        <div className="messageTop">
            <img src="https://images.pixels.com/photos/3686769/pixels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageButton">{format(message.createdAt)}</div>
    </div>
  )
}

