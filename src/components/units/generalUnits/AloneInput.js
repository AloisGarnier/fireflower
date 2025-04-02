import React from "react"

import * as cst from "../../constants"

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
                    <button class="transparent-button blue ms-5" onClick={() => props.click(props.inputValue)}><i class="fa-duotone fa-solid fa-floppy-disk large-icon"></i></button>
                </div>
            </div>
        </div>
    )
}