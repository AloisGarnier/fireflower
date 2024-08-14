import React from "react";

export default function Stats(props) {

    function populateTable() {
        console.log(props.recap.length)
        var tableRows = []
        for(var i=0; i<props.recap.length; i++) {
            var deco = props.recap[i]
            tableRows.push(
                <tr class="table-default">
                    <th scope="row">{deco.name}</th>
                    <td>{deco.views}</td>
                    <td>{deco.commands}</td>
                    <td>{deco.evaluations}</td>
                    <td>{deco.averageRating.toFixed(2)}</td>
                    <td>{deco.favourites}</td>
                </tr> 
            )
        }
        return tableRows;
    }

    return(
        <table class="table table-hover m-2 mytable">
            <thead>
                <tr class="table-info">
                <th scope="col" class="w-25 text-align-center">Décoration</th>
                <th scope="col" class="width15 text-align-center">Vues</th>
                <th scope="col" class="width15 text-align-center">Commandes</th>
                <th scope="col" class="width15 text-align-center">Evaluations (nombre)</th>
                <th scope="col" class="width15 text-align-center">Note (moyenne)</th>
                <th scope="col" class="width15 text-align-center">Favoris</th>
                </tr>
            </thead>
            <tbody>
                {populateTable()}
            </tbody>
        </table>
    );

}