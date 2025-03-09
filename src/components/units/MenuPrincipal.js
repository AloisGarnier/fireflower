import React from "react"
import * as cst from "../constants"

export default function MenuPrincipal(props) {

    function afficherOptions() {
        let affichageOptions = []
        if(window.innerWidth < 600) {
            let options = cst.menuOptionsPetit
            for(var i = 0; i<options.length; i++) {
                affichageOptions.push(
                    <li>
                        <div class="cm-placeholder">
                            <div class="upside">
                                <a href={options[i].chemin} class="cm-button"><i class={options[i].icone}></i></a>
                            </div>
                        </div>
                    </li>
                )
            }
        } else {
            let options = cst.menuOptions
            for(var i = 0; i<options.length; i++) {
                affichageOptions.push(
                    <li class="navbar__item">
                        <a href={options[i].chemin} class="navbar__link"><i class={options[i].icone}></i><span>{options[i].nom}</span></a>
                    </li>
                )
            }
        }
        return affichageOptions
    }

    if(window.innerWidth < 600) {
        return(
            
                <section class="menu menu--circle">
                <input type="checkbox" id="menu__active"/>
                <label for="menu__active" class="menu__active">
                    <div class="menu__toggle">
                        <div class="cm-icon">
                            <div class="hamburger"></div>
                        </div>
                    </div>
                    <input type="radio" name="arrow--up" id="degree--up-0"/>
                    <input type="radio" name="arrow--up" id="degree--up-1" />
                    <input type="radio" name="arrow--up" id="degree--up-2" />
                    <div class="menu__listings">
                    <ul class="circle">
                        {afficherOptions()}
                    </ul>
                    </div>
                    <div class="menu__arrow menu__arrow--top">
                    <ul>
                        <li>
                        <label for="degree--up-0"><div class="arrow"></div></label>
                        <label for="degree--up-1"><div class="arrow"></div></label>
                        <label for="degree--up-2"><div class="arrow"></div></label>
                        </li>
                    </ul>
                    </div>
                </label>
            </section>
        );
    } else {
        return(
            <nav class="navbar__global">
                <ul class="navbar__menu">
                    {afficherOptions()}
                </ul>
            </nav>
        );
    }

}