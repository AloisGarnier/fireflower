import React from "react";
import * as cst from "../constants"
import OptionMenu from "./OptionMenu";

/*
 * Props :
 *   - joueur
 */ 
export default function MenuPrincipal(props) {

    let defis = {nom : "Défis", chemin : "/defis", sousoptions : []}

    let options = [cst.ludotheque, defis]

    function afficherOptions() {
        let affichageOptions = []
        for(var i = 0; i<options.length; i++) {
            affichageOptions.push(
                <OptionMenu option={options[i]}></OptionMenu>
            )
        }
        return affichageOptions
    }

    return(
        <section class="menu menu--circle">
  <input type="checkbox" id="menu__active"/>
  <label for="menu__active" class="menu__active">
    <div class="menu__toggle">
      <div class="icon">
        <div class="hamburger"></div>
      </div>
    </div>
    <input type="radio" name="arrow--up" id="degree--up-0"/>
    <input type="radio" name="arrow--up" id="degree--up-1" />
    <input type="radio" name="arrow--up" id="degree--up-2" />
    <div class="menu__listings">
      <ul class="circle">
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="https://codepen.io/logrithumn" class="button"><i class="fa fa-user"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-cog"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#">&nbsp</a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-commenting"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-trash"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-battery-4"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-calendar"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-cloud"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-wifi"></i></a>
            </div>
          </div>
        </li>
        <li>
          <div class="placeholder">
            <div class="upside">
              <a href="#" class="button"><i class="fa fa-envelope-o"></i></a>
            </div>
          </div>
        </li>
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
}