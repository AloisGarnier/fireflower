import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

/*
 * Props :
 *  - domain
 *  - item ("aliment" ou "exercice")
 */
export default function NouvelAlimentExercise(props) {

    const [name, setName] = useState("")
    const [cal, setCal] = useState(0)
    const [unit, setUnit] = useState("")

    let navigate = useNavigate();

    const backUrl = props.domain + (props.item == "aliment" ? "/food/addAliment/" : "/sport/addExercise/")

    function addItem() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        var endUrl = name + "/" + cal + "/" + unit
        fetch(backUrl + endUrl, requestOptions)
            .then(setTimeout(function(){navigate(0)},1000))
    }

    return(
        <div class="d-flex flex-row my-3">
            <input type="text" class="form-control" placeholder="Nom" value={name} onChange={event => setName(event.target.value)}/>
            <input type="text" class="form-control" placeholder="Calories" value={cal} onChange={event => setCal(event.target.value)}/>
            <input type="text" class="form-control" placeholder="Unité" value={unit} onChange={event => setUnit(event.target.value)}/>
            <button class="badge rounded-pill bg-info justify-self-end" onClick={() => addItem()}>Valider</button>
        </div>
    )

}