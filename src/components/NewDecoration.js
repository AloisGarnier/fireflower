import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

export default function NewDecoration(props) {

    function displayCard() {
        if(props.owner && props.owner.id == 1) {
            return(
            <div class="card my-card">
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: "",
                        picture1: "",
                        picture2: "",
                        picture3: "",
                        description: "",
                        price: "",
                        preparationDelay: "",
                        weight: "",
                        dimensions: "",
                        tag1: "",
                        tag2: "",
                        tag3: ""
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h3 class="card-header my-header">
                        <label for="floatingInput">Titre</label>
                        <Field name="name" type="label" class="form-control" />
                    </h3>
                    <div class="card-body d-flex flex-column">
                        <div class="form-floating mb-3">
                                <Field name="picture1" type="label" class="form-control" />
                                <label for="floatingInput">URL de l'image n°1</label>
                        </div>
                        <div class="form-floating mb-3">
                                <Field name="picture2" type="label" class="form-control" />
                                <label for="floatingInput">URL de l'image n°2</label>
                        </div>
                        <div class="form-floating mb-3">
                                <Field name="picture3" type="label" class="form-control" />
                                <label for="floatingInput">URL de l'image n°3</label>
                        </div>
                        <div class="form-floating mb-3">
                                <Field name="description" type="label" class="form-control my-textarea" component="textarea"/>
                                <label for="floatingInput">Description</label>
                        </div>
                        <div class="form-floating mb-3 d-flex flex-row justify-content-around">
                            <div class="d-flex flex-column w-25">
                                <label for="floatingInput">Poids</label>
                                <div class="input-group">
                                    <Field name="weight" type="label" class="form-control"/>
                                </div>
                            </div>
                            <div class="d-flex flex-column w-25">
                                <label for="floatingInput">Dimensions</label>
                                <div class="input-group">
                                    <Field name="dimensions" type="label" class="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div class="form-floating mb-3 d-flex flex-row justify-content-around">
                            <div class="d-flex flex-column w-25">
                                <label for="floatingInput">Prix</label>
                                <div class="input-group">
                                    <Field name="price" type="label" class="form-control"/>
                                    <span class="input-group-text">€</span>
                                </div>
                            </div>
                            <div class="d-flex flex-column w-25">
                                <label for="floatingInput">Temps de préparation</label>
                                <div class="input-group">
                                    <Field name="preparationDelay" type="label" class="form-control"/>
                                    <span class="input-group-text">jours</span>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="floatingInput">Tags</label>  
                            <div class="d-flex flex-row">
                                <Field name="tag1" type="label" class="form-control"/>
                                <Field name="tag2" type="label" class="form-control"/>
                                <Field name="tag3" type="label" class="form-control"/>
                            </div>                      
                        </div>
                        <div class="m-2 d-flex justify-content-end">
                            <Link to="/catalogue" type="button" class="btn btn-warning">Annuler</Link>
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                to="/catalogue"
                                onClick={() => props.addNewDecoration(
                                    values.name, 
                                    values.picture1, 
                                    values.picture2,
                                    values.picture3,
                                    values.description, 
                                    values.price, 
                                    values.preparationDelay,
                                    values.weight,
                                    values.dimensions,
                                    values.tag1,
                                    values.tag2,
                                    values.tag3
                                    )}
                            >
                                    Valider
                            </Link>
                        </div>
                    </div>
                    </Form>
                    )} 
                </Formik>
            </div>); 
        }
    }

    return(<>{displayCard()}</>);
}