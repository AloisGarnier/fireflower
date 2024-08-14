import React, { useEffect } from "react";

import Catalog from "./Catalog";

import { Helmet } from "react-helmet";

import christmasBg from "../img/christmas-bg.png";
import favicon from "../img/favicon.png";

export default function ChristmasController(props) {

    useEffect(() => {
        fetchDecorations();
        props.setThemeBackground(christmasBg);
        props.setChristmas(true);
    }, []);
    useEffect(() => fetchAverages(), []);


    const backUrl = props.domain + "/catalog";
    const favUrl = props.domain + "/favourites";
    const evalUrl = props.domain + "/evaluation/"

    function fetchDecorations() {
        fetch(backUrl + "/noel")
            .then(response => response.json())
            .then(json => saveDecorations(json))
    }

    function saveDecorations(json) {
        props.setAllDecorations(json)
        props.setPageNumber(json.length % 5 + 1)
        if(json.length <= 5) {
            props.setCurrentPage(1)
            props.setDecorations(json)
        } else if(!location.search.substring(3)) {
            props.setCurrentPage(1)
            props.setDecorations(json.slice(0, 5))
        } else {
            var substring = location.search.substring(3)
            props.setCurrentPage(substring)
            props.setDecorations(json.slice(5*(substring-1), 5*substring))
        }
    }

    function removeFromFavourites(deco) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(favUrl + "remove/" + props.owner.id + "/" + deco.id, requestOptions)
            .then(() => fetchFavourites())
    }

    function addToFavourites(deco) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(favUrl + "new/" + props.owner.id + "/" + deco.id, requestOptions)
            .then(() => fetchFavourites())
    }

    function fetchFavourites() {
        fetch(favUrl + props.owner.id + "/all")
            .then(response => response.json())
            .then(json => saveFavourites(json))
    }

    function saveFavourites(json) {
        props.setFavourites(json);
        window.localStorage.setItem("favourites", JSON.stringify(json))
    }

    function fetchAverages() {
        fetch(evalUrl + "all/ratings")
            .then(response => response.json())
            .then(json => props.setAverages(json))
    }

    return(
        <>
            <Helmet>
                <title>Noël - Mille Arts</title>
                <meta name="description" content="Décorations de Noël et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Venez dans ma boutique en-ligne pour acheter plein d'objets décoratifs en attendant le Père Noël" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Catalog owner={props.owner} 
                    decorations={props.decorations} 
                    basket={props.basket} 
                    setBasket={props.setBasket}
                    favourites = {props.favourites}
                    setFavourites = {props.setFavourites}
                    averages = {props.averages}
                    setAverages = {props.setAverages}
                    isLightTheme = {props.isLightTheme}
                    isChristmas = {props.isChristmas}
                    setChristmas = {props.setChristmas}
                    removeFromFavourites = {removeFromFavourites}
                    addToFavourites = {addToFavourites}
                    url = {"/noel"}>
            </Catalog>
        </>
    );

}