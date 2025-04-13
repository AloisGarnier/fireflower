import React, {useEffect } from "react"

import {Route, Routes} from "react-router-dom";

import "../css/style.css"
import "../css/lumen.css"
//import "../css/fontawesome.all.min.css"
import "../css/all.min.css"
import "../css/duotone.min.css"

import MenuPrincipal from "./units/MenuPrincipal.js"
import Calendrier from "./pages/Calendrier.js"
import Todolist from "./pages/Todolist.js";
import Stats from "./pages/Stats.js";
import Options from "./pages/Options.js";
import Elections from "./pages/Elections.js";

export default function App() {

  //const domain = "http://localhost:8081"
  const domain = "http://34.155.93.110:8081"

  const bdayUpdateUrl = domain + "/birthday/update"
  const sportUpdateUrl = domain + "/sport/update"

  useEffect(() => updateBdays(), [])
  useEffect(() => updateSport(), [])

  function updateBdays() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(bdayUpdateUrl, requestOptions)
      .then(setTimeout(() => {
          console.log("Delayed for 1 second.");
        }, 1000)
      )
  }

  function updateSport() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(sportUpdateUrl, requestOptions)
      .then(setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, 1000)
  )
  }

  return( 
      <div class="my-app">
        <MenuPrincipal/>
        
        <div class="my-main-content">
          <Routes>
            <Route exact path="/" element={
              <Calendrier
              domain={domain}
            />}></Route>
            <Route exact path="/calendrier" element={
              <Calendrier
              domain={domain}
            />}></Route>
            <Route exact path="/stats" element={
              <Stats
              domain={domain}
            />}></Route>
            <Route exact path="/todolist" element={
              <Todolist
              domain={domain}
            />}></Route>
            <Route exact path="/options" element={
              <Options
              domain={domain}
            />}></Route>
            <Route exact path="/election" element={
              <Elections
              domain={domain}
            />}></Route>
          </Routes>
        </div>
      </div>
      );
}