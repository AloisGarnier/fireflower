import React, { useState } from "react"
import CalendrierWidget from "../units/CalendrierWidget"
import FormulaireQuotidien from "../units/FormulaireQuotidien";

/*
 * Props :
 *   
 */ 
export default function Calendrier(props) {

    const [selectedDay, setSelectedDay] = useState(new Date())

    return(
        <>
            <CalendrierWidget 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay}
            />
            <FormulaireQuotidien 
                selectedDay={selectedDay}
            />
        </> 
    );
}