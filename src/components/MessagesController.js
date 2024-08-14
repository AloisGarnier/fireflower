import React, { useEffect, useState } from "react";
import Messages from "./Messages";

export default function MessagesController(props) {

    const [messages, setMessages] = useState([]);
    const backUrl = props.domain + "/message/";

    useEffect(() => fetchMessages(), []);

    function fetchMessages() {
        fetch(backUrl + "conversation/" + props.owner.id)
            .then(response => response.json())
            .then(json => setMessages(json))
    }

    function sendMessage(message) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : message
        };
        fetch(backUrl + "newCustomerMessage/" + props.owner.id, requestOptions)
            .then(() => fetchMessages())
    }

      return(
        <Messages
            owner = {props.owner}
            messages = {messages}
            sendMessage = {sendMessage}
            isDiscussionDisplayed = {props.isDiscussionDisplayed}
            setDiscussionDisplayed = {props.setDiscussionDisplayed}
        />
    );
}