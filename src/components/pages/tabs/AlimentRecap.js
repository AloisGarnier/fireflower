import React, { useState, useEffect } from "react"

import TableRecap from "../../units/generalUnits/TableRecap"
import SaveButton from "../../units/generalUnits/SaveButton"
import DeleteButton from "../../units/generalUnits/DeleteButton"


export default function AlimentRecap(props) {

    const [aliments, setAliments] = useState([])
    const [name, setName] = useState("")
    const [cal, setCal] = useState(0)
    const [unit, setUnit] = useState("")
    const [hasChanged, setHasChanged] = useState(false)

    const foodUrl = props.domain + "/food/"

    useEffect(() => fetchAliments(), [])
    useEffect(() => fetchAliments(), [hasChanged])

    function refresh() {
        setTimeout(function(){setHasChanged(bool => !bool)},1000)
    }

    function fetchAliments() {
        fetch(foodUrl + "aliments")
            .then(response => response.json())
            .then(json => setAliments(json))
    }

    function addItem() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        var endUrl = "addAliment/" + name + "/" + cal + "/" + unit
        fetch(foodUrl + endUrl, requestOptions)
            .then(() => refresh())
    }

    function deleteAliment(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(foodUrl + "deleteAliment/" + id, requestOptions)
            .then(() => refresh())
    }

    function foodTable() {
        let foodData = []
        for(let i=0; i<aliments.length; i++) {
            foodData.push([aliments[i].name, 
                           aliments[i].calories, 
                           aliments[i].unit, 
                           <DeleteButton deleteFunction={() => deleteAliment(aliments[i].id)} />])
        }
        foodData.push(            
            [<input type="text" class="form-control" placeholder="Nom" value={name} onChange={event => setName(event.target.value)}/>,
            <input type="text" class="form-control" placeholder="Calories" value={cal} onChange={event => setCal(event.target.value)}/>,
            <input type="text" class="form-control" placeholder="Unité" value={unit} onChange={event => setUnit(event.target.value)}/>,
            <SaveButton saveFunction={addItem}/>]
        )
        return foodData
    }

    return(
        <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
            <TableRecap 
                titreColonnes={["Nom", "Calories/unité", "Unité", ""]}
                donnees={foodTable()}
            />
        </div>
    )
}

