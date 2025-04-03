import React from "react"

import Tabs from "../units/generalUnits/Tabs"
import Poids from "./tabs/Poids"
import Ecriture from "./tabs/Ecriture"
import Calories from "./tabs/Calories"

export default function Stats(props) {

    function getTabName() {
        return ["Ecriture", "Poids", "Calories"]
    }

    function getTabIcon() {
        let display = []
        display.push(<i class="fa-duotone fa-solid fa-typewriter"></i>)
        display.push(<i class="fa-duotone fa-solid fa-weight-scale"></i>)
        display.push(<i class="fa-duotone fa-solid fa-salad"></i>)
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
        tabIcon={getTabIcon()}
        tabContent={getTabContent()}/>
    )
}