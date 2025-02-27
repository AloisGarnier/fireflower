import React, { useState, useEffect } from "react"
import Select from 'react-select'

import StackedAreaChart from "../units/general units/StackedAreaChart"

import * as cst from "../constants"

import TableRecap from "../units/general units/TableRecap"
import NouvelAlimentExercise from "../units/specific/NouvelAlimentExercise"


export default function Calories(props) {

    const [plage, setPlage] = useState(24)
    const [pas, setPas] = useState('j')
    const [series, setSeries] = useState("")

    const backUrl = props.domain + "/calories/"

    const [exercises, setExercises] = useState([])
    const [aliments, setAliments] = useState([])

    const sportUrl = props.domain + "/sport/"
    const foodUrl = props.domain + "/food/"

    useEffect(() => refreshValues(24, 'j'), [])
    useEffect(() => fetchExercises(), [])
    useEffect(() => fetchAliments(), [])

    function refreshValues(newPlage, newPas) {
        fetch(backUrl + "lastMonths/" + newPlage + "/" + newPas)
            .then(response => response.json())
            .then(json => setSeries(json))
    }

    function fetchExercises() {
        fetch(sportUrl + "exerciseTypes")
            .then(response => response.json())
            .then(json => setExercises(json))
    }

    function fetchAliments() {
        fetch(foodUrl + "aliments")
            .then(response => response.json())
            .then(json => setAliments(json))
    }

    function populateSeriesY() {
        var ingested = []
        var spent = []
        for(var i=0; i<series.length; i++) {
            if(series[i].ingestedCalories > 0) {
                ingested.push([series[i].date, cst.metabolisme*series[i].numberOfDays - series[i].ingestedCalories])
                spent.push([series[i].date, series[i].spentCalories])
            } 
        }
        return([ingested, spent])
    }

    const onPlageChange = (
        inputValue
      ) => {
        setPlage(inputValue.value)
        refreshValues(inputValue.value, pas)
      }

    const onPasChange = (
        inputValue
      ) => {
        setPas(inputValue.value)
        refreshValues(plage, inputValue.value)
      }

    function displayTopButtons() {
        var defaultPlage = cst.plageDeTemps[0]
        var defaultPas = cst.pasDeTemps[0]

        return(
            <div class="btn-group mb-5" role="group">
                <Select options={cst.plageDeTemps} defaultValue={defaultPlage} onChange={onPlageChange}/>
                <Select options={cst.pasDeTemps} defaultValue={defaultPas} onChange={onPasChange}/>
            </div>
        )
    }

    function displayBottomInfo() {
        var [ingested, spent] = populateSeriesY()
        if(ingested[ingested.length - 1]) {
            var total = 0
            var lastIndex = ingested.length - 1
            for(var i=0; i<ingested.length;i++) {
                total += ingested[i][1] + spent[i][1]
            }
            var diffTemps = (new Date(ingested[lastIndex][0]) - new Date(ingested[0][0]))/cst.milliSecondsInDay + 1
            var moyenne = cst.decimalRound(total/diffTemps, 0)
            var totalKg = cst.decimalRound(total/cst.calPerKg, 2)
            var moyenneKg = cst.decimalRound(moyenne/cst.calPerKg, 2)
            
            return(
                <div class="my-5 my-notes">
                    Sur cette période, j'ai brûlé {total} kcal, soit {moyenne} kcal/jour en moyenne.<br/>
                    Cela correspond à environ {totalKg} kg perdus, soit {moyenneKg} kg par jour.
                </div>
            )
        }
    }

    function sportTable() {
        var sportData = []
        for(var i=0; i<exercises.length; i++) {
            sportData.push([exercises[i].name, exercises[i].calories, exercises[i].unit])
        }
        return sportData
    }

    function foodTable() {
        var foodData = []
        for(var i=0; i<aliments.length; i++) {
            foodData.push([aliments[i].name, aliments[i].calories, aliments[i].unit])
        }
        return foodData
    }

    return(
        <>
            <div class="d-flex flex-column align-self-center align-items-center justify-items-center my-margin">
                {displayTopButtons()}
                <StackedAreaChart
                    titre="Calories dépensées ou sauvées"
                    titreX="Date"
                    titreY="Calories"
                    titreSeries={["Déficit calorique alimentaire", "Activité physique"]}
                    donneeSeries={populateSeriesY()}
                />
                {displayBottomInfo()}
            </div>
            <div class="sm-none-lg-row">
                <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
                    <label class="my-notes">Liste des exercices :</label>
                    <TableRecap 
                        titreColonnes={["Nom", "Calories dépensées par unité", "Unité"]}
                        donnees={sportTable()}
                    />
                    <label class="my-notes">Ajouter un nouvel exercice :</label>
                    <NouvelAlimentExercise 
                        domain={props.domain}
                        item="exercise"
                    />
                </div>
                <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
                    <label class="my-notes">Liste des aliments :</label>
                    <TableRecap 
                        titreColonnes={["Nom", "Calories absorbées par unité", "Unité"]}
                        donnees={foodTable()}
                    />
                    <label class="my-notes">Ajouter un nouvel aliment :</label>
                    <NouvelAlimentExercise 
                        domain={props.domain}
                        item="aliment"
                    />
                </div>
            </div>
        </>
    )
}

