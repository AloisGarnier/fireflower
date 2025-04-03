import React from "react"

// Options du menu principal
export const menuOptions = [
    {chemin : "/calendrier", icone : "fa-duotone fa-solid fa-calendar-days", nom : "Quotidien"},
    {chemin : "/stats", icone : "fa-duotone fa-solid fa-chart-user", nom : "Statistiques"},
    {chemin : "/todolist", icone : "fa-duotone fa-solid fa-clipboard-list-check", nom : "À faire"},
    {chemin : "/langues", icone : "fa-duotone fa-solid fa-language", nom : "Langues"},
    {chemin : "/options", icone : "fa-duotone fa-solid fa-gears", nom : "Options"},
]

export const defaultOption = {chemin : "/", icone : "fa-duotone fa-solid fa-ban"}

// Options du menu principal responsive
export const menuOptionsPetit = [
    // 2e option
    menuOptions[1]??defaultOption,
    // 1re option
    menuOptions[0]??defaultOption,
    // N'apparait pas 
    menuOptions[9]??defaultOption,
    // 9e option
    menuOptions[8]??defaultOption,
    // 8e option
    menuOptions[7]??defaultOption,
    // 7e option
    menuOptions[6]??defaultOption,
    // 6e option
    menuOptions[5]??defaultOption,
    // 5e option
    menuOptions[4]??defaultOption,
    // 4e option
    menuOptions[3]??defaultOption,
    // 3e option
    menuOptions[2]??defaultOption,
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

export const dayOfWeekSundaySeven = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
]

export function displayDateDayMonth(day, month) {
    return(<>{first(day)} {mois[month].label.toLowerCase()}</>)
}
  
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
export const SURPOIDS = decimalRound(30 * (1.68**2), 1)
export const NORMAL = decimalRound(25 * (1.68**2), 1)
export const METABOLISME = 2200
export const CALORIES_PAR_KG = 7700

//NaNoWriMo
export const NANOWRIMO = 50000

//Arrondi
export function decimalRound(num, digits) {
    var hundredPower = 10**digits

    return Math.round((num + Number.EPSILON) * hundredPower) / hundredPower
}

//String display
export function capitalizeOnlyFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase();
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