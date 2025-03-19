import React from "react"

import * as cst from "../../constants"

import PoidsInput from "../specific/PoidsInput"
import EcritureInput from "../specific/EcritureInput"
import SportInput from "../specific/SportInput"
import RepasInput from "../specific/RepasInput"

/*
 * Props :
 *   - selectedDay
 * 
 */ 
export default function FormulaireQuotidien(props) {

    function troisRepas() {
        var repasDisplay = []
        for(var i=1; i<=3; i++) {
            repasDisplay.push(
                <RepasInput
                    domain ={props.domain}
                    selectedDay ={props.selectedDay}
                    mealId={i}
                    setHasChanged={props.setHasChanged}
                />
            )
        }
        return repasDisplay
    }

    return(
        <div class="d-flex flex-column align-self-start width-form">
            <h2 class="card-header my-header my-2 align-self-center">
                <label for="floatingInput" class="white-text m-3">{cst.displayDate(props.selectedDay)}</label>
            </h2>
            <div class="card-body d-flex flex-column">
                <EcritureInput 
                    domain ={props.domain}
                    selectedDay ={props.selectedDay}
                    setHasChanged={props.setHasChanged}
                />
                <PoidsInput
                    domain ={props.domain}
                    selectedDay ={props.selectedDay}
                    setHasChanged={props.setHasChanged}
                />
                <SportInput
                    domain ={props.domain}
                    selectedDay ={props.selectedDay}
                    setHasChanged={props.setHasChanged}
                />
                {troisRepas()}
            </div>
        </div>
    )
}