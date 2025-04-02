import React, { useState, useEffect } from "react"
import LineChart from "../../units/generalUnits/LineChart"
import Select from 'react-select'

import * as cst from "../../constants"

export default function Poids(props) {

    const [plage, setPlage] = useState(24)
    const [pas, setPas] = useState('j')
    const [series, setSeries] = useState("")

    const [isSurpoids, setSurpoids] = useState(false)
    const [isNormal, setNormal] = useState(false)

    const backUrl = props.domain + "/weight/"

    useEffect(() => refreshValues(24, 'j'), [])

    function refreshValues(newPlage, newPas) {
        fetch(backUrl + "lastMonths/" + newPlage + "/" + newPas)
        .then(response => response.json())
        .then(json => setSeries(json))
    }

    function addFlatSeries(bool, value, table) {
        if(bool) {
            var newSeries = []
            newSeries.push([series[0].date, value])
            newSeries.push([series[series.length - 1].date, value])
            table.push(newSeries)
        }
    }

    function populateSeriesY() {
        var allSeries = []
        var poidsSeries = []
        for(var i=0; i<series.length; i++) {
            poidsSeries.push([series[i].date, cst.decimalRound(series[i].weight, 1)])
        }
        allSeries.push(poidsSeries)
        addFlatSeries(isNormal, cst.NORMAL, allSeries)
        addFlatSeries(isSurpoids, cst.SURPOIDS, allSeries)
        return(allSeries)
    }

    function titreSeries() {
        var allTitres = ["Mon poids"]
        if(isNormal) {
            allTitres.push("Poids normal")
        }
        if(isSurpoids) {
            allTitres.push("Surpoids")
        }
        return allTitres
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

    function buttonClick(opt) {
        if(opt == "normal") {
            setNormal(b => !b)
        } else if(opt == "surpoids") {
            setSurpoids(b => !b)
        }
    }

    function displayBottomButtons() {
        return(
            <div class="btn-group mt-5">
                <div class="form-check mx-2">
                    <input class="form-check-input" type="checkbox" onClick={() => buttonClick("normal")} id="flexCheckDefault"/>
                    <label class="form-check-label white-text" for="flexCheckDefault">Poids normal</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" onClick={() => buttonClick("surpoids")} id="flexCheckDefault"/>
                    <label class="form-check-label white-text" for="flexCheckDefault">Surpoids</label>
                </div>
            </div>
        )
    }

    function displayBottomInfo() {
        if(series[0] && series[1]) {
            var diff = cst.decimalRound(series[series.length-1].weight - series[0].weight, 1)
            var diffTemps = (new Date(series[series.length-1].date) - new Date(series[0].date))/(1000*3600*24)
            var diffParJour = cst.decimalRound(diff/diffTemps, 1)
            var restePourSurpoids = cst.decimalRound((series[series.length-1].weight - cst.SURPOIDS)/diffParJour, 0)
            var restePourPoidsNormal = cst.decimalRound((series[series.length-1].weight - cst.NORMAL)/diffParJour, 0)

            var firstSentence = ""
            if(diff < 0) {
                firstSentence = "Sur cette période, j'ai perdu "+ (-diff) +" kg, soit " +(-diffParJour) +" kg/jour en moyenne."
            } else {
                firstSentence = "Sur cette période, j'ai pris "+ diff +" kg, soit " + diffParJour +" kg/jour en moyenne."
            }

            var secondSentence = ""
            if(diff < 0 && restePourSurpoids < 0) {
                secondSentence = "A ce rythme, il me reste "+ (-restePourSurpoids)+" jours avant de quitter l'obésité"
            }

            var thirdSentence = ""
            if(diff < 0 && restePourSurpoids < 0) {
                thirdSentence = " et "+ (-restePourPoidsNormal)+" jours avant de retrouver un poids normal"
            } else if(diff < 0 && restePourPoidsNormal < 0) {
                thirdSentence = "A ce rythme, il me reste "+ (-restePourPoidsNormal)+" jours avant de retrouver un poids normal"
            }
    
            return(
                <div class="my-5 my-notes">
                    {firstSentence}<br/>{secondSentence}{thirdSentence}
                </div>
            )
        }
    }

    return(
        <div class="d-flex flex-column w-50 align-self-center align-items-center justify-items-center">
            {displayTopButtons()}
            <LineChart
                titre="Suivi de mon poids dans le temps"
                titreX="Date"
                titreY="Poids (kg)"
                titreSeries={titreSeries()}
                donneeSeries={populateSeriesY()}
            />
            {displayBottomButtons()}
            {displayBottomInfo()}
        </div>
    )
}

