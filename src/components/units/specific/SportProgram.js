import React from "react"

import DailyProgram from "./DailyProgram"

/*
 * Props :
 *   - domain
 *   - globalTrigger (to communicate with the table)
 */ 
export default function SportProgram(props) {

    function displayProgram(from, to) {
        var display = []
        for(let dayID=from; dayID<to; dayID++) {
            display.push(
                <DailyProgram 
                    domain={props.domain}
                    day={dayID}
                    globalTrigger={props.globalTrigger}
                />
            )
        }
        return display
    }

    function displaySevenDays() {
        if(window.innerWidth >= 600) {
            return(
                <>
                    <div class="d-flex flex-row">
                        {displayProgram(0, 2)}
                    </div>
                    <div class="d-flex flex-row">
                        {displayProgram(2, 5)}
                    </div>
                    <div class="d-flex flex-row">
                        {displayProgram(5, 7)}
                    </div>
                </>
            )
        }
        return(
            <div class="d-flex flex-column">
                {displayProgram(0, 7)}
            </div>
        )
    }

    return(
        <div class="d-flex flex-column align-items-center my-5">
            <h3 class="white-text">Programme hebdomadaire :</h3>
            {displaySevenDays()}
        </div>
    )
}