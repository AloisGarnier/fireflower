import React from "react"

// Options du menu principal
export const menuOptions = [
    {chemin : "/calendrier", icone : "fa fa-calendar-days", nom : "Quotidien"},
    {chemin : "/poids", icone : "fa fa-weight-scale", nom : "Poids"},
    {chemin : "/calories", icone : "fa fa-apple-whole", nom : "Calories"},
    {chemin : "/todolist", icone : "fa fa-list-check", nom : "À faire"},
    {chemin : "/ecriture", icone : "fa fa-feather", nom : "Écriture"},
    {chemin : "/langues", icone : "fa fa-language", nom : "Langues"},
    {chemin : "/jdr", icone : "fa fa-dice-d20", nom : "Jeu de rôle"},
]

// Options du menu principal responsive
export const menuOptionsPetit = [
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
    {chemin : "/langues", icone : "fa fa-language"}, 
    // 5e option
    {chemin : "/todolist", icone : "fa fa-list-check"},
    // 4e option
    {chemin : "/ecriture", icone : "fa fa-feather"},
    // 3e option
    {chemin : "/calories", icone : "fa fa-apple-whole"}
]

// Gestion des dates
export const MOIS_31 = [1, 3, 5, 7, 8, 10, 12]
export const MOIS_30 = [4, 6, 9, 11]

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
export const MILLISECONDS_IN_DAY = 1000*3600*24

export function first(number) {
    if(number == 1) {
        return(<>1<sup>er</sup></>)
    }
    return(<>{number}</>)
}

export const dayOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
]
  
export function displayDate(date) {
    return(<>{dayOfWeek[date.getDay()]} {first(date.getDate())} {mois[date.getMonth()].label.toLowerCase()} {date.getFullYear()}</>)
}

export function displayDateWithYesterdayTomorrow(dateString) {
    let date = new Date(dateString.substring(0,4), dateString.substring(5,7)-1, dateString.substring(8,10))
    date.setHours(0, 0, 0, 0)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    if(date-today == 0) {
        return(<>Aujourd'hui</>)
    }
    if(date - today == MILLISECONDS_IN_DAY) {
        return(<>Demain</>)
    }
    if(date - today == -MILLISECONDS_IN_DAY) {
        return(<>Hier</>)
    }
    return(displayDate(date))
}

export const FETES_FIXES = [101, 105, 111, 805, 1111, 1407, 1508, 2512]

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

export function paramDMYDate(aDate) {
    var d = aDate.getDate()
    var m = aDate.getMonth() + 1
    var y = aDate.getFullYear()
    var param =  d + "/" + m + "/" + y
    return param
}

//Poids
export const SURPOIDS = decimalRound(30 * (1.7**2), 1)
export const NORMAL = decimalRound(25 * (1.7**2), 1)
export const METABOLISME = 2200
export const CALORIES_PAR_KG = 7700

//NaNoWriMo
export const NANOWRIMO = 50000

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
    return({ style: { height: "400px", width: "300px" } })

}

//Couleurs
export const VERT_FONCE = "#006B3D"
export const VERT = "#069C56"
export const ORANGE = "#FF980E"
export const ROUGE_ORANGE = "#FF681E"
export const ROUGE = "#D3212C"