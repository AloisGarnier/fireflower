import React, { useState, useEffect } from "react"
import Task from "../units/specific/Task"
import NouvelleTache from "../units/specific/NouvelleTache"

/*
 * Props :
 *   - domain
 */ 
export default function Todolist(props) {

    const [planned, setPlanned] = useState([])
    const [todo, setTodo] = useState([])
    const [done, setDone] = useState([])
    const [hasChanged, setHasChanged] = useState(false)

    const backUrl = props.domain + "/todo/"

    useEffect(() => fetchTasks(), [])
    useEffect(() => fetchTasks(), [hasChanged])

    function fetchTasks() {
        fetch(backUrl + "planned")
            .then(response => response.json())
            .then(json => setPlanned(json))
        fetch(backUrl + "todo")
            .then(response => response.json())
            .then(json => setTodo(json))
        fetch(backUrl + "doneTasks")
            .then(response => response.json())
            .then(json => setDone(json))
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

    function displayTodo() {
        var plannedDisplay = []
        for(var i=0; i<todo.length; i++) {
            plannedDisplay.push(
                <Task task={todo[i]} domain={props.domain} trigger={setHasChanged}/>
            )
        }
        return plannedDisplay
    }

    function displayDone() {
        var plannedDisplay = []
        for(var i=0; i<done.length; i++) {
            plannedDisplay.push(
                <Task task={done[i]} domain={props.domain} trigger={setHasChanged}/>
            )
        }
        return plannedDisplay
    }

    return(
        <div class="d-flex flex-wrap h-100 w-100 justify-content-center">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column align-content-center m-5">
                    <h2 class="align-self-center white-text mb-5">Prévu</h2>
                    {displayPlanned()}
                </div>
                <div class="d-flex flex-column align-content-center m-5">
                    <h2 class="align-self-center white-text mb-5">À faire</h2>
                    {displayTodo()}
                </div>
                <div class="d-flex flex-column align-content-center m-5">
                    <h2 class="align-self-center white-text mb-5">Fait</h2>
                    {displayDone()}
                </div>
            </div>
            <div class="m-5" >
                <NouvelleTache domain={props.domain} trigger={setHasChanged}/>
            </div>
        </div>

    )
}