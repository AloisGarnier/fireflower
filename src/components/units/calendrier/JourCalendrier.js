import React from "react"
import * as cst from "../../constants"

/*
 * Props :
 *   - annee
 *   - mois
 *   - jour
 */ 
export default function JourCalendrier(props) {

    function samediOuDimanche() {
        var jourC = new Date(props.annee, props.mois, props.jour).getDay()
        if(jourC == 0 || jourC == 6) {
            return true
        }
        return false
    }

    function divEuc(a, b) {
        return [Math.floor(a/b), a % b]
    }

    function calculPaques() {
        var n = props.annee % 19
        var [c, u] = divEuc(props.annee, 100)
        var [s, t] = divEuc(c, 4)
        var p = Math.floor((c+8)/25)
        var q = Math.floor((c-p+1)/3)
        var e = (19*n + c - s - q + 15) % 30
        var [b, d] = divEuc(u, 4)
        var L = (2*t+2*b-e-d+32) % 7
        var h = Math.floor((n+11*e+22*L)/451)
        var [m, j] = divEuc(e+L-7*h+114, 31)

        return new Date(props.annee, m - 1, j + 1)
    }

    function addDays(date, days) {
        var result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
      }

    function valeurJour(date) {
        return date.getDate()*100+date.getMonth()+1
    }

    function jourFerie() {
        // Fêtes fixes
        var valeurJourActuel = props.jour*100 + props.mois + 1
        if(cst.FETES_FIXES.includes(valeurJourActuel)) {
            return true
        }
        // Pâques, Ascension, Pentecôte
        var paques = calculPaques()
        var ascension = addDays(paques, 39)
        var pentecote = addDays(paques, 49)
        var lundiPaques = addDays(paques, 1)
        var lundiPentecote = addDays(pentecote, 1)
        var fetesMobiles = [valeurJour(lundiPaques), valeurJour(ascension), valeurJour(lundiPentecote)]
        if(fetesMobiles.includes(valeurJourActuel)) {
            return true
        }
        
        return false
    }

    function buttonClass() {
        var classOfButton = "btn"
        //Si hors du mois
        if(props.jour == 0) {
            classOfButton += " btn-nullified disabled"
        } else {
            //Mise en forme spéciale pour le jour d'aujourd'hui
            if(new Date().getDate() == props.jour && new Date().getMonth() == props.mois && new Date().getFullYear() == props.annee) {
                classOfButton += " red-text"
            }
            //Mise en forme pour le jour sélectionné
            if(props.selectedDay.getDate() == props.jour 
                && props.selectedDay.getMonth() == props.mois 
                && props.selectedDay.getFullYear() == props.annee) {
                classOfButton += " btn-success"
            } else {
                if(jourFerie()) {
                    classOfButton += " btn-warning"
                } else if(samediOuDimanche()) {
                    classOfButton += " btn-dark"
                } else {
                    classOfButton += " btn-secondary"
                }
            }
        }
        return classOfButton
    }

    function displayNumber() {
        if(props.jour < 10) {
            return "0" + props.jour
        }
        return props.jour
    }

    return(
        <button type="button" class={buttonClass()} onClick={() => props.setSelectedDay(new Date(props.annee, props.mois, props.jour))}>{displayNumber()}</button>
    );
}