import React from "react";
import { Helmet } from "react-helmet";

import MyAccount from "./MyAccount";

import favicon from '../img/favicon.png'

export default function MyAccountController(props) {

    const backUrl = props.domain + "/security";

    function ownerRegistration(json) {
        let ownerId = props.owner.id;
        props.setOwner({ 
            id: ownerId,
            firstName: json.owner.firstName, 
            lastName: json.owner.lastName, 
            email: json.owner.username, 
            phoneNumber: json.owner.phoneNumber
        })

        window.localStorage.setItem("owner", JSON.stringify({ 
            id: props.owner.id,
            firstName: json.owner.firstName,
            lastName: json.owner.lastName,
            email: json.owner.username,
            password: json.owner.password,
            phoneNumber: json.owner.phoneNumber
        }))
    }

    function changeCustomer(firstName, lastName, email, password, phoneNumber) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName, 
                lastName: lastName, 
                username: email, 
                phoneNumber: phoneNumber})
        };
        fetch(backUrl + "/change/" + props.owner.id, requestOptions)
            .then(response => response.json())
            .then(json => ownerRegistration(json));
    }

    return (
        <>
            <Helmet>
                <title>Votre compte - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Gérer votre compte" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <MyAccount 
                domain={props.domain}
                owner={props.owner} 
                setOwner={props.setOwner}
                changeCustomer={(firstName, lastName, email, password, phoneNumber) => changeCustomer(firstName, lastName, email, password, phoneNumber)} 
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
            />
        </>
    );
}