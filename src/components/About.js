import React, {useState} from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function About(props) {

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card my-card"
        }

        if(props.isLightTheme) {
            return "card light-card my-card"
        }
        
        return "card dark-card my-card"
    }

    function displayAbout() {

        let whatAbout = [];

        if (props.owner && props.owner.id == 1) {
            whatAbout.push(
                <Formik
                    enableReinitialize
                    initialValues={{
                        about: props.about
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <Field name="about" type="label" class="form-control" component="textarea" />
                        <Link 
                            type="button" 
                            class="btn btn-warning"
                            onClick={() => props.modifyAbout(values.about)}
                        >
                            Modifier
                        </Link>
                    </Form>
                )}  
            </Formik>
            )
        } else {
            whatAbout.push(
                <div class="d-flex flex-row flex-wrap justify-content-center">
                    {props.about}
                </div>
                );
        }

        return whatAbout;
    }

    return(
        <>
      <Helmet>
      <title>A propos - Mille Arts</title>
        <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
        <meta property="og:title" content="Mille Arts" />
        <meta property="og:description" content="Venez dans ma boutique en-ligne pour acheter plein d'objets décoratifs" />
        <meta property="og:url" content="https://mille-arts.fr/" />
        <meta property="og:type" content="website" />
      </Helmet>
            <div class={cardClass()}>
                <h3 class="card-header my-header">Qui suis-je ?</h3>
                <div class="card-body">
                    <div class="form-group login-form">
                        {displayAbout()}
                    </div>
                    <div class="m-2 d-flex justify-content-center">
                        <Link to="/cgv" type="button" class="btn btn-info">Conditions générales de vente</Link>
                        <Link to="/mentions-legales" type="button" class="btn btn-secondary">Mentions légales</Link>
                    </div>
                </div>
            </div>
        </>
    )

}