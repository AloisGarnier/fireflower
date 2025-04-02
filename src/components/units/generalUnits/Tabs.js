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

    function displayOptions() {
        switch(props.tabName.length) {
            case 1:
                return(
                    <>
                        <input type="radio" class="btn-check" id="btn0" checked={display == 0} onClick={() => setDisplay(0)}/>
                        <label class="btn btn-outline-light" for="btn0">{props.tabName[0]}</label>
                    </>
                )
            case 2:
                return(
                    <>
                        <input type="radio" class="btn-check" id="btn0" checked={display == 0} onClick={() => setDisplay(0)}/>
                        <label class="btn btn-outline-light" for="btn0">{props.tabName[0]}</label>
                        <input type="radio" class="btn-check" id="btn1" checked={display == 1} onClick={() => setDisplay(1)}/>
                        <label class="btn btn-outline-light" for="btn1">{props.tabName[1]}</label>
                    </>
                )
            case 3:
                return(
                    <>
                        <input type="radio" class="btn-check" id="btn0" checked={display == 0} onClick={() => setDisplay(0)}/>
                        <label class="btn btn-outline-light" for="btn0">{props.tabName[0]}</label>
                        <input type="radio" class="btn-check" id="btn1" checked={display == 1} onClick={() => setDisplay(1)}/>
                        <label class="btn btn-outline-light" for="btn1">{props.tabName[1]}</label>
                        <input type="radio" class="btn-check" id="btn2" checked={display == 2} onClick={() => setDisplay(2)}/>
                        <label class="btn btn-outline-light" for="btn2">{props.tabName[2]}</label>
                    </>
                )
            case 4:
                return(
                    <>
                        <input type="radio" class="btn-check" id="btn0" checked={display == 0} onClick={() => setDisplay(0)}/>
                        <label class="btn btn-outline-light" for="btn0">{props.tabName[0]}</label>
                        <input type="radio" class="btn-check" id="btn1" checked={display == 1} onClick={() => setDisplay(1)}/>
                        <label class="btn btn-outline-light" for="btn1">{props.tabName[1]}</label>
                        <input type="radio" class="btn-check" id="btn2" checked={display == 2} onClick={() => setDisplay(2)}/>
                        <label class="btn btn-outline-light" for="btn2">{props.tabName[2]}</label>
                        <input type="radio" class="btn-check" id="btn3" checked={display == 3} onClick={() => setDisplay(3)}/>
                        <label class="btn btn-outline-light" for="btn3">{props.tabName[3]}</label>
                    </>
                )
            case 5:
                return(
                    <>
                        <input type="radio" class="btn-check" id="btn0" checked={display == 0} onClick={() => setDisplay(0)}/>
                        <label class="btn btn-outline-light" for="btn0">{props.tabName[0]}</label>
                        <input type="radio" class="btn-check" id="btn1" checked={display == 1} onClick={() => setDisplay(1)}/>
                        <label class="btn btn-outline-light" for="btn1">{props.tabName[1]}</label>
                        <input type="radio" class="btn-check" id="btn2" checked={display == 2} onClick={() => setDisplay(2)}/>
                        <label class="btn btn-outline-light" for="btn2">{props.tabName[2]}</label>
                        <input type="radio" class="btn-check" id="btn3" checked={display == 3} onClick={() => setDisplay(3)}/>
                        <label class="btn btn-outline-light" for="btn3">{props.tabName[3]}</label>
                        <input type="radio" class="btn-check" id="btn4" checked={display == 4} onClick={() => setDisplay(4)}/>
                        <label class="btn btn-outline-light" for="btn4">{props.tabName[4]}</label>
                    </>
                )
            default:
                break
        }
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