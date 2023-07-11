import React from 'react'
import './messenger.css'
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext,useEffect,useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios"
import {io} from "socket.io-client"

export default function Messenger() {
  const [conversations,setConversations]=useState([]);
  const [currentChat,setCurrentChat]=useState(null);
  const [message,setMessage]=useState([]);
  const [newMessage,setNewMessage]=useState("");
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const [onlineUsers,setOnlineUsers]=useState([]);
  const socket=useRef();
  const {user} = useContext(AuthContext);
  const scrollRef =useRef();

  useEffect(()=>{
    socket.current =io("ws://localhost:8900");
    socket.current.on("getMessage",(data)=>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessage && 
    currentChat?.members.includes(arrivalMessage.sender)&&
    setMessage((prev)=>[...prev, arrivalMessage]);
  },[arrivalMessage,currentChat])

  useEffect(()=>{
    socket.current.emit("addUse",user._id);
    socket.current.on("getUsers",(users)=>{
      setOnlineUsers(
        user.followings.filters((f)=> users.some((u)=>u.userId===f))
      )
    })
  },[user])

  useEffect(()=>{
    const getConversations =async ()=>{
      try{
        const res=await axios.get("/conversations/"+user._id);
        setConversations(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getConversations();
  },[user._id])

  useEffect(()=>{
    const getMessage=async ()=>{
      try{
        const res=await axios.get("/message/"+currentChat?._id);
        setMessage(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getMessage();
  },[currentChat]);

  const HandleSubmit =async (e)=>{
    e.prevenDefault();
    const message ={
      sender: user._id,
      text: newMessage,
      ConversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find(
      (member)=>member!==user._id
    )

    socket.current.emit("sendMessage",{
      senderId: user._id,
      receiverId,
      text: newMessage,
    })

    try{
      const res=await axios.post("/message",message);
      setMessage([...message,res.data])
      setNewMessage("");
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  },[message]);
  return (
    <>
      <Topbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder='Search for friends' className="chatMenuInput" />
            {conversations.map((c)=>(
              <div onClick={()=>setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat? (
              <>
                <div className="chatBoxTop">
                  {message.map((m)=>(
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender===user._id}/>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                  className='chatMesageInput'
                  placeholder='write something...'
                  onChange={(e)=>setNewMessage(e.target.value)}
                  value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={HandleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ):(
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline 
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}
