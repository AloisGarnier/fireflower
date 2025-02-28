import React from "react"
import Highcharts from "highcharts"
import HighchartsReact  from "highcharts-react-official"

import * as cst from "../../constants"

/*
 * Props :
 *  - titre 
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
        tooltip: {
            dateTimeLabelFormats: {
              millisecond: "%A, %b %e, %H:%M:%S.%L",
              second: "%A, %b %e, %H:%M:%S",
              minute: "%A, %b %e, %H:%M",
              hour: "%A, %b %e, %H:%M",
              day: "%e %B %Y",
              week: "Semaine du %e %B %Y",
              month: "%B %Y",
              year: "%Y"
            }
        },
        xAxis: {
            title: {
                text: props.titreX
            },
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: props.titreY
            }
        },
        series: updatedSeries
    }

    return(
        <HighchartsReact 
            containerProps={cst.containerProps()} 
            highcharts={Highcharts} 
            options={options} 
        />
    )
}
