import React, { useState } from "react"

/*
 * Props :
 *   - label
 *   - 
 */ 
export default function AdaptableInputs(props) {

    const [nbInputs, setNbInputs] = useState(1)

    function plusInput() {
        setNbInputs(nbInputs++)
    }

    function moinsInput() {
        if(nbInputs > 1) {
            setNbInputs(nbInputs--)
        }
    }

    return(
        <div>
            <div class="d-flex flex-row align-items-center justify-items-center mb-2">
                <div class="white-text me-2">
                    {props.label}
                </div>
                <div class="btn-group me-2" role="group">
                    <button class="badge rounded-pill bg-danger" onClick={() => moinsInput}>-</button>
                    <button class="badge rounded-pill bg-success" onClick={() => plusInput}>+</button>
                </div>
            </div>
        </div>
    )

}