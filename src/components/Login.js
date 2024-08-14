import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

export default function Login(props) {

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card my-card"
        }

        if(props.isLightTheme) {
            return "card light-card my-card"
        }
        
        return "card dark-card my-card"
    }

    function wrongLogin() {
        if(props.wrongLogin) {
            return(
                <div class="d-flex justify-content-end mt-2 mb-0 ">
                    <div class="text-danger align-self-center vertical-align-middle">
                        L'adresse e-mail ou le mot de passe sont erronés.
                    </div>
                </div>
            );
        }
    }

    const loginSchema = Yup.object().shape({

        email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
        password: Yup.string().required('Champ obligatoire'),
     
      });

    const loginForm = () => {

        return(
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <div class="form-floating mb-3">
                            <Field name="email" type="email" class="form-control" />
                            <label for="floatingInput" class="always-grey">Adresse e-mail</label>
                        </div> 
                        
                        <div class="form-floating">
                            <Field name="password" type="password" class="form-control" />
                            <label for="floatingInput" class="always-grey">Mot de passe</label>
                        </div>

                        {wrongLogin()}
                        
                        <div class="m-2 d-flex justify-content-end">
                            <Link to="/inscription" type="button" class="btn btn-warning">Je n'ai pas de compte</Link>
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                onClick={() => props.fetchCustomer(values.email, values.password)}
                            >
                                    Valider
                            </Link>
                        </div>
                    </Form>
                )}  
            </Formik>
        );
    }

    return(
        <>
            <div class={cardClass()}>
                <h3 class="card-header my-header">Connexion</h3>
                <div class="card-body">
                    <div class="form-group login-form">
                        {loginForm()}
                    </div>
                </div>
            </div>
        </>
    );

}