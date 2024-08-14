import React, { useState } from "react";

import AccountInfo from "./AccountInfo";
import AddressesInfo from "./AddressesInfo";
import CommandsInfo from "./CommandsInfo";

export default function MyAccount(props) {

    const [activeTab, setActiveTab] = useState(["nav-link active", "nav-link", "nav-link"]);
    const [body, setBody] = useState(<AccountInfo 
        owner={props.owner} 
        setOwner={props.setOwner} 
        changeCustomer={props.changeCustomer} 
        domain={props.domain}
    />);

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
            <AccountInfo 
                owner={props.owner} 
                setOwner={props.setOwner} 
                changeCustomer={props.changeCustomer} 
                domain={props.domain}
            />
        );
    }

    function clickSecondTab() {
        setActiveTab(["nav-link", "nav-link active", "nav-link"]);
        setBody(
            <AddressesInfo 
                owner={props.owner}
                domain={props.domain}
            />
        );
    }

    function clickThirdTab() {
        setActiveTab(["nav-link", "nav-link", "nav-link active"]);
        setBody(
            <CommandsInfo
                owner={props.owner}
                domain={props.domain}
            />
        )
    }

    return(
        <div class={cardClass()}>
            <h3 class="card-header my-header">Votre compte</h3>
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
                            Informations personnelles
                        </button>
                    </li>
                    <li class="nav-item">
                        <button 
                        class={tabClass(activeTab[1])} 
                        data-bs-toggle="tab" 
                        onClick={() => clickSecondTab()} 
                        aria-selected="true" 
                        role="tab">
                            Vos adresses
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
                            Historique de commandes
                        </button>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    {props.owner ? body : ""}
                </div>
            </div>
        </div>
    );
}