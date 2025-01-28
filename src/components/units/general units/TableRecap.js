import React from "react";

/*
 * Props :
 *  - titreColonnes
 *  - donnees (tableau de tableau = [[...], [...], [...], ...])
 */
export default function TableRecap(props) {

    function populateHead() {
        var heads = []
        for(var i=0; i<props.titreColonnes.length; i++) {
            heads.push(<th scope="col">{props.titreColonnes[i]}</th>)
        }
        return heads
    }

    function populateBody() {
        var body = []
        for(var i=0; i<props.donnees.length;i++) {
            var row = []
            for(var j=0; j<props.donnees[i].length; j++) {
                row.push(<td>{props.donnees[i][j]}</td>)
            }
            body.push(<tr>{row}</tr>)
        }
        return body
    }

    return(<table class="table table-hover my-3">
                <thead>
                    <tr>
                        {populateHead()}
                    </tr>
                </thead>
                <tbody>
                    {populateBody()}
                </tbody>
            </table>)
}