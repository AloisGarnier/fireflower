import React from "react"
import Highcharts from "highcharts"
import HighchartsReact  from "highcharts-react-official"

/*
 * Props :
 *  - titre 
 *  - titreX (titre de l'axe X)
 *  - titreY (titre de l'axe Y)
 *  - titreSeries (titres des series)
 *  - donneeSeries (donnees des series)
 */
export default function StackedAreaChart(props) {

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
            chart: {
                type: 'area'
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    stickyTracking: false,
                    trackByArea: true
                }
            },
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

        function maxWidth() {
            if(window.innerWidth >= 600) {
                return "600px"
            }
            return "300px"
        }
    
        return(
            <HighchartsReact containerProps={{ style: { width: maxWidth() } }} highcharts={Highcharts} options={options} />
        )
}