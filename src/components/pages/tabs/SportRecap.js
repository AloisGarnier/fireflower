import React, { useState, useEffect } from "react"

import TableRecap from "../../units/generalUnits/TableRecap"
import SportProgram from "../../units/specific/SportProgram"
import DeleteButton from "../../units/generalUnits/DeleteButton"
import SaveButton from "../../units/generalUnits/SaveButton"


export default function SportRecap(props) {

    const [exercises, setExercises] = useState([])
    const [name, setName] = useState("")
    const [cal, setCal] = useState(0)
    const [unit, setUnit] = useState("")
    const [hasChanged, setHasChanged] = useState(false)

    const sportUrl = props.domain + "/sport/"

    useEffect(() => fetchExercises(), [])
    useEffect(() => fetchExercises(), [hasChanged])

    function refresh() {
        setTimeout(function(){setHasChanged(bool => !bool)},1000)
    }

    function fetchExercises() {
        fetch(sportUrl + "exerciseTypes")
            .then(response => response.json())
            .then(json => setExercises(json))
    }

    function addItem() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        var endUrl = "addExercise/" + name + "/" + cal + "/" + unit
        fetch(sportUrl + endUrl, requestOptions)
            .then(() => refresh())
    }

    function deleteExercise(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(sportUrl + "deleteExercise/" + id, requestOptions)
            .then(() => refresh())
    }

    function sportTable() {
        let sportData = []
        for(let i=0; i<exercises.length; i++) {
            sportData.push([exercises[i].name, 
                            exercises[i].calories, 
                            exercises[i].unit, 
                            <DeleteButton deleteFunction={() => deleteExercise(exercises[i].id)} />])
        }
        sportData.push(            
            [<input type="text" class="form-control" placeholder="Nom" value={name} onChange={event => setName(event.target.value)}/>,
            <input type="text" class="form-control" placeholder="Calories" value={cal} onChange={event => setCal(event.target.value)}/>,
            <input type="text" class="form-control" placeholder="Unité" value={unit} onChange={event => setUnit(event.target.value)}/>,
            <SaveButton saveFunction={addItem}/>]
        )
        return sportData
    }

    return(
            <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
                <div class="small-table">
                    <TableRecap 
                        titreColonnes={["Nom", "Calories/unité", "Unité", ""]}
                        donnees={sportTable()}
                    />
                </div>
                <SportProgram domain={props.domain} exercises={exercises} globalTrigger={hasChanged}/>   
            </div> 
    )
}

