import React from "react"

// Options du menu principal
export const menuOptions = [
    // 2e option
    {chemin : "/poids", icone : "fa fa-weight-scale"},
    // 1re option
    {chemin : "/calendrier", icone : "fa fa-calendar-days"},
    // N'apparait pas 
    {chemin : "/utilisateurs", icone : "fa fa-user"},
    // 9e option
    {chemin : "/options", icone : "fa fa-gears"},
    // 8e option
    {chemin : "/utilisateurs", icone : "fa fa-user"}, 
    // 7e option
    {chemin : "/jeux", icone : "fa fa-gamepad"}, 
    // 6e option
    {chemin : "/echecs", icone : "fa fa-chess"}, 
    // 5e option
    {chemin : "/finances", icone : "fa fa-money-bill-trend-up"},
    // 4e option
    {chemin : "/ecriture", icone : "fa fa-feather"},
    // 3e option
    {chemin : "/calories", icone : "fa fa-apple-whole"}
]

// Gestion des dates
export const mois31 = [1, 3, 5, 7, 8, 10, 12]
export const mois30 = [4, 6, 9, 11]

export const mois = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
  ]

export const moisTouteAnnee = [
    { value: 0, label: 'Toute l\'année'},
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
]

export const plageDeTemps = [
    { value: 24, label: 'sur les 24 derniers mois'},
    { value: 12, label: 'sur les 12 derniers mois' },
    { value: 6, label: 'sur les 6 derniers mois' },
    { value: 3, label: 'sur les 3 derniers mois' },
    { value: 1, label: 'sur le dernier mois' },
]

export const pasDeTemps = [
    { value: 'j', label: 'par jour'},
    { value: 's', label: 'par semaine' },
    { value: 'm', label: 'par mois' },
]

//Gestion du temps
export const milliSecondsInDay = 1000*3600*24

export function first(number) {
    if(number == 1) {
        return(<>1<sup>er</sup></>)
    }
    return(<>{number}</>)
}
  
export function displayDate(date) {
    return(<>{first(date.getDate())} {mois[date.getMonth()].label.toLowerCase()} {date.getFullYear()}</>)
}

export const fetesFixes = [101, 105, 111, 805, 1111, 1407, 1508, 2512]

// Changer un élément d'un tableau dans un useState
export function updateValue(setStateFunction, index, newValue) {
    setStateFunction((stateItem) => [...stateItem.slice(0, index), newValue, ...stateItem.slice(index+1)])
}

//Unités dans les inputs
export function unite(props) {
    if(props.unit) {
        return(<span class="input-group-text">{props.unit}</span>)
    }
}

export function uniteI(props, i) {
    if(props.unit && props.unit.constructor === Array) {
        return(<span class="input-group-text">{props.unit[i]}</span>)
    } else {
        return(<span class="input-group-text">{props.unit}</span>)
    }
}

export function unitFormat(number, unit) {
    if(number > 1) {
        return unit.toLowerCase() + "s"
    }
    return unit.toLowerCase()
}

//Date parameters
export function paramDMY(props) {
    var d = props.selectedDay.getDate()
    var m = props.selectedDay.getMonth() + 1
    var y = props.selectedDay.getFullYear()
    var param =  d + "/" + m + "/" + y
    return param
}

//Poids
export const surpoids = 85
export const normal = 71
export const metabolisme = 2200
export const calPerKg = 7700

//NaNoWriMo
export const nanowrimo = 50000

//Arrondi
export function decimalRound(num, digits) {
    var hundredPower = 10**digits

    return Math.round((num + Number.EPSILON) * hundredPower) / hundredPower
}

//Options d'affichage des graphiques
export function containerProps() {
    if(window.innerWidth >= 600) {
        return({ style: { height: "400px", width: "600px"} })
    }
    return({ style: { height: "200px", width: "300px" } })

}