import React, { useState, useEffect } from "react"
import AdaptableInputs from "../generalUnits/AdaptableInputs"

import * as cst from "../../constants"

/*
 * Props :
 *  - domain
 *  - selectedDay
 */
export default function EcritureInput(props) {

    const backUrl = props.domain + "/writing/"

    const [allBooks, setAllBooks] = useState([])

    useEffect(() => fetchBooks(), [])
    //useEffect(() => fetchBooks(), [props.selectedDay])

    function processBooks(json) {
        var newBooks = []
        for(var i=0; i<json.length; i++) {
            newBooks.push({value: json[i].id, label: json[i].title})
        }
        setAllBooks(newBooks)
    }

    function fetchBooks() {
        fetch(backUrl + "books")
            .then(response => response.json())
            .then(json => processBooks(json))
    }

    function sendWriting(choices, values) {
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
            label="Ecriture"
            unit="mots"
            options={allBooks}
            click={sendWriting}
        />
    )
}