import React, { useState, useEffect } from "react"

import * as cst from "../../constants"

/*
 * Props :
 *   - selectedDay
 *   - domain
 *   - hasChanged
 */ 
export default function RecapJour(props) {

    const [recap, setRecap] = useState("")

    const backUrl = props.domain + "/calories/"

    useEffect(() => fetchRecap(), [])
    useEffect(() => fetchRecap(), [props.selectedDay])
    useEffect(() => fetchRecap(), [props.hasChanged])

    function fetchRecap() {
        fetch(backUrl + "byDay/" + cst.paramDMY(props))
                .then(response => response.json())
                .then(json => setRecap(json))
    }

    function displayBooks() {
        if(recap.books && recap.books.length > 0) {
            console.log(recap.books)
            var books = []
            for(var i=0; i<recap.books.length; i++) {
                books.push(
                <li>
                    {recap.books[i].name} : {recap.books[i].words} mots
                </li>)
            }
            return(
                <ul>
                    {books}
                </ul>
            )
        }
        return(
            <br/>
        )
    }

    function displaySport() {
        if(recap.sports && recap.sports.length > 0) {
            var sports = []
            for(var i=0; i<recap.sports.length; i++) {
                sports.push(
                <li>
                    {recap.sports[i].name} : {recap.sports[i].minutes} {cst.unitFormat(recap.sports[i].minutes, recap.sports[i].unit)}
                </li>)
            }
            return(
                <ul>
                    {sports}
                </ul>
            )
        }
        return(
            <br/>
        )
    }

    function displayMeal(dish) {
        return(
            <li>
                {dish.aliment} : {dish.quantity} {cst.unitFormat(dish.quantity, dish.unit)}
            </li>
        )
    }

    function displayMeals() {
        if(recap.dishes && recap.dishes.length > 0) {
            var breakfast = []
            var lunch = []
            var dinner = []
            for(var i=0; i<recap.dishes.length; i++) {
                switch(recap.dishes[i].mealId) {
                    case 1:
                        breakfast.push(displayMeal(recap.dishes[i]))
                        break
                    case 2:
                        lunch.push(displayMeal(recap.dishes[i]))
                        break
                    case 3:
                        dinner.push(displayMeal(recap.dishes[i]))
                        break
                    default:
                        break
                }
            }
            return(
                <div>
                    &nbsp; &nbsp; <strong><em>Petit-déjeuner :</em></strong> <br/>
                    <ul>
                        {breakfast}
                    </ul>
                    &nbsp; &nbsp; <strong><em>Déjeuner :</em></strong>  <br/>
                    <ul>
                        {lunch}
                    </ul>
                    &nbsp; &nbsp; <strong><em>Dîner :</em></strong> <br/>
                    <ul>
                        {dinner}
                    </ul>
                </div>
            )
        }
        return(
            <br/>
        )
    }

    return(
        <div class="my-notes">
            <strong>Livres :</strong> {displayBooks()}
            <strong>Poids :</strong> {recap.weight} kg <br/>
            <strong>Sport :</strong> {displaySport()}
            <strong>Repas :</strong> {displayMeals()}
        </div>
    )
}