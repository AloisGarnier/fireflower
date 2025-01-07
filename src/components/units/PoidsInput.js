import React, { useState, useEffect } from "react"
import AloneInput from "./AloneInput"

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
    }

    function refreshInputValue() {
        var d = props.selectedDay.getDate()
        var m = props.selectedDay.getMonth() + 1
        var y = props.selectedDay.getFullYear()
        var param = d + "/" + m + "/" + y
        fetch(backUrl + "byDay/" + param)
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
        var day = props.selectedDay.getDate()
        var month = props.selectedDay.getMonth() + 1
        var year = props.selectedDay.getFullYear()
        var url = kg + '/' + g + '/' + day + '/' + month + '/' + year
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