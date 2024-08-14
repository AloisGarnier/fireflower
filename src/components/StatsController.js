import React, {useState, useEffect} from "react";

import Stats from "./Stats";

export default function StatsController(props) {

    const viewUrl = props.domain + "/view/";

    const [recap, setRecap] = useState([]);

    useEffect(() => { fetchRecap(); }, []);

    function fetchRecap() {
        fetch(viewUrl + "recap")
            .then(response => response.json())
            .then(json => setRecap(json))
    }

    function sum(array) {
        var sum = 0;
        for(var i=0; i<array.length; i++) {
            sum += parseInt(array[i])
        }
        return sum
    }

    function average(array) {
        return parseFloat(sum(array))/array.length
    }

    return(
        <Stats
            recap={recap}
            fetchRecap={fetchRecap}
            owner = {props.owner}
            isLightTheme = {props.isLightTheme}
            isChristmas = {props.isChristmas}
            setChristmas = {props.setChristmas}
        />
    );

}