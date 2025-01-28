import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

/*
 * Props :
 *  - domain
 */
export default function NouveauLivre(props) {

    const [title, setTitle] = useState("")

    let navigate = useNavigate();

    const backUrl = props.domain + "/writing/"

    function addBook() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "addBook/" + title, requestOptions)
            .then(setTimeout(function(){navigate(0)},1000))
    }

    return(
        <div class="d-flex flex-row my-3">
            <input type="text" class="form-control" placeholder="Titre" value={title} onChange={event => setTitle(event.target.value)}/>
            <button class="badge rounded-pill bg-info justify-self-end" onClick={() => addBook()}>Valider</button>
        </div>
    )

}