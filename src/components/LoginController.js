import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Login from "./Login";

import favicon from '../img/favicon.png'
import { useNavigate } from "react-router-dom";

export default function LoginController(props) {

    const backUrl = props.domain + "/security";
    const favUrl = props.domain + "/favourites/";

    const [wrongLogin, setWrongLogin] = useState(false);

    const navigate = useNavigate();

    function ownerRegistration(json) {
        if(json && !json.owner.withdrawalDate) {
            props.setOwner({ 
                id: json.owner.id,
                firstName: json.owner.firstName, 
                lastName: json.owner.lastName, 
                email: json.owner.username, 
                password: json.owner.password,
                phoneNumber: json.owner.phoneNumber
            })
    
            window.localStorage.setItem("owner", JSON.stringify({ 
                token: json.token,
                id: json.owner.id,
                firstName: json.owner.firstName,
                lastName: json.owner.lastName,
                email: json.owner.username,
                password: json.owner.password,
                phoneNumber: json.owner.phoneNumber
            }))

            fetchFavourites(json.owner);
            navigate("/catalogue");
        } else {
            setWrongLogin(true);
        }
    }

    function jsonIfNotNull(response) {
        if(!response.ok) {
            return null
        }
        return response.json()
    }

    function fetchCustomer(login, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: login, password: password})
        };
        fetch(backUrl + "/authorize", requestOptions)
            //.then(response => response.json())
            .then(response => jsonIfNotNull(response))
            .then(json => ownerRegistration(json));
    }

    function fetchFavourites(owner) {
        fetch(favUrl + owner.id + "/all")
            .then(response => response.json())
            .then(json => saveFavourites(json))
    }

    function saveFavourites(json) {
        props.setFavourites(json);
        window.localStorage.setItem("favourites", JSON.stringify(json))
    }

    return (
        <>
            <Helmet>
                <title>Connexion - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Page de connexion" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Login 
                linkSignUp={props.linkSignUp} 
                fetchCustomer={(login, password) => fetchCustomer(login, password)} 
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
                wrongLogin = {wrongLogin}
            />
        </>

    ); 
}