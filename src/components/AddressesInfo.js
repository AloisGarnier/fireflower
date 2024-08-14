import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

export default function AddressesInfo(props) {

    let addresses = [];
    const [addressesDisplay, setAddressesDisplay] = useState([]);

    useEffect(() => fetchAllAddresses(), []);

    const backUrl = props.domain + "/addresses/";

    function fetchAllAddresses() {
        fetch(backUrl + props.owner.id + "/all")
            .then(response => response.json())
            .then(json => displayAddresses(json));
    }

    function displayAddresses(json) {
        addresses = json;
        let addressesDisplayTemp = [];
        for(let i=0; i<addresses.length; i++) {
            addressesDisplayTemp.push(
                    <div class="d-flex flex-row justify-content-center card my-3 always-black">
                        <span class="mx-5 my-3">
                            {addresses[i].name} <br />
                            {addresses[i].streetNumber} {addresses[i].street} <br />
                            {addresses[i].city.zipCode} {addresses[i].city.name} <br />
                        </span>
                        <span class="align-self-center mx-5 my-3">
                            <Link 
                                type="button" 
                                class="btn btn-warning"
                                onClick={() => modifyDisplay(i)}
                            >
                                Modifier
                            </Link>

                            <Link 
                                type="button" 
                                class="btn btn-danger"
                                onClick={() => cancel(i)}
                            >
                                Supprimer
                            </Link>
                        </span>
                    </div>
            );
        }

        addressesDisplayTemp.push(
            <div class="d-flex justify-content-center my-3 always-black">
                <Link 
                type="button" 
                class="btn btn-success"
                onClick={() => addDisplay()}
                >
                    Ajouter une nouvelle adresse
                </Link>
            </div>
        );

        setAddressesDisplay(addressesDisplayTemp);
    }

    function modifyDisplay(i) {
        let newAddressesDisplay = [];
        const modifyAddressSchema = Yup.object().shape({
            name: Yup.string().required('Champ obligatoire'),
            streetNumber: Yup.string().required('Champ obligatoire'),
            street: Yup.string().required('Champ obligatoire'),
            city: Yup.string().required('Champ obligatoire'),
            zipCode: Yup.string().required('Champ obligatoire'),   
            });

        newAddressesDisplay.push(
            <Formik
                initialValues={{
                    name: addresses[i].name,
                    streetNumber: addresses[i].streetNumber,
                    street: addresses[i].street,
                    city: addresses[i].city.name,
                    zipCode: addresses[i].city.zipCode
                }}
                validationSchema={modifyAddressSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <div class="form-floating mb-3">
                                <Field name="name" type="label" class="form-control" />
                                <label for="floatingInput">Nom</label>
                                {errors.name && touched.name ? (<div class="error">{errors.name}</div>) : null}
                        </div>
                        <div class="d-flex flex-direction-row ">
                            <div class="form-floating me-3 mb-3 w-50">
                                <Field name="streetNumber" type="label" class="form-control" />
                                <label for="floatingInput">Numéro</label>
                                {errors.streetNumber && touched.streetNumber ? (<div class="error">{errors.streetNumber}</div>) : null}
                            </div>
                            <div class="form-floating mb-3 w-50">
                                <Field name="street" type="label" class="form-control" />
                                <label for="floatingInput">Rue</label>
                                {errors.street && touched.street ? (<div class="error">{errors.street}</div>) : null}
                            </div>
                        </div>

                        <div class="d-flex flex-direction-row ">
                            <div class="form-floating me-3 mb-3 w-50">
                                <Field name="zipCode" type="label" class="form-control" />
                                <label for="floatingInput">Code postal</label>
                                {errors.zipCode && touched.zipCode ? (<div class="error">{errors.zipCode}</div>) : null}
                            </div>
                            <div class="form-floating mb-3 w-50">
                                <Field name="city" type="label" class="form-control" />
                                <label for="floatingInput">Ville</label>
                                {errors.city && touched.city ? (<div class="error">{errors.city}</div>) : null}
                            </div>
                        </div>
                        
                        <div class="m-2 d-flex justify-content-end">
                            <Link 
                                type="button" 
                                class="btn btn-warning"
                                onClick={() => modifyAddress(i, 
                                    values.name,
                                    values.streetNumber,
                                    values.street,
                                    values.zipCode,
                                    values.city)}
                            >
                                Modifier les informations
                            </Link>
                        </div>
                    </Form>
                )}  
            </Formik>
        );
        setAddressesDisplay(newAddressesDisplay);
    }

    function modifyAddress(i, name, streetNumber, street, zipCode, cityName) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: addresses[i].id,
                name: name,
                streetNumber: streetNumber, 
                street: street, 
                zipCode: zipCode,
                cityName: cityName})
        };
        fetch(backUrl + "modify", requestOptions)
            .then(response => response.json())
            .then(() => fetchAllAddresses());
    }

    function cancel(i) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(backUrl + addresses[i].id + "/delete", requestOptions)
            .then(response => response.json())
            .then(() => fetchAllAddresses());
    }

    function addDisplay() {
        let newAddressesAddDisplay = [];
        const addAddressSchema = Yup.object().shape({
            name: Yup.string().required('Champ obligatoire'),
            streetNumber: Yup.string().required('Champ obligatoire'),
            street: Yup.string().required('Champ obligatoire'),
            city: Yup.string().required('Champ obligatoire'),
            zipCode: Yup.string().required('Champ obligatoire'),   
            });

        newAddressesAddDisplay.push(
            <Formik
                initialValues={{
                    name: '',
                    streetNumber: '',
                    street: '',
                    city: '',
                    zipCode: ''
                }}
                validationSchema={addAddressSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <div class="form-floating mb-3">
                                <Field name="name" type="label" class="form-control" />
                                <label for="floatingInput">Nom</label>
                                {errors.name && touched.name ? (<div class="error">{errors.name}</div>) : null}
                        </div>
                        <div class="d-flex flex-direction-row ">
                            <div class="form-floating me-3 mb-3 w-50">
                                <Field name="streetNumber" type="label" class="form-control" />
                                <label for="floatingInput">Numéro</label>
                                {errors.streetNumber && touched.streetNumber ? (<div class="error">{errors.streetNumber}</div>) : null}
                            </div>
                            <div class="form-floating mb-3 w-50">
                                <Field name="street" type="label" class="form-control" />
                                <label for="floatingInput">Rue</label>
                                {errors.street && touched.street ? (<div class="error">{errors.street}</div>) : null}
                            </div>
                        </div>

                        <div class="d-flex flex-direction-row ">
                            <div class="form-floating me-3 mb-3 w-50">
                                <Field name="zipCode" type="label" class="form-control" />
                                <label for="floatingInput">Code postal</label>
                                {errors.zipCode && touched.zipCode ? (<div class="error">{errors.zipCode}</div>) : null}
                            </div>
                            <div class="form-floating mb-3 w-50">
                                <Field name="city" type="label" class="form-control" />
                                <label for="floatingInput">Ville</label>
                                {errors.city && touched.city ? (<div class="error">{errors.city}</div>) : null}
                            </div>
                        </div>
                        
                        <div class="m-2 d-flex justify-content-end">
                            <Link 
                                type="button" 
                                class="btn btn-warning"
                                onClick={() => addAddress( 
                                    values.name,
                                    values.streetNumber,
                                    values.street,
                                    values.zipCode,
                                    values.city)}
                            >
                                Ajouter l'adresse
                            </Link>
                        </div>
                    </Form>
                )}  
            </Formik>
        );
        setAddressesDisplay(newAddressesAddDisplay);
    }

    function addAddress(name, streetNumber, street, zipCode, cityName) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                streetNumber: streetNumber, 
                street: street, 
                zipCode: zipCode,
                cityName: cityName})
        };
        fetch(backUrl + props.owner.id + "/newaddress", requestOptions)
            .then(response => response.json())
            .then(() => fetchAllAddresses());
    }

    return(
        <div class="d-grid justify-content-center my-3">
            {addressesDisplay}
        </div>
    );
}