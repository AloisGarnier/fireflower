import React, { useState } from "react"
import CalendrierWidget from "../units/CalendrierWidget"
import FormulaireQuotidien from "../units/FormulaireQuotidien";

/*
 * Props :
 *   - domain
 */ 
export default function Calendrier(props) {

    const [selectedDay, setSelectedDay] = useState(new Date())

    return(
        <div class="d-flex flex-wrap justify-content-around w-100 h-100">
            <CalendrierWidget 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay}
            />
            <FormulaireQuotidien 
                selectedDay={selectedDay}
                domain={props.domain}
            />
        </div> 
    );
}