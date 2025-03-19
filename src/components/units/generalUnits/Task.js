import React from "react";
import { useNavigate } from "react-router-dom";

import * as cst from "../../constants"

/*
 * Props :
 *  - task
 *  - domain
 */
export default function Task(props) {

    let navigate = useNavigate()

    const backUrl = props.domain + "/todo/"

    function done() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "done/" + props.task.id, requestOptions)
            .then(setTimeout(function(){navigate(0)},1000))
    }

    function undo() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "undo/" + props.task.id, requestOptions)
            .then(setTimeout(function(){navigate(0)},1000))
    }

    function suppress() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "delete/" + props.task.id, requestOptions)
            .then(setTimeout(function(){navigate(0)},1000))
    }

    function displayTopButtons() {
        if(props.task.done) {
            return(
                <>
                    <button type="button" class="transparent-button hover-orange" onClick={() => undo()}><i class="fa-solid fa-rotate-left"></i></button>
                    <button type="button" class="transparent-button hover-red" onClick={() => suppress()}><i class="fa-solid fa-xmark"></i></button>
                </>
            )
        }
        return(
            <>
                <button type="button" class="transparent-button hover-green" onClick={() => done()}><i class="fa-solid fa-check"></i></button>
                <button type="button" class="transparent-button hover-red" onClick={() => suppress()}><i class="fa-solid fa-xmark"></i></button>
            </>
        )
    }

    function displayIcon() {
        let dateString = props.task.deadline
        let date = new Date(dateString.substring(0,4), dateString.substring(5,7)-1, dateString.substring(8,10))
        date.setHours(0, 0, 0, 0)
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        if(date-today == 0) {
            return(<i class="fa-solid fa-arrow-right green me-2"></i>)
        }
        if(date > today) {
            return(<i class="fa-solid fa-bookmark blue me-2"></i>)
        }
        return(<i class="fa-solid fa-triangle-exclamation red me-2"></i>)
    }

    return(
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <div class="me-auto">{displayIcon()} {cst.displayDateWithYesterdayTomorrow(props.task.deadline)}</div>
                {displayTopButtons()}
            </div>
            <div class="toast-body my-toast">
                <strong>{props.task.name}</strong>
            </div>
        </div>
    )
}