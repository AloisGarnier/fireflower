import React, { useState, useEffect } from "react"
import LineChart from "../units/general units/LineChart"
import Select from 'react-select'

import * as cst from "../constants"

export default function Poids(props) {

    const [selectedMonth, setSelectedMonth] = useState([0, new Date().getFullYear()])
    const [series, setSeries] = useState("")

    const backUrl = props.domain + "/weight/"

    useEffect(() => refreshValues(0, new Date().getFullYear()), [])

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

    function populateSeriesY() {
        var tempY = []
        for(var i=0; i<series.length; i++) {
            tempY.push([series[i].date, series[i].weight])
        }
        return(tempY)
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
        if(series[0] && series[1]) {
            var diff = cst.decimalRound(series[series.length-1].weight - series[0].weight, 1)
            var diffTemps = (new Date(series[series.length-1].date) - new Date(series[0].date))/(1000*3600*24)
            var diffParJour = cst.decimalRound(diff/diffTemps, 1)
            var restePourSurpoids = cst.decimalRound((series[series.length-1].weight - cst.surpoids)/diffParJour, 0)
            var restePourPoidsNormal = cst.decimalRound((series[series.length-1].weight - cst.normal)/diffParJour, 0)

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
                titre="Evolution du poids"
                titreX="Date"
                titreY="Poids (kg)"
                titreSeries={["Poids"]}
                donneeSeries={[populateSeriesY()]}
            />
            {displayBottomInfo()}
        </div>
    )
}

