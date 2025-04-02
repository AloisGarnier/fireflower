import React, { useState, useEffect } from "react"
import Select from 'react-select'

import StackedAreaChart from "../../units/generalUnits/StackedAreaChart"

import * as cst from "../../constants"

export default function Calories(props) {

    const [plage, setPlage] = useState(24)
    const [pas, setPas] = useState('j')
    const [series, setSeries] = useState("")

    const backUrl = props.domain + "/calories/"

    useEffect(() => refreshValues(24, 'j'), [])

    function refreshValues(newPlage, newPas) {
        fetch(backUrl + "lastMonths/" + newPlage + "/" + newPas)
            .then(response => response.json())
            .then(json => setSeries(json))
    }

    function populateSeriesY() {
        var ingested = []
        var spent = []
        for(var i=0; i<series.length; i++) {
            if(series[i].ingestedCalories > 0) {
                ingested.push([series[i].date, cst.METABOLISME*series[i].numberOfDays - series[i].ingestedCalories])
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
            var diffTemps = (new Date(ingested[lastIndex][0]) - new Date(ingested[0][0]))/cst.MILLISECONDS_IN_DAY + 1
            var moyenne = cst.decimalRound(total/diffTemps, 0)
            var totalKg = cst.decimalRound(total/cst.CALORIES_PAR_KG, 2)
            var moyenneKg = cst.decimalRound(moyenne/cst.CALORIES_PAR_KG, 2)
            
            return(
                <div class="my-5 my-notes">
                    Sur cette période, j'ai brûlé {total} kcal, soit {moyenne} kcal/jour en moyenne.<br/>
                    Cela correspond à environ {totalKg} kg perdus, soit {moyenneKg} kg par jour.
                </div>
            )
        }
    }

    return(
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
    )
}

