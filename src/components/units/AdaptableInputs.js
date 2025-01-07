import React, { useState } from "react"
import CreatableSelect from 'react-select'

import * as cst from "../constants"

/*
 * Props :
 *   - label (titre du widget)
 *   - unit (unité de l'input, si besoin)
 *   - options (options de l'élément sélectionnable)
 *   - onChange (fonction à appeler lorsque la liste déroulante est modifiée)
 *   - onChangeInput (fonction à appeler lorsque le texte est modifié)
 */ 
export default function AdaptableInputs(props) {

    const [nbInputs, setNbInputs] = useState(1)

    function plusInput() {
        setNbInputs(nbInputs + 1)
    }

    function moinsInput() {
        if(nbInputs > 1) {
            setNbInputs(nbInputs - 1)
        }
    }

    function displayLines() {
        var lines = []
        for(var i=0; i<nbInputs; i++) {
            lines.push(
                <div class="input-group">
                    <CreatableSelect options={props.options} defaultValue={props.options[0]} onChange={props.onChange}/>
                    <input name="ecriture" type="label" class="form-control" onChange={props.onChangeInput}/>
                    {cst.unite(props)}
                </div>   
            )
        }
        return lines
    }

    return(
        <div class="card border-secondary mb-3">
            <div class="card-header btn-not-capitalized d-flex justify-content-between">
                {props.label}
                <div class="btn-group me-2" role="group">
                    <button class="badge rounded-pill bg-danger" onClick={() => moinsInput()}>-</button>
                    <button class="badge rounded-pill bg-success" onClick={() => plusInput()}>+</button>
                </div>
            </div>
            <div class="card-body">
                {displayLines()}
            </div>
        </div>
    )

}