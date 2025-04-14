import React, { useState, useEffect } from "react"
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import ItemSeries from 'highcharts/modules/item-series';

export default function Elections(props) {

    const [liste1, setListe1] = useState(0)
    const [liste2, setListe2] = useState(0)

    const [result, setResult] = useState([])

    useEffect(() => displayResult(), [])
    useEffect(() => displayResult(), [liste1])
    useEffect(() => displayResult(), [liste2])

    function calculateSeats() {
        //Calcul de la prime majoritaire
        if(parseInt(liste1) >= parseInt(liste2)) {
            var resultat = [6, 0]
        } else {
            var resultat = [0, 6]
        }
        var remainingSeats = 5

        //Répartition des premiers sièges
        let total = parseInt(liste1)+parseInt(liste2)
        let temp1 = Math.floor(5*liste1/total)
        let temp2 = Math.floor(5*liste2/total)
        remainingSeats -= temp1
        remainingSeats -= temp2
        resultat[0] += temp1
        resultat[1] += temp2

        //Répartition des derniers sièges
        while(remainingSeats > 0) {
            var calc1 = liste1/(temp1 + 1)
            var calc2 = liste2/(temp2 + 1)
            if(calc1 > calc2 || (calc1 == calc2 && remainingSeats > 1)) {
                resultat[0]++
                temp1++
            } else if(calc1 < calc2){
                resultat[1]++
                temp2++
            } else {
              resultat.push(1)
            }
            remainingSeats--
        }

        return resultat
    }

    function populateData() {
        var resultat = calculateSeats()
        if(resultat.length == 2) {
          return [["Liste 1", liste1, "#5D8A3E", resultat[0]], ["Liste 2", liste2, "#723E64", resultat[1]]]
        } 
        if(resultat.length == 3) {
          return [["Liste 1", liste1, "#5D8A3E", resultat[0]], ["Égalité (attribué au plus âgé)", 0, "#d3d3d3", resultat[2]], ["Liste 2", liste2, "#723E64", resultat[1]]]
        }
    }

    function displayResult() {

        const options = {
  
          chart: {
            type: 'item',
            backgroundColor: 'white'
          },
  
          title: {
            text: 'Sièges au conseil municipal de Merry-sur-Yonne'
          },
        
          legend: {
            labelFormat: '{label} <span style="opacity: 0.4">{y}</span>'
          },
        
          series: [{
            name: 'Conseillers municipaux',
            keys: ['label', 'score', 'color', 'y'],
            data: populateData(),
            dataLabels: {
              enabled: true,
              format: '{point.label}'
            },
        
            // Circular options
            center: ['50%', '88%'],
            size: '170%',
            startAngle: -100,
            endAngle: 100
          }]
        }
  
          setResult(
            <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
          )
      }
    
    return(
        <div class="d-flex flex-column w-50">
            <div class="d-flex flex-row white-text align-items-center mb-2">
                <label class="me-3 min-w-33">Liste 1 : </label>
                <input type="number" class="form-control" value={liste1} onChange={event => setListe1(event.target.value)}/>
            </div>
            <div class="d-flex flex-row white-text align-items-center mb-5">
                <label class="me-3 min-w-33">Liste 2 : </label>
                <input type="number" class="form-control" value={liste2} onChange={event => setListe2(event.target.value)}/>
            </div>
            <div>
                {result}
            </div>
        </div>
    )
}