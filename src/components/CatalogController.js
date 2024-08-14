import React, {useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet";

import Catalog from "./Catalog";

import favicon from '../img/favicon.png'

export default function CatalogController(props) {

    useEffect(() => fetchDecorations(), []);
    useEffect(() => fetchDeactivated(), []);
    useEffect(() => fetchAverages(), []);

    const navigate = useNavigate();

    const backUrl = props.domain + "/catalog/";
    const favUrl = props.domain + "/favourites/";
    const evalUrl = props.domain + "/evaluation/"

    function fetchDecorations() {
        fetch(backUrl + "all")
            .then(response => response.json())
            .then(json => saveDecorations(json))
    }

    function saveDecorations(json) {
        props.setAllDecorations(json)
        if(props.owner && props.owner.id == 1) {
            props.setPageNumber(1)
            props.setCurrentPage(1)
            props.setDecorations(json)
        } else {
            props.setPageNumber(Math.trunc(json.length / 5.01) + 1)
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
    }

    function fetchDeactivated() {
        fetch(backUrl + "deactivated")
            .then(response => response.json())
            .then(json => props.setDeactivatedDecorations(json))
    }

    function deactivateDecoration(deco) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(backUrl + deco.id + "/deactivate", requestOptions)
        setTimeout(() => { navigate(0) }, 1000)
    }

    function reactivateDecoration(deco) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(backUrl + deco.id + "/reactivate", requestOptions)
        setTimeout(() => { navigate(0) }, 1000)
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
                <title>Catalogue - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Tout mon catalogue se trouve ici : objets décoratifs, objets de Noël, etc." />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Catalog 
                owner={props.owner} 
                domain={props.domain} 
                decorations={props.decorations}
                allDecorations={props.allDecorations}
                currentPage={props.currentPage}
                pageNumber={props.pageNumber}
                basket={props.basket} 
                setBasket={props.setBasket}
                deactivateDecoration={deactivateDecoration}
                reactivateDecoration={reactivateDecoration}
                deactivatedDecorations={props.deactivatedDecorations}
                favourites = {props.favourites}
                setFavourites = {props.setFavourites}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
                averages = {props.averages}
                setAverages = {props.setAverages}
                removeFromFavourites = {removeFromFavourites}
                addToFavourites = {addToFavourites}
                url = {"/catalogue"}
                >
            </Catalog>
        </>
    );
}