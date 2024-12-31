import React from "react"

import "../css/style.css"
import "../css/lumen.css"
import "../css/fontawesome.all.min.css"
import MenuPrincipal from "./units/MenuPrincipal.js"
import Calendrier from "./pages/Calendrier.js"

import {Route, Routes, Link, useNavigate} from "react-router-dom";

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
          </Routes>
        </div>
      </div>
      );
}