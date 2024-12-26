import React, {useState} from "react";
import { Link } from "react-router-dom";

/*
 * Props :
 *   - option
 */ 
export default function OptionMenu(props) {

    const [isExpanded, setExpanded] = useState(false);
    
    function souspropositions() {
        let sousprop = []
        if(props.option.sousoptions.length > 0 && isExpanded) {
            for(var i=0; i<props.option.sousoptions.length; i++) {
                sousprop.push(
                    <div class="nav-item nav-sub-link">
                        <a class="nav-link">{props.option.sousoptions[i].nom}</a> 
                    </div>
                )
            }
        }
        return sousprop
    }

    function chevron() {
        if(isExpanded) {
            return(
                <i class="fa-solid fa-chevron-right me-2 chevron"></i>
            )
        } else {
            return(
                <i class="fa-solid fa-chevron-down me-2"></i>
            )
        }
    }

    return(
        <>
            <div class="nav-item">
                <a class="nav-link" onClick={() => setExpanded(!isExpanded)}>{chevron()}{props.option.nom}</a>
            </div>
            {souspropositions()}
        </>
    );

}