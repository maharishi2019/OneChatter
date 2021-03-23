import React, {useEffect, useState, useRef} from "react"

export default function Home(props){

    return(
        <div>
            <h1>OneChatter</h1>

            <button onClick={props.logOut}>Logout</button>
        </div>
    ); 
}
