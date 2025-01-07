import React from "react"

import {Route, Routes} from "react-router-dom";

import "../css/style.css"
import "../css/lumen.css"
import "../css/fontawesome.all.min.css"
import MenuPrincipal from "./units/MenuPrincipal.js"
import Calendrier from "./pages/Calendrier.js"
import Poids from "./pages/Poids.js"

export default function App() {

  const domain = "http://localhost:8081"

  return( 
      <div class="my-app">
        <MenuPrincipal/>
        
        <div class="my-main-content">
          <Routes>
            <Route exact path="/calendrier" element={
              <Calendrier
              domain={domain}
            />}></Route>
            <Route exact path="/poids" element={
              <Poids
              domain={domain}
            />}></Route>
          </Routes>
        </div>
      </div>
      );
}