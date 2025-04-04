import React, { useState, useEffect } from "react"
import Select from 'react-select'

import * as cst from "../../constants"
import DeleteButton from "../generalUnits/DeleteButton"
import TableRecap from "../generalUnits/TableRecap"
import SaveButton from "../generalUnits/SaveButton"

/*
 * Props :
 *   - domain
 *   - day : number from 0 (Monday) to 6 (Sunday)
 */ 
export default function DailyProgram(props) {

    const [program, setProgram] = useState([])
    const [hasChanged, setHasChanged] = useState(false)

    const [exTypes, setExTypes] = useState([])
    const [exercise, setExercise] = useState("") 
    const [minutes, setMinutes] = useState(0)
    
    const sportUrl = props.domain + "/sport/"

    useEffect(() => fetchTypes(), [])
    useEffect(() => fetchTypes(), [props.globalTrigger])
    useEffect(() => fetchProgram(), [])
    useEffect(() => fetchProgram(), [hasChanged])

    function refresh() {
        setTimeout(function(){setHasChanged(bool => !bool)},1000)
    }

    function fetchProgram() {
        fetch(sportUrl + "program/" + (props.day+1))
            .then(response => response.json())
            .then(json => setProgram(json))
    }

    function processTypes(json) {
        let tempLabels = []
        for(let i=0; i<json.length; i++) {
            tempLabels.push({value: json[i].id, label: json[i].name, unit: json[i].unit.toLowerCase() + "(s)"})
        }
        setExTypes(tempLabels)
    }

    function fetchTypes() {
        fetch(sportUrl + "exerciseTypes")
            .then(response => response.json())
            .then(json => processTypes(json))
    }

    const onExChange = (inputValue) => {
        setExercise(inputValue)
    }

    function saveProgram(exercise, minutes) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        var endUrl = "addProgramExercise/" + (props.day+1) + "/" + (exercise.value ?? 1) + "/" + minutes 
        fetch(sportUrl + endUrl, requestOptions)
            .then(() => refresh())
    }

    function deleteProgram(ex) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(sportUrl + "deleteProgramExercise/" + ex.id, requestOptions)
            .then(() => refresh())
    }

    function dailyTable() {
        let dailyData = []
        for(let e=0; e<program?.exercises?.length; e++) {
            let ex = program.exercises[e]
            dailyData.push([ex.exercise?.name, 
                            ex.minutes + " " + cst.unitFormat(ex.minutes, ex.exercise?.unit ?? "unité(s)"), 
                            <DeleteButton deleteFunction={() => deleteProgram(ex)} />])
        }
        dailyData.push(            
            [
            <Select className="react-select-container" options={exTypes} defaultValue={exTypes[0]} onChange={onExChange}/>,
            <div class="d-flex flex-row align-items-center">
                <input type="text" class="form-control small-input me-2" value={minutes} onChange={event => setMinutes(event.target.value)}/>
                <label>{exercise.unit ?? "unité(s)"}</label>
            </div>,        
            <SaveButton saveFunction={() => saveProgram(exercise, minutes)}/>
            ]
        )
        return dailyData
    }

    return(
        <div class="me-2">
            <TableRecap 
                titreColonnes={[cst.dayOfWeekSundaySeven[props.day+1], "", (program.calories ?? 0) + " kcal"]}
                donnees={dailyTable()}
                headStyle="table-info"
            />
        </div>
    )
}