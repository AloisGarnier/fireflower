import React, { useState } from "react"
import CalendrierWidget from "../units/calendrier/CalendrierWidget"
import FormulaireQuotidien from "../units/calendrier/FormulaireQuotidien";
import RecapJour from "../units/calendrier/RecapJour";
import TachesCalendrier from "../units/calendrier/TachesCalendrier";

/*
 * Props :
 *   - domain
 */ 
export default function Calendrier(props) {

    const [selectedDay, setSelectedDay] = useState(new Date())
    const [hasChanged, setHasChanged] = useState(false)

    return(
        <div class="d-flex flex-wrap justify-content-around w-100 h-100">
            <div class="d-flex flex-column">
                <CalendrierWidget 
                    selectedDay={selectedDay} 
                    setSelectedDay={setSelectedDay}
                />
                <RecapJour 
                    selectedDay={selectedDay}
                    domain={props.domain}
                    hasChanged={hasChanged}
                />
            </div>
            <FormulaireQuotidien 
                selectedDay={selectedDay}
                domain={props.domain}
                setHasChanged={setHasChanged}
            />
            <TachesCalendrier domain={props.domain}/>
        </div> 
    );
}