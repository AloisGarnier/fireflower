import React, { useEffect, useState } from "react";
import MessagesHandling from "./MessagesHandling";

export default function MessagesHandlingController(props) {

    const [chattingCustomers, setChattingCustomers] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(0);
    const [currentMessages, setCurrentMessages] = useState([]);

    useEffect(() => { fetchChattingCustomers(); }, []);

    const backUrl = props.domain + "/message/";

    function fetchChattingCustomers() {
        fetch(backUrl + "allCustomers")
            .then(response => response.json())
            .then(json => setChattingCustomers(json))
    }

    function fetchCurrentMessages(customerId) {
        fetch(backUrl + "conversation/" + customerId)
            .then(response => response.json())
            .then(json => setCurrentMessages(json))
    }

    function sendMessage(message) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : message
        };
        fetch(backUrl + "newSentMessage/" + currentCustomer, requestOptions)
            .then(() => fetchCurrentMessages(currentCustomer))
    }

    return(
            <MessagesHandling
                owner = {props.owner}
                chattingCustomers = {chattingCustomers}
                currentCustomer = {currentCustomer}
                setCurrentCustomer = {setCurrentCustomer}
                currentMessages = {currentMessages}
                fetchCurrentMessages = {fetchCurrentMessages}
                sendMessage= {sendMessage}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
            />
    );
}