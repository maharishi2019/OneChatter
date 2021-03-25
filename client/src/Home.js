import React, {useEffect, useState, useRef} from "react"
import firebase from "./Firebase" 

export default function Home(props){
    const db = firebase.firestore(); 
    const user = props.currentUser.displayName; 
    const userPhotoUrl = props.currentUser.photoURL; 
    const [messages, setMessages] = useState([]); 
    const [sendMessage, setSendMessage] = useState(""); 
    const messageEl = useRef(null);

    const messageRef = db.collection("messages"); 

    async function getMessages(){
        var size = 0;

        //get size of the database 
        await messageRef.get().then(
            (snapshot) => {
                size = snapshot.size;
            }
        )

        //get last 15 messages from the database
        await messageRef.orderBy("time", "asc").limitToLast(15).onSnapshot(
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

        if(size > 15){
            //delete messages that are not needed
            await messageRef.orderBy("time", "asc").limit(size - 15).get()
                .then(function (snapshot) {
                    var batch = db.batch();

                    snapshot.forEach(function (doc) {
                        batch.delete(doc.ref);
                    });

                    return batch.commit();
                })
        }
    }

    useEffect(()=>{ 
        getMessages(); 
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])


    function handleSubmit(event){
        event.preventDefault(); 

        messageRef.add({
            content: sendMessage, 
            sentBy: user, 
            time: firebase.firestore.Timestamp.now()
        })
    }

    function onEnterPress(e){
        if (e.keyCode == 13 && e.shiftKey == false) {
            handleSubmit(e); 
            setSendMessage("");
        }
    }

    function handleChange(event) {
        setSendMessage(event.target.value); 
    }

    function renderImage(userPhotUrl){
        if(userPhotUrl){
            return <img className="profile-pic" src={userPhotoUrl}></img>; 
        }
    }
    return(
        <div>
            <center>
                <h1 className="title">OneChatter</h1>
            </center>
            <div className="user-info">
                {props.anonymous ?
                    <div>
                        <p className="anonymous-username">Using anonymously as {user}</p>
                        <button className="btn btn-dark anonymous-side-button" onClick={() => props.history.push("/login")}>Google Login</button>
                    </div>
                    :
                    <div>
                        {renderImage(userPhotoUrl)}
                        <p className="username">{user}</p>
                        <button   className="btn btn-dark side-button" onClick={props.logOut}>Logout</button>
                    </div>
                }
            </div>

            <div className="message-box">
                <div className="message-display" ref={messageEl}>
                    {messages.map(
                        (message) => {
                            const messageData = message.data();
                            const messageContent = messageData.content;
                            const messageSentBy = messageData.sentBy;
                            if (messageSentBy === user) {
                                return (
                                    <div className="sentByUser" key={message.id}>
                                        <div className="message-content">
                                            <p>{messageContent}</p>
                                        </div>
                                        <div className="message-sent-by">
                                            <p>Sent by you</p>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="recievedByUser" key={message.id}>
                                        <div className="message-content">
                                            <p>{messageContent}</p>
                                        </div>
                                        <div className="message-sent-by">
                                            <p>Sent by {messageSentBy}</p>
                                        </div>
                                    </div>
                                );
                            }
                        }
                    )}
                </div>
                <div className="send-message-box">
                    <form onSubmit={handleSubmit}>
                        <div className="send-message-text-container">
                            <textarea row="3" className="send-message-text-box" value={sendMessage} onKeyDown={onEnterPress} onChange={handleChange}></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ); 
}
