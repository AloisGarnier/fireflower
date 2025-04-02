import React from "react";

/*
 * Props :
 *  - saveFunction
 */
export default function SaveButton(props) {

    return(
        <button class="transparent-button blue ms-2" onClick={props.saveFunction}>
            <i class="fa-duotone fa-solid fa-floppy-disk large-icon"></i>
        </button>

    )
}