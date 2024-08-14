import React, {useState, useEffect} from "react";

export default function CommandsInfo(props) {
    let commands = [];
    const [commandsDisplay, setCommandsDisplay] = useState([]);

    useEffect(() => fetchAllCommands(), []);

    const backUrl = props.domain + "/commands/";

    function fetchAllCommands() {
        fetch(backUrl + props.owner.id + "/all")
            .then(response => response.json())
            .then(json => displayCommands(json));
    }

    function displayCommands(json) {
        commands = json;
        let commandsDisplayTemp = [];
        if(commands.length == 0) {
            commandsDisplayTemp.push(
                <div class="empty-basket">Vous n'avez passé aucune commande jusqu'à présent...</div>
            );
        }
        for(let i=0; i<commands.length; i++) {
            commandsDisplayTemp.push(
                    <div class="d-flex flex-row justify-content-left card my-3">
                        <span class="mx-5 my-3">
                            Commande n° {commands[i].id} en date du {commands[i].orderDate} <br />
                            {itemsInCommand(commands[i])}
                        </span>
                    </div>
            );
        }
        setCommandsDisplay(commandsDisplayTemp);
    }

    function itemsInCommand(command) {
        let items = [];
        for(let j=0; j<command.commandLines.length; j++) {
            items.push(
                <div>
                    {command.commandLines[j].quantity}x {command.commandLines[j].decoration.name}
                </div>
            );
        }
        return items;
    }

    return(
        <div class="d-grid justify-content-center my-3 always-black">
            {commandsDisplay}
        </div>
    );
}