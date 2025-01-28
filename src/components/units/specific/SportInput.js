import React, { useState, useEffect } from "react"
import AdaptableInputs from "../general units/AdaptableInputs"

import * as cst from "../../constants"

/*
 * Props :
 *  - domain
 *  - selectedDay
 */
export default function SportInput(props) {

    const backUrl = props.domain + "/sport/"

    const [allEx, setAllEx] = useState([])

    useEffect(() => fetchEx(), [])

    function processName(data) {
        return data.name + " (" + data.calories + " kcal/" + data.unit.toLowerCase() + ")"
    }

    function processEx(json) {
        var newEx = []
        for(var i=0; i<json.length; i++) {
            newEx.push({value: json[i].id, label: processName(json[i])})
        }
        setAllEx(newEx)
    }

    function fetchEx() {
        fetch(backUrl + "exerciseTypes")
            .then(response => response.json())
            .then(json => processEx(json))
    }

    function sendSport(choices, values) {
        for(var i=0; i<choices.length; i++) {
            var url = choices[i] + "/" + values[i] + "/" + cst.paramDMY(props)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }
            fetch(backUrl + "addSession/" + url, requestOptions)
                .then(response => props.setHasChanged(hasChanged => !hasChanged))
        }
    }
    
    return(
        <AdaptableInputs 
            label="Sport"
            options={allEx}
            click={sendSport}
        />
    )
}