import React from "react";

import IconeJeu from "./units/IconeJeu.js";

import "../css/style.css";
import "../css/lumen.css";
import "../css/fontawesome.all.min.css";
import { Helmet } from "react-helmet";
import MenuPrincipal from "./units/MenuPrincipal.js";

export default function App() {

  const domain = "http://localhost:8081"

  return( 
      <div class="my-app">
        <MenuPrincipal />
        <div class="overflow-scroll">
        <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
          <IconeJeu jeu={ {image : "https://drive.google.com/thumbnail?id=1Aqyirc2kAZD4Hgfu_2Nc5NclGqDhpOQq&sz=w1000"} }></IconeJeu>
        </div>
      </div>
      );
}