import React, { useState, useEffect } from "react"
import Select from 'react-select'

import * as cst from "../../constants"

import TableRecap from "../../units/generalUnits/TableRecap"
import DeleteButton from "../../units/generalUnits/DeleteButton"
import SaveButton from "../../units/generalUnits/SaveButton"

export default function AnnivRecap(props) {

    const [annivs, setAnnivs] = useState([])
    const [name, setName] = useState("")
    const [day, setDay] = useState(1)
    const [month, setMonth] = useState(0)
    const [hasChanged, setHasChanged] = useState(false)

    const bdayUrl = props.domain + "/birthday/"

    useEffect(() => fetchBday(), [hasChanged])
    useEffect(() => fetchBday(), [])

    function refresh() {
        setTimeout(function(){setHasChanged(bool => !bool)},1000)
    }

    function fetchBday() {
        fetch(bdayUrl + "all")
            .then(response => response.json())
            .then(json => setAnnivs(json))
    }

    function deleteAnniv(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(bdayUrl + "delete/" + id, requestOptions)
            .then(() => refresh())
    }

    function bdayTable() {
        let bdayData = []
        for(let i=0; i<annivs.length; i++) {
            bdayData.push([annivs[i].name, 
                           cst.displayDateDayMonth(annivs[i].day, annivs[i].month-1), 
                           <DeleteButton deleteFunction={() => deleteAnniv(annivs[i].id)} />])
        }
        bdayData.push(
            [
            <input type="text" class="form-control" placeholder="Nom" value={name} onChange={event => setName(event.target.value)}/>,
            <div class="d-flex flex-row">
                <input type="text" class="form-control small-input" placeholder="Jour" value={day} onChange={event => setDay(event.target.value)}/>
                <Select className="react-select-container" options={cst.mois} defaultValue={cst.mois[month]} onChange={onMonthChange}/>
            </div>,        
            <SaveButton saveFunction={addItem}/>
            ]
        )
        return bdayData
    }

    function addItem() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        var endUrl = "newBday/" + day + "/" + (month + 1) + "/" + name 
        fetch(bdayUrl + endUrl, requestOptions)
            .then(() => refresh())
    }

    const onMonthChange = (inputValue) => {setMonth(inputValue.value - 1)}

    return(
        <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
            <TableRecap 
                titreColonnes={["Nom", "Date", ""]}
                donnees={bdayTable()}
            />
        </div>
    )
}

