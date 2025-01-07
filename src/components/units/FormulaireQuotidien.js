import React from "react"
import { Link } from "react-router-dom"
import * as cst from "../constants"
import AdaptableInputs from "./AdaptableInputs"
import PoidsInput from "./PoidsInput"

/*
 * Props :
 *   - selectedDay
 * 
 */ 
export default function FormulaireQuotidien(props) {

    return(
        <div class="align-self-start">
            <h3 class="card-header my-header my-2">
                <label for="floatingInput" class="white-text">{cst.displayDate(props.selectedDay)}</label>
            </h3>
            <div class="card-body d-flex flex-column">
                <PoidsInput
                    domain ={props.domain}
                    selectedDay ={props.selectedDay}
                />
                <AdaptableInputs 
                    label="test" 
                    unit="mots" 
                    options={cst.mois} 
                    onChange={inputValue => console.log(inputValue)}
                    onChangeInput={event => console.log(event.target.value)}
                />
                <div class="m-2 d-flex justify-content-end">
                    <Link to="/catalogue" type="button" class="btn btn-warning">Annuler</Link>
                    <Link
                        type="button" 
                        class="btn btn-success"
                    >
                            Valider
                    </Link>
                </div>
            </div>
        </div>
    )
}