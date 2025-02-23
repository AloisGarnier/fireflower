import React, { useState, useEffect } from "react"

import * as cst from "../../constants"
import { Accordion } from "react-bootstrap"

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
            var result = []
            if(breakfast.length > 0) {
                result.push(
                    <>
                        &nbsp; &nbsp; <strong><em>Petit-déjeuner :</em></strong> <br/>
                        <ul>
                            {breakfast}
                        </ul>
                    </>
                )
            }
            if(lunch.length > 0) {
                result.push(
                    <>
                        &nbsp; &nbsp; <strong><em>Déjeuner :</em></strong>  <br/>
                        <ul>
                            {lunch}
                        </ul>
                    </>
                )
            }
            if(dinner.length > 0) {
                result.push(
                    <>
                        &nbsp; &nbsp; <strong><em>Dîner :</em></strong> <br/>
                        <ul>
                            {dinner}
                        </ul>
                    </>
                )
            }
            return(
                <div>
                    {result}
                </div>
            )
        }
        return(
            <br/>
        )
    }

    return(
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <strong>Livres</strong>
                </Accordion.Header>
                <Accordion.Body>
                    {displayBooks()}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>
                    <strong>Poids</strong>
                </Accordion.Header>
                <Accordion.Body>
                    {recap.weight} {recap.weight ? "kg" : "/"}
                </Accordion.Body>
            </Accordion.Item >
            <Accordion.Item eventKey="2">
                <Accordion.Header>
                    <strong>Sport : &nbsp;</strong> {recap.spent} kcal
                </Accordion.Header>
                <Accordion.Body>
                    {displaySport()}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>
                    <strong>Repas : &nbsp;</strong> {recap.ingested} kcal
                </Accordion.Header>
                <Accordion.Body>
                    {displayMeals()}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}