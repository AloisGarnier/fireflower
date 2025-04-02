import React from "react";

import * as cst from "../../constants"

/*
 * Props :
 *  - task
 *  - domain
 *  - trigger
 */
export default function Task(props) {

    const backUrl = props.domain + "/todo/"

    function refresh() {
        setTimeout(function(){props.trigger(bool => !bool)},1000)
    }

    function done() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "done/" + props.task.id, requestOptions)
            .then(() => refresh())
    }

    function undo() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "undo/" + props.task.id, requestOptions)
            .then(() => refresh())
    }

    function suppress() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "delete/" + props.task.id, requestOptions)
            .then(() => refresh())
    }

    function displayTopButtons() {
        if(props.task.done) {
            return(
                <>
                    <button type="button" class="transparent-button orange" onClick={() => undo()}><i class="fa-duotone fa-solid fa-arrow-rotate-left"></i></button>
                    <button type="button" class="transparent-button red" onClick={() => suppress()}><i class="fa-duotone fa-solid fa-trash-can"></i></button>
                </>
            )
        }
        return(
            <>
                <button type="button" class="transparent-button green" onClick={() => done()}><i class="fa-duotone fa-solid fa-thumbs-up"></i></button>
                <button type="button" class="transparent-button red" onClick={() => suppress()}><i class="fa-duotone fa-solid fa-trash-can"></i></button>
            </>
        )
    }

    function displayIcon() {
        let dateString = props.task.deadline
        let date = new Date(dateString.substring(0,4), dateString.substring(5,7)-1, dateString.substring(8,10))
        date.setHours(0, 0, 0, 0)
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        if(props.task.type == "SPORT") {
            return(<i class="fa-duotone fa-solid fa-dumbbell grey me-2"></i>)
        }
        if(props.task.type == "BIRTHDAY") {
            return(<i class="fa-duotone fa-solid fa-cake-candles yellow"></i>)
        }

        if(props.task.done) {
            return(<i class="fa-solid fa-circle-check green me-2"></i>)
        } else {
            if(date-today == 0) {
                return(<i class="fa-solid fa-arrow-right orange me-2"></i>)
            }
            if(date > today) {
                return(<i class="fa-solid fa-bookmark blue me-2"></i>)
            }
            return(<i class="fa-solid fa-triangle-exclamation red me-2"></i>)
        }
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