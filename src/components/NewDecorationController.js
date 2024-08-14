import React from "react";

import NewDecoration from "./NewDecoration";

export default function NewDecorationController(props) {

    const backUrl = props.domain + "/catalog/";

    function addNewDecoration(name, picture1, picture2, picture3, description, price, preparationDelay, weight, dimensions, tag1, tag2, tag3) {
        let tempTags = [tag1, tag2, tag3];
        let tempTags2 = [];
        for(let i=0;i<3;i++) {
            if(tempTags[i]) {
                tempTags2.push(tempTags[i]);
            }
        }

        let tempPics = [picture1, picture2, picture3];
        let tempPics2 = [];
        for(let i=0;i<3;i++) {
            if(tempPics[i]) {
                tempPics2.push(tempPics[i]);
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                pictures: tempPics2, 
                description: description, 
                preparationDelay: preparationDelay,
                weight: weight,
                dimensions: dimensions,
                price: price,
                tags: tempTags2
            })
        }
        fetch(backUrl + "create", requestOptions)
            .then(response => response.json())
    }

    return(
        <NewDecoration
            owner = {props.owner}
            addNewDecoration={addNewDecoration}
        />
    );

}