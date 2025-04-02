import React from "react"

import Tabs from "../units/generalUnits/Tabs"
import RomanRecap from "./tabs/RomanRecap"
import AlimentRecap from "./tabs/AlimentRecap"
import SportRecap from "./tabs/SportRecap"
import AnnivRecap from "./tabs/AnnivRecap"

export default function Options(props) {

    function getTabName() {
        let display = []
        display.push(
            <div class="d-flex flex-row justify-content-around">
                <i class="fa-duotone fa-solid fa-typewriter"></i>Romans<i class="fa-duotone fa-solid fa-typewriter"></i>
            </div>
        )
        display.push(
            <div class="d-flex flex-row justify-content-around">
                <i class="fa-duotone fa-solid fa-drumstick-bite"></i>Aliments<i class="fa-duotone fa-solid fa-drumstick-bite"></i>
            </div>
        )
        display.push(
            <div class="d-flex flex-row justify-content-around">
                <i class="fa-duotone fa-solid fa-dumbbell"></i>Sport<i class="fa-duotone fa-solid fa-dumbbell"></i>
            </div>
        )
        display.push(
            <div class="d-flex flex-row justify-content-around">
                <i class="fa-duotone fa-solid fa-cake-candles"></i>Anniversaires<i class="fa-duotone fa-solid fa-cake-candles"></i>
            </div>
        )
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
        tabContent={getTabContent()}/>
    )
}