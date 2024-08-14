import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Accordion } from "react-bootstrap";

export default function Commands(props) {

    const [activeStep, setActiveStep] = useState(1);
    const [activeTab, setActiveTab] = useState(["nav-link active", "nav-link", "nav-link"]);

    useEffect(() => clickFirstTab(), []);

    function letterMonth(month) {
        switch(month) {
          case "1":
            return(" janvier ");
          case "2":
            return(" février ");
          case "3":
            return(" mars ");
          case "4":
            return(" avril ");
          case "5":
            return(" mai ");
          case "6":
            return(" juin ");
          case "7":
            return(" juillet ");
          case "8":
            return(" août ");
          case "9":
            return(" septembre ");
          case "10":
            return(" octobre ");
          case "11":
            return(" novembre ");
          case "12":
            return(" décembre ");
        }
      }
    
    function formatDate(date) {
        let year = date.substring(0,4);
        let month = date.substring(5,7)[0] == "0" ? date.substring(6,7) : date.substring(5,7);
        let day = date.substring(8,10)[0] == "0" ? date.substring(9,10) : date.substring(8,10);

        if(day == "1") {
            day = "1er"
        }

        return(day + letterMonth(month) + year);
    }

    function returnDates(activeStep, command) {
        let datesDisplay = []
        
        switch(activeStep){
            case 1:
                datesDisplay.push(
                    <div>
                        Date de commande : {formatDate(command.orderDate)}
                    </div>
                )
                break;
            case 2:
                datesDisplay.push(
                    <div>
                        Date de commande : {formatDate(command.orderDate)}
                    </div>
                )
                datesDisplay.push(
                    <div>
                        Date de réalisation : {formatDate(command.realizationDate)}
                    </div>
                )
                break;
            case 3:
                datesDisplay.push(
                    <div>
                        Date de commande : {formatDate(command.orderDate)}
                    </div>
                )
                datesDisplay.push(
                    <div>
                        Date de réalisation : {formatDate(command.realizationDate)}
                    </div>
                )
                datesDisplay.push(
                    <div>
                        Date de livraison : {formatDate(command.deliveryDate)}
                    </div>
                )
                break;
            default:
                break;
        }

        return datesDisplay
    }

    function returnDecos(command) {
        let decosDisplay = []

        for(let i=0; i<command.commandLines.length; i++) {
            decosDisplay.push(
                <li>
                    {command.commandLines[i].decoration.name} x{command.commandLines[i].quantity}
                </li>
            )
        }

        return(
            <ul>
                {decosDisplay}
            </ul>
        )

    }

    function returnButton(activeStep, command) {
        switch(activeStep){
            case 1:
                return(
                    <Link
                        type="button" 
                        class="btn btn-success"
                        onClick={() => props.realizeCommand(command)}
                    >
                        Commande réalisée !
                    </Link>
                )
            case 2:
                return(
                    <Link
                        type="button" 
                        class="btn btn-success"
                        onClick={() => props.deliverCommand(command)}
                    >
                        Commande envoyée !
                    </Link>
                )
            case 3:
            default:
                break;
        }
    }

    function displayCommands() {

        let commands;
        switch(activeStep){
            case 1:
                commands = props.toDoCommands;
                break;
            case 2:
                commands = props.toDeliverCommands;
                break;
            case 3:
                commands = props.doneCommands;
                break;
            default:
                break;
        }

        // If there is no command
        if(commands.length == 0) {
            let niceDisplay = "";
            switch(activeStep){
                case 1:
                    niceDisplay = "à réaliser";
                    break;
                case 2:
                    niceDisplay = "à envoyer";
                    break;
                case 3:
                    niceDisplay = "réalisée pour le moment";
                    break;
                default:
                    break;
            }
            return(
                <div class="d-flex justify-content-center my-5">Il n'y a aucune commande {niceDisplay}</div>
            )
        }

        let commandsDisplay = [];
        let commandsNumber = 0;
        switch(activeStep){
            case 1:
                commandsNumber = props.toDoCommands.length;
                break;
            case 2:
                commandsNumber = props.toDeliverCommands.length;
                break;
            case 3:
                commandsNumber = props.doneCommands.length;
                break;
            default:
                break;
        }
        for(let i=0; i<commandsNumber; i++) {
            commandsDisplay.push(
                <Accordion.Item eventKey={i}>
                    <Accordion.Header class="accordion-header" id="headingOne">
                            Commande #{commands[i].id}
                    </Accordion.Header>
                    <Accordion.Body id="collapseOne" class="accordion-collapse collapse">
                        <div class="d-flex flex-row justify-content-between align-items-center">
                            <div class="accordion-body">
                                {returnDates(activeStep, commands[i])}
                                <div>
                                    Client : {commands[i].customer.firstName} {commands[i].customer.lastName} <br/>
                                    Adresse : {commands[i].address}
                                </div>
                                <div>
                                    Décorations : <br/>
                                    {returnDecos(commands[i])}
                                </div>
                            </div>
                            <div>
                                {returnButton(activeStep, commands[i])}
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            )
        }  
        
        return(
            <div class="form-group login-form">
                <Accordion alwaysOpen>
                    {commandsDisplay}
                </Accordion>
            </div>
            );
    }


    function clickFirstTab() {
        setActiveStep(1);
        setActiveTab(["nav-link active", "nav-link", "nav-link"]);
    }

    function clickSecondTab() {
        setActiveStep(2);
        setActiveTab(["nav-link", "nav-link active", "nav-link"]);
    }

    function clickThirdTab() {
        setActiveStep(3);
        setActiveTab(["nav-link", "nav-link", "nav-link active"]);
    }

    function getContent() {
        console.log(props.owner)
        if(props.owner && props.owner.id == 1) {
            return(
                <div class="card-body">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <button 
                            class={activeTab[0]} 
                            data-bs-toggle="tab" 
                            onClick={() => clickFirstTab()} 
                            aria-selected="false" 
                            role="tab" 
                            tabindex="-1">
                                A réaliser
                            </button>
                        </li>
                        <li class="nav-item">
                            <button 
                            class={activeTab[1]} 
                            data-bs-toggle="tab" 
                            onClick={() => clickSecondTab()} 
                            aria-selected="true" 
                            role="tab">
                                A envoyer
                            </button>
                        </li>
                        <li class="nav-item">
                            <button 
                            class={activeTab[2]} 
                            data-bs-toggle="tab" 
                            onClick={() => clickThirdTab()} 
                            aria-selected="false" 
                            tabindex="-1" 
                            role="tab">
                                Terminées
                            </button>
                        </li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        {displayCommands()}
                    </div>
                </div>
            )
        } else {
            return(
                <></>
            )
        }
    }

    return(
        <div class="card my-card">
            <h3 class="card-header my-header">Commandes</h3>
            {getContent()}
        </div>
    );

}