import React, {useState, useEffect} from "react";
import { Helmet } from "react-helmet";

import About from "./About";

import favicon from '../img/favicon.png'

export default function AboutController(props) {

    const backUrl = props.domain + "/about";

    useEffect(() => fetchAbout(), []);

    function fetchAbout() {
        fetch(backUrl + "/get")
        .then(response => response.text())
        .then(text => props.setAbout(text))
    }

    function modifyAbout(newDescription) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: newDescription
        };
        fetch(backUrl + "/modify", requestOptions)
            .then(response => response.json())
            .then(() => fetchAbout());
    }

    return(
        <>
            <Helmet>
                <title>A propos - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="A propos de moi et mentions légales" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <About 
                owner={props.owner} 
                about={props.about} 
                fetchAbout={() => fetchAbout()} 
                modifyAbout={(newDescription) => modifyAbout(newDescription)}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}>
            </About>
        </>
    )
}