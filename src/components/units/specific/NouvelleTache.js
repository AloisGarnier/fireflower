import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import CalendrierWidget from "../calendrier/CalendrierWidget"

import * as cst from "../../constants"


/*
 * Props :
 *  - domain
 */
export default function NouvelleTache(props) {

    const [name, setName] = useState("")
    const [deadline, setDeadLine] = useState(new Date())

    const backUrl = props.domain + "/todo/"

    let navigate = useNavigate()

    function sendNewTask() {
        var url = cst.paramDMYDate(deadline) + "/" + name
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "newTask/" + url, requestOptions)
            .then(setTimeout(function(){navigate(0)},1000))
    }
    
    return(
        <div class="d-flex flex-column align-content-center">
            <h2 class="align-self-center white-text mb-5">Nouvelle tâche</h2>
            <div class="d-flex flex-column justify-content-center">
                <input type="label" class="form-control" placeholder="Nom" value={name} onChange={event => setName(event.target.value)}/>
                <CalendrierWidget selectedDay={deadline} setSelectedDay={setDeadLine}/>
                <button class="btn btn-success" onClick={() => sendNewTask()}>Valider</button>
            </div>
        </div>
    )
}