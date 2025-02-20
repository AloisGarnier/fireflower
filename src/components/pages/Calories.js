import React, { useState, useEffect } from "react"
import Select from 'react-select'

import StackedAreaChart from "../units/general units/StackedAreaChart"

import * as cst from "../constants"

import TableRecap from "../units/general units/TableRecap"
import NouvelAlimentExercise from "../units/specific/NouvelAlimentExercise"


export default function Calories(props) {

    const [selectedMonth, setSelectedMonth] = useState([0, new Date().getFullYear()])
    const [series, setSeries] = useState("")

    const backUrl = props.domain + "/calories/"

    const [exercises, setExercises] = useState([])
    const [aliments, setAliments] = useState([])

    const sportUrl = props.domain + "/sport/"
    const foodUrl = props.domain + "/food/"

    useEffect(() => refreshValues(0, new Date().getFullYear()), [])
    useEffect(() => fetchExercises(), [])
    useEffect(() => fetchAliments(), [])

    function refreshValues(newMonth, newYear) {
        if(newMonth == 0) {
            fetch(backUrl + "byYear/" + newYear)
                .then(response => response.json())
                .then(json => setSeries(json))
        } else {
            fetch(backUrl + "byMonth/" + newMonth + "/" + newYear)
                .then(response => response.json())
                .then(json => setSeries(json))
        }
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
                ingested.push([series[i].date, cst.metabolisme - series[i].ingestedCalories])
                spent.push([series[i].date, series[i].spentCalories])
            } 
        }
        return([ingested, spent])
    }

    function changeMonth(newMonth, newYear) {
        setSelectedMonth([newMonth, newYear])
        refreshValues(newMonth, newYear)
    }

    const onMonthChange = (
        inputValue
      ) => {
        changeMonth(inputValue.value, selectedMonth[1])
      }

    const onYearChange = (
        inputValue
      ) => {
        changeMonth(selectedMonth[0], inputValue.value)
      }

    function displayTopButtons() {
        var annees = []
        for(var a = 2001 ; a <= 2100 ; a++) {
            annees.push({ value: a, label: a+'' })
        }

        var defaultMonth = cst.moisTouteAnnee[selectedMonth[0]]
        var defaultYear = annees[selectedMonth[1] - 2001]

        return(
            <div class="btn-group mb-5" role="group">
                <Select options={cst.moisTouteAnnee} defaultValue={defaultMonth} onChange={onMonthChange}/>
                <Select options={annees} defaultValue={defaultYear} onChange={onYearChange}/>
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
        <div class="d-flex sm-col-lg-row">
            <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
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
            <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5 mh-75">
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
    )
}

