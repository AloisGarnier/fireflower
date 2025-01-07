import React from "react"

// Options du menu principal
export const menuOptions = [
    // 2e option
    {chemin : "/finances", icone : "fa fa-money-bill-trend-up"},
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
    {chemin : "/repas", icone : "fa fa-utensils"}, 
    // 5e option
    {chemin : "/sport", icone : "fa fa-person-running"},
    // 4e option
    {chemin : "/poids", icone : "fa fa-weight-scale"},
    // 3e option
    {chemin : "/ecriture", icone : "fa fa-feather"}
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
export function updateValue(stateItem, setStateFunction, index, newValue) {
    setStateFunction([...stateItem.slice(0, index), newValue, ...stateItem.slice(index + 1)])
}

//Unités dans les inputs
export function unite(props) {
    if(props.unit) {
        return(<span class="input-group-text">{props.unit}</span>)
    }
}