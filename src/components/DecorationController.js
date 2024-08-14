import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

import { Helmet } from "react-helmet";

import Decoration from "./Decoration";

import favicon from '../img/favicon.png'

export default function DecorationController(props) {

    const [thisDecoration, setThisDecoration] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const [tagDisplay, setTagDisplay] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [average, setAverage] = useState(0);
    const [evalNumber, setEvalNumber] = useState(0);
    const [recommendations, setRecommendations] = useState([]);
    const [evals, setEvals] = useState([]);
    const [hasBought, setHasBought] = useState(0);

    useEffect(() => { fetchDecoration(); }, []);
    useEffect(() => { fetchAverage(); }, []);
    useEffect(() => { fetchEvalNumber(); }, []);
    useEffect(() => { fetchEvals(); }, []);
    useEffect(() => { fetchBought(); }, []);
    useEffect(() => { fetchAverages(); }, []);
    useEffect(() => { sendView(location.search.substring(4)); }, []);

    const navigate = useNavigate();

    const backUrl = props.domain + "/catalog/";
    const favUrl = props.domain + "/favourites/";
    const evalUrl = props.domain + "/evaluation/";
    const viewUrl = props.domain + "/view/";

    function fetchAverages() {
        fetch(evalUrl + "all/ratings")
            .then(response => response.json())
            .then(json => props.setAverages(json))
    }

    function sendView(id) {
        if(props.owner && props.owner.id != 1) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(viewUrl + "new/" + id + '/' + props.owner.id, requestOptions)
        } else if(props.owner == null) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(viewUrl + "new/" + id + '/0', requestOptions)
        }
    }

    function fetchDecoration() {

        fetch(backUrl + location.search.substring(4) + "/all")
            .then(response => response.json())
            .then(json => setThisDecoration(json))
        
        fetch(backUrl + location.search.substring(4) + "/pictures")
            .then(response => response.json())
            .then(json => setPictures(json));

        fetch(backUrl + location.search.substring(4) + "/price")
            .then(response => response.json())
            .then(json => setCurrentPrice(json));

        fetch(backUrl + location.search.substring(4) + "/tags")
            .then(response => response.json())
            .then(json => displayTags(json));

        fetch(backUrl + location.search.substring(4) + "/recommendations")
            .then(response => response.json())
            .then(json => setRecommendations(json));
            
    }

    function fetchAverage() {
        fetch(evalUrl + "average/" + location.search.substring(4))
            .then(response => response.text())
            .then(text => setAverage(parseFloat(text)))
    }

    function fetchEvalNumber() {
        fetch(evalUrl + "evaluationNumber/" + location.search.substring(4))
            .then(response => response.text())
            .then(text => setEvalNumber(parseFloat(text)))
    }

    function fetchEvals() {
        fetch(evalUrl + "byDecoration/" + location.search.substring(4) + "/all")
            .then(response => response.json())
            .then(json => setEvals(json));
    }

    function fetchBought() {
        if(props.owner && props.owner.id != 1) {
            fetch(evalUrl + "alreadyBought/" + location.search.substring(4) + "/" + props.owner.id)
                .then(response => response.text())
                .then(text => setHasBought(parseFloat(text)));
        }
    }

    function sendNewComment(theNewComment, theNewRating) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                comment: theNewComment,
                rating: theNewRating
            })
        };
        fetch(evalUrl + "newEvaluation/" + thisDecoration.id + "/" + props.owner.id, requestOptions)
        setTimeout(() => { navigate("/catalogue") }, 100)
    }

    function modifyDecoration(id, name, picture1, picture2, picture3, description, price, preparationDelay, weight, dimensions, tag1, tag2, tag3) {
        let tempTags = [tag1, tag2, tag3];
        let tempTags2 = [];
        for(let i=0;i<3;i++) {
            if(tempTags[i]) {
                tempTags2.push(tempTags[i]);
            }
        }

        let tempPics = [picture1, picture2, picture3];
        let tempPics2 = [];
        for(let i=0;i<3;i++) {
            if(tempPics[i]) {
                tempPics2.push(tempPics[i]);
            }
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                name: name,
                pictures: tempPics2, 
                description: description, 
                preparationDelay: preparationDelay,
                weight: weight,
                dimensions: dimensions,
                price: price,
                tags: tempTags2
            })
        };
        fetch(backUrl + "modify", requestOptions)
            .then(response => response.json())
            .then(() => window.location.href = '/catalogue')
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

    function displayTags(json) {
        let tempTags = ["", "", ""];
        let display = [];
        for(let i=0; i<json.length;i++) {
            tempTags[i] = json[i];
            display.push(
                <span class="badge my-badge rounded-pill bg-info mx-2">{json[i]}</span>
            );
        }
        setTags(tempTags);
        setTagDisplay(display);
    }

    return(
        <>
            <Helmet>
                <title>{thisDecoration.name + " - Mille-Arts"}</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Page de décoration" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <Decoration
                owner = {props.owner}
                decoration={thisDecoration} 
                currentPrice={currentPrice}
                tags={tags}
                tagDisplay={tagDisplay}
                basket={props.basket}
                setBasket={props.setBasket}
                modifyDecoration={modifyDecoration}
                pictures={pictures}
                favourites={props.favourites}
                setFavourites={props.setFavourites}
                removeFromFavourites = {removeFromFavourites}
                addToFavourites = {addToFavourites}
                average = {average}
                setAverage = {setAverage}
                evalNumber = {evalNumber}
                setEvalNumber = {setEvalNumber}
                isLightTheme = {props.isLightTheme}
                isChristmas = {props.isChristmas}
                setChristmas = {props.setChristmas}
                recommendations = {recommendations}
                averages = {props.averages}
                evals = {evals}
                hasBought = {hasBought}
                sendNewComment={sendNewComment}
            />
        </>
    );
}