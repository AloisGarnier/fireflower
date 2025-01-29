import React, { useState, useEffect } from "react"
import LineChart from "../units/general units/LineChart"
import Select from 'react-select'

import * as cst from "../constants"

import TableRecap from "../units/general units/TableRecap"
import NouveauLivre from "../units/specific/NouveauLivre"

export default function Ecriture(props) {

    const [selectedMonth, setSelectedMonth] = useState([new Date().getMonth() + 1, new Date().getFullYear()])
    const [selectedBook, setSelectedBook] = useState(1)
    const [books, setBooks] = useState([])
    const [series, setSeries] = useState("")

    const backUrl = props.domain + "/writing/"

    useEffect(() => refreshValues(new Date().getMonth() + 1, new Date().getFullYear()), [])
    useEffect(() => fetchBooks(), [])

    function processBooks(json) {
        var newBooks = []
        for(var i=0; i<json.length; i++) {
            newBooks.push({value: json[i].id, label: json[i].title})
        }
        setBooks(newBooks)
    }

    function fetchBooks() {
        fetch(backUrl + "books")
            .then(response => response.json())
            .then(json => processBooks(json))
    }

    function refreshValues(newMonth, newYear) {
        if(newMonth == 0) {
            fetch(backUrl + "byYear/" + selectedBook + "/" + newYear)
                .then(response => response.json())
                .then(json => setSeries(json))
        } else {
            fetch(backUrl + "byMonth/" + selectedBook + "/" + newMonth + "/" + newYear)
                .then(response => response.json())
                .then(json => setSeries(json))
        }
    }

    function populateSeries() {
        var tempY = []
        for(var i=0; i<series.length; i++) {
            tempY.push([series[i].date, series[i].words])
        }
        return(tempY)
    }

    function changeMonth(newMonth, newYear) {
        setSelectedMonth([newMonth, newYear])
        refreshValues(newMonth, newYear)
    }

    function changeBook(newBook) {
        setSelectedBook(newBook.value)
        refreshValues(selectedMonth[0], selectedMonth[1])
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
            <div class="d-flex flex-row mb-5">
                <div class="btn-group mx-2" role="group">
                    <Select options={cst.moisTouteAnnee} defaultValue={defaultMonth} onChange={onMonthChange}/>
                    <Select options={annees} defaultValue={defaultYear} onChange={onYearChange}/>
                </div>
                <div class="btn-group mx-2" role="group">
                    <Select options={books} defaultValue={books[0]} onChange={changeBook}/>
                </div>
            </div>
            
        )
    }

    function currentTitle() {
        for(var i=0; i<books.length; i++) {
            if(books[i].value == selectedBook) {
                return [books[i].label]
            }
        }
        return [""]
    }

    function displayBottomInfo() {
        if(series[0] && series[1]) {
            var diff = series[series.length-1].words - series[0].words
            var diffTemps = (new Date(series[series.length-1].date) - new Date(series[0].date))/cst.milliSecondsInDay
            var diffParJour = cst.decimalRound(diff/diffTemps, 2)
            var restePourNanoWriMo = cst.decimalRound((cst.nanowrimo - series[series.length-1].words)/diffParJour, 0)
    
            return(
                <div class="my-5 my-notes">
                    Sur cette période, j'ai écrit {-diff} mots, soit {-diffParJour} mots/jour en moyenne.<br/>
                    A ce rythme, il reste {restePourNanoWriMo} jours avant d'atteindre 50 000 mots.
                </div>
            )
        }
    }

    function bookTable() {
        var bookData = []
        for(var i=0; i<books.length; i++) {
            bookData.push([books[i].label])
        }
        return bookData
    }

    return(
        <div class="d-flex sm-col-lg-row">
            <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
                {displayTopButtons()}
                <LineChart
                    titre="Ecriture du roman"
                    titreX="Date"
                    titreY="mots"
                    titreSeries={currentTitle()}
                    donneeSeries={[populateSeries()]}
                />
                {displayBottomInfo()}
            </div>
            <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
                <label class="my-notes">Liste des romans :</label>
                <TableRecap 
                    titreColonnes={["Titre"]}
                    donnees={bookTable()}
                />
                <label class="my-notes">Ajouter un nouveau roman :</label>
                <NouveauLivre 
                    domain={props.domain}
                />     
            </div>
        </div>
        
    )
}

