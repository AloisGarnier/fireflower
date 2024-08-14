import React, { useState, useEffect } from "react";

import StatsTable from "./StatsTable";

export default function Stats(props) {

    const [activeTab, setActiveTab] = useState(["nav-link active", "nav-link", "nav-link"]);
    const [body, setBody] = useState([]);

    function tabClass(t) {
        if(props.isChristmas) {
            return t + " christmas-tab"
        }

        if(props.isLightTheme) {
            return t + " light-tab"
        }
        
        return t + " dark-tab"
    }

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card my-card"
        }

        if(props.isLightTheme) {
            return "card light-card my-card"
        }
        
        return "card dark-card my-card"
    }

    function clickFirstTab() {
        setActiveTab(["nav-link active", "nav-link", "nav-link"]);
        setBody(
            <StatsTable 
                recap={props.recap}
            />
        );
    }

    function clickSecondTab() {
        setActiveTab(["nav-link", "nav-link active", "nav-link"]);
        setBody(
            <></>
        );
    }

    function clickThirdTab() {
        setActiveTab(["nav-link", "nav-link", "nav-link active"]);
        setBody(
            <></>
        )
    }

    function wrongSolution() {
        if(body.length == 0) {
            return(<StatsTable 
                recap={props.recap}
            />)
        }
    }

    return(
        <div class={cardClass()}>
            <h3 class="card-header my-header">Statistiques et gestion</h3>
            <div class="card-body">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button 
                        class={tabClass(activeTab[0])} 
                        data-bs-toggle="tab" 
                        onClick={() => clickFirstTab()} 
                        aria-selected="false" 
                        role="tab" 
                        tabindex="-1">
                            Récapitulatif général
                        </button>
                    </li>
                    <li class="nav-item">
                        <button 
                        class={tabClass(activeTab[1])} 
                        data-bs-toggle="tab" 
                        onClick={() => clickSecondTab()} 
                        aria-selected="true" 
                        role="tab">
                            En cours
                        </button>
                    </li>
                    <li class="nav-item">
                        <button 
                        class={tabClass(activeTab[2])} 
                        data-bs-toggle="tab" 
                        onClick={() => clickThirdTab()} 
                        aria-selected="false" 
                        tabindex="-1" 
                        role="tab">
                            En cours
                        </button>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    {body}
                    {wrongSolution()}
                </div>
            </div>
        </div>
    );

}