import React from 'react'
import './sidebar.css'
import { RssFeed,Chat, PlayCircle, Groups, Bookmark, HelpOutline, WorkOutline, Event, School} from '@mui/icons-material'
import { Users } from '../../Data'
import CloseFriend from '../closeFriend/CloseFriend'
import {Link} from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
       <div className="sidebarWrapper">
          <ul className="sidebarList">
            <Link to={'/'} style={{textDecoration:'none'}}>
              <li className="sidebarListItem">
                  <RssFeed className='sidebarIcon'/>
                  <span className="sidebarListItemText">Feed</span>
              </li>
            </Link>
            <Link to={'/messenger/'} style={{textDecoration:'none'}}>
              <li className="sidebarListItem">
                  <Chat className='sidebarIcon'/>
                  <span className="sidebarListItemText">Chats</span>
              </li>
            </Link>
            <li className="sidebarListItem">
                <PlayCircle className='sidebarIcon'/>
                <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
                <Groups className='sidebarIcon'/>
                <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
                <Bookmark className='sidebarIcon'/>
                <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
                <HelpOutline className='sidebarIcon'/>
                <span className="sidebarListItemText">Quetions</span>
            </li>
            <li className="sidebarListItem">
                <WorkOutline className='sidebarIcon'/>
                <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
                <Event className='sidebarIcon'/>
                <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
                <School className='sidebarIcon'/>
                <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className="sidebarButton">Show More</button>
          <hr className='sidebarHr' />
          <ul className="sidebarFriendList">
            {Users.map((u)=>(
              <CloseFriend key={u.id} user={u}/>
            ))}
          </ul>
       </div>
    </div>
  )
}
