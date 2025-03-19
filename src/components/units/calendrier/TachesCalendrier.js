import React, { useState, useEffect } from "react"

import * as cst from "../../constants"
import Task from "../generalUnits/Task"

/*
 * Props :
 *   - domain
 */ 
export default function TachesCalendrier(props) {

    const [todo, setTodo] = useState([])

    useEffect(() => fetchTasks(), [])
    
    const backUrl = props.domain + "/todo/"

    function fetchTasks() {
        fetch(backUrl + "todo")
            .then(response => response.json())
            .then(json => setTodo(json))
    }

    function displayTodo() {
        var plannedDisplay = []
        for(var i=0; i<todo.length; i++) {
            plannedDisplay.push(
                <Task task={todo[i]} domain={props.domain}/>
            )
        }
        return plannedDisplay
    }

    return(
        <div class="d-flex flex-column align-content-center">
            <h2 class="align-self-center white-text m-5">À faire aujourd'hui</h2>
            {displayTodo()}
        </div>
    )
}