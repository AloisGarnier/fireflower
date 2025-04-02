import React, { useState } from "react"
import CreatableSelect from 'react-select'

import * as cst from "../../constants"

/*
 * Props :
 *   - label (titre du widget)
 *   - unit (unité de l'input, si besoin)
 *   - options (options de l'élément sélectionnable)
 *   - click (the function to call on click button)
 */ 
export default function AdaptableInputs(props) {

    const [lines, setLines] = useState([])
    const [inputChoices, setInputChoices] = useState([])
    const [inputValues, setInputValues] = useState([])

    function displayUnit() {
        if(props.unit) {
            return(
                <span class="input-group-text justify-content-center">{props.unit ? props.unit : ""}</span>
            )
        }
    }

    function addLine() {
        var newLines = [...lines]
        var clonedNumber = Number(lines.length + "")
        newLines.push(
            <div key={clonedNumber} class="input-group">
                <CreatableSelect className="min-w-50" options={props.options} defaultValue={props.options[0]} onChange={value => modifyInputChoices(clonedNumber, value)}/>
                <input type="text" class="form-control" value={inputValues[clonedNumber]} onChange={event => modifyInputValues(clonedNumber, event.target.value)}/>
                {displayUnit()}
            </div>
        )
        setLines(newLines)
    }

    function plusInput() {
        setInputChoices([...inputChoices, 1])
        setInputValues([...inputValues, ""])
        addLine()
    }

    function moinsInput() {
        if(lines.length > 0) {
            setInputChoices(inputChoices.slice(0, lines.length-1))
            setInputValues(inputValues.slice(0, lines.length-1))
            setLines(lines.slice(0, lines.length-1))
        }
    }

    function modifyInputChoices(pos, newChoice) {
        cst.updateValue(setInputChoices, pos, newChoice.value)
    }

    function modifyInputValues(pos, newValue) {
        cst.updateValue(setInputValues, pos, newValue)
    }

    return(
        <div class="card border-secondary mb-3">
            <div class="card-header btn-not-capitalized d-flex justify-content-between">
                {props.label}
                <div class="btn-group me-2" role="group">
                    <button class="transparent-button red" onClick={() => moinsInput()}><i class="fa-duotone fa-solid fa-hexagon-minus norm-icon"></i></button>
                    <button class="transparent-button green" onClick={() => plusInput()}><i class="fa-duotone fa-solid fa-hexagon-plus norm-icon"></i></button>
                </div>
            </div>
            <div class="card-body">
                {lines}
                <div class="input-group d-flex flex-row justify-content-end w-100">
                    <button class="transparent-button blue" onClick={() => props.click(inputChoices, inputValues)}><i class="fa-duotone fa-solid fa-floppy-disk large-icon"></i></button>
                </div>
            </div>
        </div>
    )

}