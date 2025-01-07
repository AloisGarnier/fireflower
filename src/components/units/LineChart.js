import React from "react"
import Highcharts from "highcharts"
import HighchartsReact  from "highcharts-react-official"

/*
 * Props :
 *  - titre 
 *  - catX (nom des catégories sur l'axe X)
 *  - titreX (titre de l'axe X)
 *  - titreY (titre de l'axe Y)
 *  - titreSeries (titres des series)
 *  - donneeSeries (donnees des series)
 */
export default function LineChart(props) {

    var updatedSeries = []
    for(var i=0; i<props.donneeSeries.length; i++) {
        updatedSeries.push(
            {
                name: props.titreSeries[i],
                data: props.donneeSeries[i]
            }
        )
    }

    const options = {
        title: {
            text: props.titre
        },
        xAxis: {
            categories: props.catX,
            title: {
                text: props.titreX
            }
        },
        yAxis: {
            title: {
                text: props.titreY
            }
        },
        series: updatedSeries
    }

    return(
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}
