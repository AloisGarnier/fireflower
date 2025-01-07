import React, { useState, useEffect } from "react"
import LineChart from "../units/LineChart"
import Select from 'react-select'

import * as cst from "../constants"

export default function Poids(props) {

    const [selectedMonth, setSelectedMonth] = useState([new Date().getMonth() + 1, new Date().getFullYear()])
    const [series, setSeries] = useState("")

    const backUrl = props.domain + "/weight/"

    useEffect(() => refreshValues(new Date().getMonth() + 1, new Date().getFullYear()), [])

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

    function populateSeriesX() {
        var tempX = []
        for(var i=0; i<series.length; i++) {
            tempX.push(series[i].date)
        }
        return(tempX)
    }

    function populateSeriesY() {
        var tempY = []
        for(var i=0; i<series.length; i++) {
            tempY.push(series[i].weight)
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

        var defaultMonth = cst.mois[selectedMonth[0] - 1]
        var defaultYear = annees[selectedMonth[1] - 2001]

        return(
            <div class="btn-group mb-5" role="group">
                <Select options={cst.moisTouteAnnee} defaultValue={defaultMonth} onChange={onMonthChange}/>
                <Select options={annees} defaultValue={defaultYear} onChange={onYearChange}/>
            </div>
        )
    }

    return(
        <div class="d-flex flex-column w-50 align-self-center align-items-center justify-items-center">
            {displayTopButtons()}
            <LineChart
                titre="Evolution du poids"
                titreX="Date"
                titreY="Poids (kg)"
                catX={populateSeriesX()}
                titreSeries={["Poids"]}
                donneeSeries={[populateSeriesY()]}
            />
        </div>
    )
}

