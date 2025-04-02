import React, { useState, useEffect } from "react"

import TableRecap from "../../units/generalUnits/TableRecap"
import DeleteButton from "../../units/generalUnits/DeleteButton"
import SaveButton from "../../units/generalUnits/SaveButton"

export default function RomanRecap(props) {

    const [books, setBooks] = useState([])
    const [title, setTitle] = useState("")
    const [hasChanged, setHasChanged] = useState(false)

    const backUrl = props.domain + "/writing/"

    useEffect(() => fetchBooks(), [])
    useEffect(() => fetchBooks(), [hasChanged])

    function refresh() {
        setTimeout(function(){setHasChanged(bool => !bool)},1000)
    }

    function processBooks(json) {
        var newBooks = []
        for(var i=0; i<json.length; i++) {
            newBooks.push({value: json[i].id, label: json[i].title, words: json[i].currentWords})
        }
        setBooks(newBooks)
    }

    function fetchBooks() {
        fetch(backUrl + "books")
            .then(response => response.json())
            .then(json => processBooks(json))
    }

    function addBook() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "addBook/" + title, requestOptions)
            .then(() => refresh())
    }

    function deleteBook(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(backUrl + "deleteBook/" + id, requestOptions)
            .then(() => refresh())
    }

    function bookTable() {
        let bookData = []
        for(let i=0; i<books.length; i++) {
            bookData.push([books[i].label, 
                           books[i].words ?? "0", 
                           <DeleteButton deleteFunction={() => deleteBook(books[i].value)} />])        
                        }
        bookData.push(            
            [<input type="text" class="form-control" placeholder="Titre" value={title} onChange={event => setTitle(event.target.value)}/>,
            "",
            <SaveButton saveFunction={addBook}/>]
        )
        return bookData
    }

    return(
        <div class="d-flex flex-column align-self-center align-items-center justify-items-center mx-5">
            <TableRecap 
                titreColonnes={["Titre", "Nombre de mots", ""]}
                donnees={bookTable()}
            />
        </div>        
    )
}

