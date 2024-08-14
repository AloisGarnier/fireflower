import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Signup from "./Signup";

import favicon from '../img/favicon.png'

import { useNavigate } from "react-router-dom";

export default function SignupController(props) {

    const backUrl = props.domain + "/security";

    const [noFirstName, setNoFirstName] = useState(false);
    const [noLastName, setNoLastName] = useState(false);
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [alreadyExists, setAlreadyExists] = useState(false);

    const navigate = useNavigate();

    function ownerRegistration(json) {
        if(json.trace && json.trace.startsWith("fr.eql.ai113.mille.arts.back.service.impl.AccountExistsException")) {
            setAlreadyExists(true)
        } else {
            setAlreadyExists(false)
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
            navigate("/catalogue");
        }
    }

    function addCustomer(firstName, lastName, email, password, date, month, year, phoneNumber) {

        var nfn = firstName.length == 0
        var nln = lastName.length == 0
        var wem = !email.toLowerCase()
            .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        var wpw = password.length < 8 || !password.match(/[0-9]/g) || !password.match(/[#?!@$%^&*-]/g)

        setNoFirstName(nfn)
        setNoLastName(nln)
        setWrongEmail(wem)
        setWrongPassword(wpw)

        if(!(nfn || nln || wem || wpw)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    firstName: firstName, 
                    lastName: lastName, 
                    username: email, 
                    password: password,
                    date: date,
                    month: month,
                    year: year,
                    phoneNumber: phoneNumber})
            };
            fetch(backUrl + "/register", requestOptions)
                .then(response => response.json())
                .then(json => ownerRegistration(json));
        }
    }

    return (
        <>
            <Helmet>
                <title>Inscription - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Page de création de compte" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Signup 
                addCustomer={(firstName, lastName, email, password, date, month, year, phoneNumber)  => addCustomer(firstName, lastName, email, password, date, month, year, phoneNumber)}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas} 
                noFirstName = {noFirstName}
                noLastName = {noLastName}
                wrongEmail = {wrongEmail}
                wrongPassword = {wrongPassword}
                alreadyExists={alreadyExists}
            />
        </>
    ); 


}