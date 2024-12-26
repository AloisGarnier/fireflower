import React from "react";
import { Link } from "react-router-dom";

/*
 * Props :
 *   - jeu
 */ 
export default function IconeJeu(props) {

    return(
        <Link class="item nintendo-link">
            <img src={props.jeu.image}/>
        </Link>
    );
}