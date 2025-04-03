import React from "react"

import Tabs from "../units/generalUnits/Tabs"
import RomanRecap from "./tabs/RomanRecap"
import AlimentRecap from "./tabs/AlimentRecap"
import SportRecap from "./tabs/SportRecap"
import AnnivRecap from "./tabs/AnnivRecap"

export default function Options(props) {

    function getTabName() {
        return ["Romans", "Aliments", "Sport", "Anniversaires"]
    }

    function getTabIcon() {
        let display = []
        display.push(<i class="fa-duotone fa-solid fa-typewriter"></i>)
        display.push(<i class="fa-duotone fa-solid fa-drumstick-bite"></i>)
        display.push(<i class="fa-duotone fa-solid fa-dumbbell"></i>)
        display.push(<i class="fa-duotone fa-solid fa-cake-candles"></i>)
        return display
    }

    function getTabContent() {
        let display = []
        display.push(<RomanRecap domain={props.domain}/>)
        display.push(<AlimentRecap domain={props.domain}/>)
        display.push(<SportRecap domain={props.domain}/>)
        display.push(<AnnivRecap domain={props.domain}/>)
        return display
    }
    
    return(
        <Tabs 
            domain={props.domain}
            tabName={getTabName()}
            tabIcon={getTabIcon()}
            tabContent={getTabContent()}
        />
    )
}