import React, { useState, useEffect } from "react"
import AdaptableInputs from "../general units/AdaptableInputs"

import * as cst from "../../constants"

/*
 * Props :
 *  - domain
 *  - selectedDay
 *  - mealId
 */
export default function RepasInput(props) {

    const backUrl = props.domain + "/food/"

    const [allAliments, setAllAliments] = useState([])

    useEffect(() => fetchAliment(), [])

    function processName(data) {
        return data.name + " (" + data.calories + " kcal/" + data.unit.toLowerCase() + ")"
    }

    function processAliments(json) {
        var newAliment = []
        for(var i=0; i<json.length; i++) {
            newAliment.push({value: json[i].id, label: processName(json[i])})
        }
        setAllAliments(newAliment)
    }

    function fetchAliment() {
        fetch(backUrl + "aliments")
            .then(response => response.json())
            .then(json => processAliments(json))
    }

    function sendRepas(choices, values) {
        for(var i=0; i<choices.length; i++) {
            var url = props.mealId + "/" + choices[i] + "/" + values[i] + "/" + cst.paramDMY(props)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }
            fetch(backUrl + "addDish/" + url, requestOptions)
                .then(response => props.setHasChanged(hasChanged => !hasChanged))
        }
    }

    function displayRepas() {
        switch(props.mealId) {
            case 1:
                return "Petit-déjeuner"
            case 2:
                return "Déjeuner"
            case 3:
                return "Dîner"
        }
    }
    
    return(
        <AdaptableInputs 
            label={displayRepas()}
            options={allAliments}
            click={sendRepas}
        />
    )
}