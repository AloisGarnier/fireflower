import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

export default function Signup(props) {

    function getDate() {
        let options = [];

        for(let i=1; i < 32; i++) {
            options.push(<option value={i}>{i}</option>)
        }
        
        return options;

    }

    function getYear() {
        let options = [];

        for(let i=2023; i > 1923; i--) {
            options.push(<option value={i}>{i}</option>)
        }
        
        return options;

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

    function noFirstName() {
        if(props.noFirstName) {
            return(
                <div class="d-flex justify-content-end mt-2 mb-0 ">
                    <div class="text-danger align-self-center vertical-align-middle">
                        Merci de renseigner votre prénom&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
            </div>
            );
        }
    }

    function noLastName() {
        if(props.noLastName) {
            return(
                <div class="d-flex justify-content-end mt-2 mb-0 ">
                    <div class="text-danger align-self-center vertical-align-middle">
                        Merci de renseigner votre nom de famille&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
            );
        }
    }

    function wrongEmail() {
        if(props.wrongEmail) {
            return(
                <div class="d-flex justify-content-end mt-2 mb-0 ">
                    <div class="text-danger align-self-center vertical-align-middle">
                        Merci de renseigner une adresse e-mail valide&nbsp;
                    </div>
                </div>
            );
        }
    }

    function wrongPassword() {
        if(props.wrongPassword) {
            return(
                <div class="d-flex justify-content-end mt-2 mb-0 ">
                    <div class="text-danger align-self-center vertical-align-middle">
                        Merci de choisir un mot de passe composé de :
                        <ul>
                            <li>8 caractères minimum</li>
                            <li>au moins 1 chiffre</li>
                            <li>au moins 1 caractère spécial</li>
                        </ul>
                    </div>
                </div>
            );
        }
    }

    function alreadyExists() {
        if(props.alreadyExists) {
            return(
                <div class="d-flex justify-content-end mt-2 mb-0 ">
                    <div class="text-danger align-self-center vertical-align-middle">
                        Un compte utilise déjà cette adresse e-mail.
                        <br/>Merci de choisir une autre adresse ou de nous contacter.
                    </div>
                </div>
            );
        }
    }

    const signupSchema = Yup.object().shape({

        firstName: Yup.string().required('Champ obligatoire'),
        lastName: Yup.string().required('Champ obligatoire'),
        streetNumber: Yup.string().required('Champ obligatoire'),
        street: Yup.string().required('Champ obligatoire'),
        city: Yup.string().required('Champ obligatoire'),
        zipCode: Yup.string().required('Champ obligatoire'),
        email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
        password: Yup.string().required('Champ obligatoire'),
     
      });

    const signupForm = () => {

        return(
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    date: '',
                    month: '',
                    year: '',
                    streetNumber: '',
                    street: '',
                    city: '',
                    zipCode: '',
                    email: '',
                    password: ''
                }}
                validationSchema={signupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <label>Informations générales</label>
                        <div class="d-flex flex-direction-row ">
                            <div class="form-floating me-3 mb-3 w-50">
                                <Field name="firstName" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">Prénom</label>
                                {errors.firstName && touched.firstName ? (<div class="error">{errors.firstName}</div>) : null}
                            </div>
                            <div class="form-floating mb-3 w-50">
                                <Field name="lastName" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">Nom</label>
                                {errors.lastName && touched.lastName ? (<div class="error">{errors.lastName}</div>) : null}
                            </div>
                        </div>

                        <div class="form-floating mb-3">
                            <Field name="phoneNumber" type="label" class="form-control" />
                            <label for="floatingInput" class="always-grey">Numéro de téléphone (facultatif mais conseillé)</label>
                            {errors.phoneNumber && touched.phoneNumber ? (<div class="error">{errors.phoneNumber}</div>) : null}
                        </div>

                        <div class="form-floating mb-3">
                            <Field name="email" type="email" class="form-control" />
                            <label for="floatingInput" class="always-grey">Adresse e-mail</label>
                            {errors.email && touched.email ? (<div class="error">{errors.email}</div>) : null}
                        </div>

                        <div class="form-floating mb-3">
                            <Field name="password" type="password" class="form-control" />
                            <label for="floatingInput" class="always-grey">Mot de passe (plus de 8 caractères, dont au moins 1 chiffre et 1 caractère spécial)</label>
                            {errors.password && touched.password ? (<div class="error">{errors.password}</div>) : null}
                        </div>

                        <label>Date de naissance (facultatif)</label>
                        <div class="d-flex flex-direction-row ">
                            
                            <div class="form-floating me-3 mb-3 w-25">
                                <Field name="date" as="select" class="form-select">
                                    {getDate()}
                                </Field>
                                <label for="floatingInput" class="always-grey">Jour</label>
                            </div>
                            <div class="form-floating me-3 mb-3 w-50">
                                <Field name="month" as="select" class="form-select">
                                    <option value="1">Janvier</option>
                                    <option value="2">Février</option>
                                    <option value="3">Mars</option>
                                    <option value="4">Avril</option>
                                    <option value="5">Mai</option>
                                    <option value="6">Juin</option>
                                    <option value="7">Juillet</option>
                                    <option value="8">Août</option>
                                    <option value="9">Septembre</option>
                                    <option value="10">Octobre</option>
                                    <option value="11">Novembre</option>
                                    <option value="12">Décembre</option>
                                </Field>
                                <label for="floatingInput" class="always-grey">Mois</label>
                            </div>
                            <div class="form-floating mb-3 w-25">
                                <Field name="year" as="select" class="form-select">
                                    {getYear()}
                                </Field>
                                <label for="floatingInput" class="always-grey">Année</label>
                            </div>
                            
                        </div>

                        <label>Adresse de livraison</label>
                        <div class="d-flex flex-direction-row ">
                            <div class="form-floating mb-3 me-3 w-25">
                                <Field name="streetNumber" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">Numéro</label>
                                {errors.streetNumber && touched.streetNumber ? (<div class="error">{errors.streetNumber}</div>) : null}
                            </div>
                            <div class="form-floating mb-3 w-75">
                                <Field name="street" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">Rue</label>
                                {errors.street && touched.street ? (<div class="error">{errors.street}</div>) : null}
                            </div>
                        </div>
                        <div class="d-flex flex-direction-row">
                            <div class="form-floating mb-3 me-3 w-50">
                                <Field name="zipCode" type="label" class="form-control" />
                                <label for="zipCode" class="always-grey">Code postal</label>
                                {errors.zipCode && touched.zipCode ? (<div class="error">{errors.zipCode}</div>) : null}
                            </div>
                            <div class="form-floating mb-3 w-50">
                                <Field name="city" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">Ville</label>
                                {errors.city && touched.city ? (<div class="error">{errors.city}</div>) : null}
                            </div>
                        </div>

                        <div class="d-flex flex-column justify-self-right mt-2 mb-0">
                            {noFirstName()}
                            {noLastName()}
                            {wrongEmail()}
                            {wrongPassword()}
                            {alreadyExists()}
                        </div>
                         
                        <div class="m-2 d-flex justify-content-end">
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                onClick={() => props.addCustomer(values.firstName, 
                                                    values.lastName, 
                                                    values.email, 
                                                    values.password,
                                                    values.date,
                                                    values.month,
                                                    values.year,
                                                    values.phoneNumber)}
                            >
                                Valider
                            </Link>
                        </div>
                    </Form>
                )}  
            </Formik>
        );
    }


    return (
        <div class={cardClass()}>
            <h3 class="card-header my-header">Créer un compte</h3>
            <div class="card-body">
                <div class="form-group login-form">
                    {signupForm()}
                </div>
            </div>
        </div>
        
    );
}