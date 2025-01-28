import React, { useState, useEffect } from "react"
import AloneInput from "../general units/AloneInput"

import * as cst from "../../constants"

/*
 * Props :
 *  - domain
 *  - selectedDay
 */
export default function PoidsInput(props) {

    const backUrl = props.domain + "/weight/"
    const [inputValue, setInputValue] = useState("")

    useEffect(() => refreshInputValue(), [])
    useEffect(() => refreshInputValue(), [props.selectedDay])

    function setInputValueIfNotNull(json) {
        if(json[0]) {
            setInputValue(json[0].weight)
        } else {
            setInputValue("")
        }
        props.setHasChanged(hasChanged => !hasChanged)
    }

    function refreshInputValue() {
        fetch(backUrl + "byDay/" + cst.paramDMY(props))
            .then(response => response.json())
            .then(json => setInputValueIfNotNull(json))
    }

    function formatGrams(grams) {
        if(grams.length == 1) {
            return grams + "00"
        }
        if(grams.length == 2) {
            return grams + "0"
        }
        if(grams.length > 3) {
            return grams.substring(0, 3)
        }
        return grams
    }
    
    function sendPoids(inputValue) {
        var kg = inputValue.split(",")[0]
        var g = inputValue.split(",")[1] ? formatGrams(inputValue.split(",")[1]) : 0
        var url = kg + '/' + g + '/' + cst.paramDMY(props)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "addWeight/" + url, requestOptions)
            .then(() => refreshInputValue())
    }
    
    return(
        <AloneInput 
            label="Poids"
            unit="kg"
            inputValue={inputValue}
            setInputValue={setInputValue}
            click={sendPoids}
        />
    )
}