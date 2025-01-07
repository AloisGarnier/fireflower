import React, { useState } from "react"
import { Link } from "react-router-dom"
import JourCalendrier from "./JourCalendrier"
import * as cst from "../constants"
import Select from 'react-select'

/*
 * Props :
 *   - selectedDay
 *   - setSelectedDay
 */ 
export default function CalendrierWidget(props) {

    const [selectedMonth, setSelectedMonth] = useState([props.selectedDay.getMonth() + 1, props.selectedDay.getFullYear()])

    function changeMonth(newMonth, newYear) {
        setSelectedMonth([newMonth, newYear])
    }

    function daysOfMonth() {
        if(cst.mois31.includes(selectedMonth[0])) {
            return 31
        } else if(cst.mois30.includes(selectedMonth[0])) {
            return 30
        } else {
            var feb29 = new Date(selectedMonth[1], 1, 29).getDate() == 29 ? 1 : 0
            return 28 + feb29
        }
    }

    function firstDay() {
        var dayOfWeek = new Date(selectedMonth[1], selectedMonth[0] - 1, 1).getDay()
        return dayOfWeek == 0 ? 7 : dayOfWeek
    }

    function displayWeek(beginDay, beginDate, endDay) {
        var displayDays = []
        var i = 0
        for(let d = 1; d < 8; d++) {
            if(d >= beginDay && d <= endDay) {
                displayDays.push(<JourCalendrier jour={beginDate + i} 
                    mois={selectedMonth[0] - 1} 
                    annee={selectedMonth[1]}
                    selectedDay={props.selectedDay}
                    setSelectedDay={props.setSelectedDay}/>)
                i++
            } else {
                displayDays.push(<JourCalendrier jour={0}/>)
            }
        }

        return(
            <div class="btn-group me-2 mb-2 d-flex flex-row" role="group">
                {displayDays}
            </div>
        )
    }

    function displayWeeks() {
        var beginWeekDate = 1
        var displayWeeks = []
        //first week
        displayWeeks.push(displayWeek(firstDay(), beginWeekDate, 7))
        beginWeekDate += 8 - firstDay()
        //complete weeks
        while(beginWeekDate + 7 <= daysOfMonth()) {
            displayWeeks.push(displayWeek(1, beginWeekDate, 7))
            beginWeekDate += 7
        }
        // last week
        displayWeeks.push(displayWeek(1, beginWeekDate, 1 + daysOfMonth() - beginWeekDate))
        return displayWeeks
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
                <Select options={cst.mois} defaultValue={defaultMonth} onChange={onMonthChange}/>
                <Select options={annees} defaultValue={defaultYear} onChange={onYearChange}/>
            </div>
        )
    }

    function setToday() {
        props.setSelectedDay(new Date())
    }

    function displayTodayButton() {
        return(<Link type="button" class="btn btn-info" onClick={() => setToday()}>Aujourd'hui</Link>)
    }

    function daysOfWeek() {
        return(
            <div class="btn-group me-2 mb-2 d-flex flex-row" role="group">
                <button class="btn btn-light btn-not-capitalized disabled">Lu</button>
                <button class="btn btn-light btn-not-capitalized disabled">Ma</button>
                <button class="btn btn-light btn-not-capitalized disabled">Me</button>
                <button class="btn btn-light btn-not-capitalized disabled">Je</button>
                <button class="btn btn-light btn-not-capitalized disabled">Ve</button>
                <button class="btn btn-light btn-not-capitalized disabled">Sa</button>
                <button class="btn btn-light btn-not-capitalized disabled">Di</button>
            </div>)
    }

    return(
        <div class="d-flex flex-column align-self-center align-items-center justify-items-center">
            {displayTopButtons()}
            {daysOfWeek()}
            <div class="btn-toolbar d-flex flex-column mb-5" role="toolbar" aria-label="Toolbar with button groups">
                {displayWeeks()}
            </div>
            {displayTodayButton()}
        </div>
    );
}