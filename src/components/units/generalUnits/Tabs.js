import React, { useState } from "react"

/*
 * Props :
 *  - domain
 *  - tabName (array)
 *  - tabContent (array)
 */
export default function Tabs(props) {

    const [display, setDisplay] = useState(0)

    function selectedDisplay() {
        return(props.tabContent[display])
    }

    function displayLabel(i) {
        if(window.innerWidth >= 600) {
            return(
                <div class="d-flex flex-row justify-content-around">
                    {props.tabIcon[i]}{props.tabName[i]}{props.tabIcon[i]}
                </div>
            )
        }
        return(props.tabIcon[i])
    }

    function displayOptions() {
        let displayTabs = []
        for(let i=0; i<props.tabName.length; i++) {
            displayTabs.push(
                <>
                    <input type="radio" class="btn-check" id={"btn" + i} checked={display == i} onClick={() => setDisplay(i)}/>
                    <label class="btn btn-outline-light" for={"btn" + i}>{displayLabel(i)}</label>
                </>
            )
        }
        return displayTabs
    }

    return(
        <div class="d-flex flex-column align-items-center h-100 w-100">
            <div class="btn-group m-5 w-75" role="group" aria-label="Basic radio toggle button group">
                {displayOptions()}
            </div>
            <div class="d-flex flex-wrap justify-content-center mt-5">
                {selectedDisplay()}
            </div>
        </div>
    )
}