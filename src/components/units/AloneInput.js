import React, { useState } from "react"

import * as cst from "../constants"

/*
 * Props :
 *   - label (titre du widget)
 *   - unit (unité de l'input, si besoin)
 *   - setInputValue (fonction pour récupérer la valeur du champ)
 */ 
export default function AloneInput(props) {

    return(
        <div class="card border-secondary mb-3">
            <div class="card-header btn-not-capitalized d-flex justify-content-between">
                {props.label}
            </div>
            <div class="card-body">
                <div class="input-group">
                    <input name="alone" type="label" class="form-control" value={props.inputValue} onChange={event => props.setInputValue(event.target.value)}/>
                    {cst.unite(props)}
                </div>
                <div class="input-group d-flex flex-row justify-content-end w-100 my-2">
                    <button class="badge rounded-pill bg-info justify-self-end" onClick={() => props.click(props.inputValue)}>Valider</button>
                </div>
            </div>
        </div>
    )
}