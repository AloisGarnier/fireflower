import React from "react";

/*
 * Props :
 *  - titreColonnes
 *  - donnees (tableau de tableau = [[...], [...], [...], ...])
 *  - headStyle
 */
export default function TableRecap(props) {

    function populateHead() {
        var heads = []
        var style = props.headStyle ?? "table-primary"
        for(var i=0; i<props.titreColonnes.length; i++) {
            heads.push(<th scope="col" class={style}>{props.titreColonnes[i]}</th>)
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

    return(
        <table class="table table-hover my-3">
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