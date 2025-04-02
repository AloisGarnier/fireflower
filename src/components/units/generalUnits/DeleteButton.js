import React from "react";

/*
 * Props :
 *  - deleteFunction
 */
export default function DeleteButton(props) {

    return(
        <button 
            class="transparent-button red" 
            type="button" 
            onClick={props.deleteFunction}>
                <i class="fa-duotone fa-solid fa-trash-can"></i>
        </button>
    )
}