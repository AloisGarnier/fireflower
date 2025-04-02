import React from "react"

import Tabs from "../units/generalUnits/Tabs"
import Poids from "./tabs/Poids"
import Ecriture from "./tabs/Ecriture"
import Calories from "./tabs/Calories"

export default function Stats(props) {

    function getTabName() {
        let display = []
        display.push(
            <div class="d-flex flex-row justify-content-around">
                <i class="fa-duotone fa-solid fa-typewriter"></i>Romans<i class="fa-duotone fa-solid fa-typewriter"></i>
            </div>
        )
        display.push(
            <div class="d-flex flex-row justify-content-around">
                <i class="fa-duotone fa-solid fa-weight-scale"></i>Poids<i class="fa-duotone fa-solid fa-weight-scale"></i>
            </div>
        )
        display.push(
            <div class="d-flex flex-row justify-content-around">
                <i class="fa-duotone fa-solid fa-salad"></i>Calories<i class="fa-duotone fa-solid fa-salad"></i>
            </div>
        )
        return display
    }

    function getTabContent() {
        let display = []
        display.push(<Ecriture domain={props.domain}/>)
        display.push(<Poids domain={props.domain}/>)
        display.push(<Calories domain={props.domain}/>)
        return display
    }
    
    return(
        <Tabs 
        domain={props.domain}
        tabName={getTabName()}
        tabContent={getTabContent()}/>
    )
}