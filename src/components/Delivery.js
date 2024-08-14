import React, {useState, useEffect} from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import favicon from '../img/favicon.png'

export default function Delivery(props) {

    const [addresses, setAddresses] = useState([]);

    useEffect(() => fetchAllAddresses(), []);

    const backUrl = props.domain + "/addresses/";
    const paypalUrl = props.domain + "/paypal/";

    function fetchAllAddresses() {
        fetch(backUrl + props.owner.id + "/all")
            .then(response => response.json())
            .then(json => setAddresses(json));
    }

    function addressChoice() {

        let addressesDisplay = [];
        for(let i=0; i<addresses.length; i++) {
            addressesDisplay.push(                            
            <div class="d-flex flex-row m-2 align-items-center">
                <div class="me-5">
                    <Field type="radio" name="picked" value={String(i)} />
                </div>
                <div>
                    {addresses[i].name} <br />
                    {addresses[i].streetNumber} {addresses[i].street} <br />
                    {addresses[i].city.zipCode} {addresses[i].city.name} <br />
                </div>
            </div>);
        }

        return(
            <Formik
                initialValues={{
                    picked: '0',
                }}
                >
                {({ values }) => (
                    <Form>
                        <h4 id="my-radio-group" class="my-header">Choix de l'adresse de livraison :</h4>
                        <div role="group" aria-labelledby="my-radio-group" class="d-flex flex-column">
                            {addressesDisplay}
                        </div>
                    </Form>
                )}
                </Formik>
        );

    }

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card my-card basket-card"
        }

        if(props.isLightTheme) {
            return "card light-card my-card basket-card"
        }
        
        return "card dark-card my-card basket-card"
    }

    function getTotal() {
        let totalPrice = 0;
        
        for(let i=0; i < props.basket.length; i++) {

            let deco = props.basket[i][0];
            let quantity = props.basket[i][1];

            let currentPrice = 0;
            for(let i = 0; i < deco.decorationPrices.length; i++) {
                if(deco.decorationPrices[i].withdrawalPrice == null) {
                    currentPrice = deco.decorationPrices[i].price.amount;
                }
            }
            totalPrice += currentPrice*quantity;
            
        }

        return(totalPrice.toFixed(2));
    }

    function createOrder() {
        return fetch(paypalUrl + "init", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: getTotal()
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }

    function onApprove(data) {
        console.log("data : " + data.orderID)
          return fetch(paypalUrl + "capture", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then(() => window.location.href = '/catalogue')

    }

    const initialOptions = {
        "client-id": "AX9eCDEYeb4nkJLqlCJEGVgwo7oWtGy-AGG-UH7FNmuwPNBanNfz-9mSuW1NJeljitE3ZMjRVnZxZB8K",
        "enable-funding": "venmo,card",
        "disable-funding": "paylater",
        "data-sdk-integration-source": "integrationbuilder_sc",
        currency: "EUR",
    };

    return(
    <div class={cardClass()}>
        <Helmet>
                <title>Livraison et paiement - Mille Arts</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Options de livraison" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
        </Helmet>
        <h3 class="card-header my-header">Livraison et paiement</h3>
        <div class="card-body d-flex flex-row justify-content-center">
            <div class="d-flex flex-column justify-content-center">
                La livraison en France métropolitaine est offerte ! <br/>
                Si vous habitez hors de France, merci de nous contacter avant toute commande. <br/>
                <div class="m-5">
                    {addressChoice()}
                </div>
            </div>

            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{shape: "pill",
                            layout: "vertical",}}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
        </div>
    </div>
    )
}