import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import * as cst from "../constants"
import AdaptableInputs from "./AdaptableInputs"

/*
 * Props :
 *   - selectedDay
 */ 
export default function FormulaireQuotidien(props) {

    function displayDate() {

    }

    return(
        <div>
            <Formik
                enableReinitialize
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
                initialValues={{
                    name: '',
                    picture1: '',
                    picture2: '',
                    picture3: '',
                    picture4: '',
                    picture5: '',
                    picture6: '',
                    model1: '',
                    model2: '',
                    model3: '',
                    model4: '',
                    model5: '',
                    model6: '',
                    description: '',
                    price: '',
                    preparationDelay: '',
                    weight: '',
                    dimensions: '',
                    tag1: '',
                    tag2: '',
                    tag3: '',
                    ecriture: ''
                }}
            >
            {({ errors, touched, values }) => (
                <Form>
                <h3 class="card-header my-header">
                    <label for="floatingInput" class="white-text">{cst.displayDate(props.selectedDay)}</label>
                    <Field name="name" type="label" class="form-control" />
                </h3>
                <div class="card-body d-flex flex-column">
                    <div class="mb-3">
                        <label for="floatingInput" class="white-text">Ecriture</label>  
                        <div class="input-group">
                                <Field name="ecriture" type="label" class="form-control"/>
                                <span class="input-group-text">mots</span>
                        </div>               
                    </div>
                    <AdaptableInputs label="test"/>
                    <div class="form-floating mb-3">
                            <Field name="description" type="label" class="form-control my-textarea" component="textarea"/>
                            <label for="floatingInput" class="always-grey">Description</label>
                    </div>
                    <div class="form-floating mb-3 d-flex flex-row justify-content-around">
                        <div class="d-flex flex-column w-25">
                            <label for="floatingInput" class="always-grey">Poids</label>
                            <div class="input-group">
                                <Field name="weight" type="label" class="form-control"/>
                            </div>
                        </div>
                        <div class="d-flex flex-column w-25">
                            <label for="floatingInput" class="always-grey">Dimensions</label>
                            <div class="input-group">
                                <Field name="dimensions" type="label" class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-floating mb-3 d-flex flex-row justify-content-around">
                        <div class="d-flex flex-column w-25">
                            <label for="floatingInput" class="always-grey">Prix</label>
                            <div class="input-group">
                                <Field name="price" type="label" class="form-control"/>
                                <span class="input-group-text">€</span>
                            </div>
                        </div>
                        <div class="d-flex flex-column w-25">
                            <label for="floatingInput" class="always-grey">Temps de préparation</label>
                            <div class="input-group">
                                <Field name="preparationDelay" type="label" class="form-control"/>
                                <span class="input-group-text">jours</span>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="floatingInput" class="always-grey">Tags</label>  
                        <div class="d-flex flex-row">
                            <Field name="tag1" type="label" class="form-control"/>
                            <Field name="tag2" type="label" class="form-control"/>
                            <Field name="tag3" type="label" class="form-control"/>
                        </div>                      
                    </div>
                    <div class="mb-3">
                        <label for="floatingInput" class="always-grey">Modèles</label>  
                        <div class="d-flex flex-row">
                            <Field name="model1" type="label" class="form-control"/>
                            <Field name="model2" type="label" class="form-control"/>
                            <Field name="model3" type="label" class="form-control"/>
                        </div>       
                        <div class="d-flex flex-row">
                            <Field name="model4" type="label" class="form-control"/>
                            <Field name="model5" type="label" class="form-control"/>
                            <Field name="model6" type="label" class="form-control"/>
                        </div>                    
                    </div>
                    <div class="m-2 d-flex justify-content-end">
                        <Link to="/catalogue" type="button" class="btn btn-warning">Annuler</Link>
                        <Link
                            type="button" 
                            class="btn btn-success"
                        >
                                Valider
                        </Link>
                    </div>
                </div>
                </Form>
                )} 
            </Formik>
        </div>
    )
}