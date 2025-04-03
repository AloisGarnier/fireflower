import React, { useState, useEffect } from "react"

import Task from "../specific/Task"

/*
 * Props :
 *   - domain
 */ 
export default function TachesCalendrier(props) {

    const [todo, setTodo] = useState([])
    const [planned, setPlanned] = useState([])
    const [hasChanged, setHasChanged] = useState(false)

    useEffect(() => fetchTasks(), [])
    useEffect(() => fetchPlanned(), [])
    useEffect(() => fetchTasks(), [hasChanged])
    useEffect(() => fetchPlanned(), [hasChanged])
    useEffect(() => props.setHasChanged(bool => !bool), [hasChanged])
    
    const backUrl = props.domain + "/todo/"

    function fetchTasks() {
        fetch(backUrl + "todo")
            .then(response => response.json())
            .then(json => setTodo(json))
    }
    function fetchPlanned() {
        fetch(backUrl + "planned")
            .then(response => response.json())
            .then(json => setPlanned(json))
    }

    function displayTodo() {
        var todoDisplay = []
        for(var i=0; i<todo.length; i++) {
            todoDisplay.push(
                <Task task={todo[i]} domain={props.domain} trigger={setHasChanged}/>
            )
        }
        return todoDisplay
    }

    function displayPlanned() {
        var plannedDisplay = []
        for(var i=0; i<planned.length; i++) {
            plannedDisplay.push(
                <Task task={planned[i]} domain={props.domain} trigger={setHasChanged}/>
            )
        }
        return plannedDisplay
    }

    return(
        <div class="d-flex flex-column align-content-center">
            <h2 class="align-self-center white-text m-5">À faire</h2>
            <div class="mb-5">
                {displayTodo()}
            </div>
            {displayPlanned()}
        </div>
    )
}