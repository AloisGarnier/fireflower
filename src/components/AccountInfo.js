import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

export default function AccountInfo(props) {

    const backUrl = props.domain + "/security";

    function logOut() {
        props.setOwner(undefined);
        window.localStorage.removeItem("owner");
    }

    function cancel() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(backUrl + "/unsubscribe/" + props.owner.id, requestOptions)
            .then(response => response.json());
        
        props.setOwner(undefined);
        window.localStorage.removeItem("owner");
    }

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

    function bottomButtons() {
        if(props.owner && props.owner.id == 1) {
            return(
                <div class="m-2 d-flex justify-content-center">
                    <Link 
                        type="button" 
                        class="btn btn-warning"
                        to="/catalogue"
                        onClick={() => logOut()}
                    >
                        Se déconnecter
                    </Link>
                </div>
            );
        } else {
            return(
                <div class="m-2 d-flex justify-content-center">
                    <Link 
                        type="button" 
                        class="btn btn-warning"
                        to="/catalogue"
                        onClick={() => logOut()}
                    >
                        Se déconnecter
                    </Link>

                    <Link 
                        type="button" 
                        class="btn btn-danger"
                        to="/catalogue"
                        onClick={() => cancel()}
                    >
                        Supprimer mon compte
                    </Link>
                </div>
            );
        }
    }

    const signupSchema = Yup.object().shape({

        firstName: Yup.string().required('Champ obligatoire'),
        lastName: Yup.string().required('Champ obligatoire'),
        phoneNumber: Yup.number().required('Champ obligatoire')
            .typeError("Numéro de téléphone invalide")
            .min(100000000, "Numéro de téléphone invalide")
            .max(999999999, "Numéro de téléphone invalide"),
        streetNumber: Yup.string().required('Champ obligatoire'),
        street: Yup.string().required('Champ obligatoire'),
        city: Yup.string().required('Champ obligatoire'),
        zipCode: Yup.string().required('Champ obligatoire'),
        email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire')     
      });

    const signupForm = () => {

        return(
            <Formik
                initialValues={{
                    firstName: props.owner.firstName,
                    lastName: props.owner.lastName,
                    phoneNumber: props.owner.phoneNumber,
                    email: props.owner.email,
                    password: props.owner.password
                }}
                validationSchema={signupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
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
                                <label for="floatingInput" class="always-grey">Numéro de téléphone</label>
                                {errors.phoneNumber && touched.phoneNumber ? (<div class="error">{errors.phoneNumber}</div>) : null}
                        </div>

                        <div class="form-floating mb-3">
                                <Field name="email" type="email" class="form-control" />
                                <label for="floatingInput" class="always-grey">Adresse e-mail</label>
                                {errors.email && touched.email ? (<div class="error">{errors.email}</div>) : null}
                        </div>

                        <div class="form-floating mb-3">
                            <Field name="password" type="password" class="form-control" />
                            <label for="floatingInput" class="always-grey">Changer le mot de passe (laisser vide pour ne pas modifier)</label>
                            {errors.password && touched.password ? (<div class="error">{errors.password}</div>) : null}
                        </div>
                         
                        <div class="m-2 d-flex justify-content-end">
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                onClick={() => props.changeCustomer(values.firstName, 
                                                        values.lastName, 
                                                        values.email, 
                                                        values.password,
                                                        values.phoneNumber)}
                            >
                                Modifier les informations
                            </Link>
                        </div>

                        {bottomButtons()}
                    </Form>
                )}  
            </Formik>
        );
    }


    return (
        <div class="form-group login-form">
            {signupForm()}
        </div>
    );
}