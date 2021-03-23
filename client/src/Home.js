import React, {useEffect, useState, useRef} from "react"
import firebase from "./Firebase" 

export default function Home(props){
    const db = firebase.firestore(); 
    const user = props.currentUser.displayName; 
    const userPhotoUrl = props.currentUser.photoURL; 
    const [messages, setMessages] = useState([]); 
    const [sendMessage, setSendMessage] = useState(""); 

    const messageRef = db.collection("messages"); 

    function getMessages(){
        messageRef.orderBy("time", "asc").onSnapshot(
            (snapshot) => {
                var messages = []
                snapshot.forEach(
                    (message) => {
                        messages.push(message); 
                    }
                )
                setMessages(messages); 
            }
        )
    }

    useEffect(()=>{
        getMessages(); 
    }, [])


    function handleSubmit(event){
        event.preventDefault(); 

        messageRef.add({
            content: sendMessage, 
            sentBy: user, 
            time: firebase.firestore.Timestamp.now()
        })
    }

    function handleChange(event) {
        setSendMessage(event.target.value); 
    }

    return(
        <div>
            <h1>OneChatter</h1>
            <img src={userPhotoUrl}></img>
            {messages.slice(messages.length-20, messages.length).map(
                (message) => {
                    const messageData = message.data(); 
                    const messageContent = messageData.content; 
                    const messageSentBy = messageData.sentBy; 
                    return(
                        <div key={message.id}>
                            <p>{messageContent}</p>
                            <p>{messageSentBy}</p>
                        </div>
                    ); 
                }
            )}
            
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange}></textarea>
                <input type="submit" value="Send"></input>
            </form>
            
            {props.anonymous ?
                <button onClick={() => props.history.push("/login")}>Google Login</button>
                :
                <button onClick={props.logOut}>Logout</button>
            }
        </div>
    ); 
}
