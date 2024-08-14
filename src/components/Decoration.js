import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Decoration(props) {

    const [myNewRating, setNewRating] = useState("5");

    function fetchNewRating(event) {
        setNewRating(event.target.value)
    }

    function getQuantity() {
        let options = [];
        for(let i=1; i < 10; i++) {
            options.push(<option value={i}>{i}</option>)
        }
        return options;
    }

    function getFormattedPrice(price) {
        if(price - Math.trunc(price) >= 0.01) {
            return Math.floor(price) + "," + ((price - Math.trunc(price))*100).toFixed(0) + " €";
        } else {
            return price + " €";
        }
    }

    function addInBasket(quantity) {
        let newBasket = [...props.basket];
        let alreadyInBasket = false;
        for(let i = 0; i<newBasket.length; i++) {
            if(newBasket[i][0].id == props.decoration.id) {
                newBasket[i][1] += parseInt(quantity);
                alreadyInBasket = true;
            } 
        }
        if (!alreadyInBasket) {
            newBasket.push([props.decoration, parseInt(quantity)]);
        }
        props.setBasket(newBasket);
        window.localStorage.setItem("basket", JSON.stringify(newBasket));
    }

    function getTags(tags) {
        if(tags) {
            let tagNames = [];
            let tagDivs = [];
            for(let i = 0; i < tags.length; i++) {
                tagNames.push(tags[i].tag.name);
            }
            tagNames.sort();
            for(let i = 0; i < tags.length; i++) {
                tagDivs.push(
                    <div class="alert alert-dismissible alert-info">
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        <input initialValues={tagNames[i]} />
                    </div>
                );
            }
    
            return tagDivs;
        }

    }

    function carousel(pictures) {

        if(pictures && pictures.length>1) {
            let pictureRenders = [];
            for(let i=0; i<pictures.length; i++) {
                pictureRenders.push(
                    <img class="image" src={pictures[i].path} />
                );
            }

            return(
                <Carousel showStatus={false}>
                    {pictureRenders}
                </Carousel>
            );
        } else if (pictures && pictures.length==1) {
            return(
                <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
                    <img class="image" src={pictures[0].path} />
                </Carousel>
            );
        }
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

    function isFavourite(deco) {
        if(props.owner && props.owner.id != 1) {
            for(let i=0; i<props.favourites.length; i++) {
                if(props.favourites[i].id == deco.id) {
                    return(
                        <>
                            <button onClick={() => props.removeFromFavourites(deco)} class="badge my-badge rounded-pill bg-danger mx-1">
                                <i class="fa-solid fa-heart"></i>
                            </button> 
                            Cet article fait partie de vos favoris
                        </>
                    )
                }
            }
            return(    
                <>
                    <button onClick={() => props.addToFavourites(deco)} class="badge my-badge rounded-pill bg-secondary mx-1">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    Ajoutez cet article à vos favoris !

                </>
            )
        }
        return(
            <></>
        )
    }

    function getRating() {
        var rating = props.average;
        return stars(rating);
    }

    function stars(rating) {
        if(rating < 0.25) {
            return("Non noté")
        } if(rating >= 0.25 && rating < 0.75) {
            return(<i class="fa-solid fa-star-half my-star"></i>)
        } if(rating >= 0.75 && rating < 1.25) {
            return(<i class="fa-solid fa-star my-star"></i>)
        } if(rating >= 1.25 && rating < 1.75) {
            return(<>
                    <i class="fa-solid fa-star my-star"></i>
                    <i class="fa-solid fa-star-half my-star"></i>
                </> )
        } if(rating >= 1.75 && rating < 2.25) {
            return(<>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
            </> )
        } if(rating >= 2.25 && rating < 2.75) {
            return(<>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star-half my-star"></i>
            </> )
        } if(rating >= 2.75 && rating < 3.25) {
            return(<>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
            </> )
        } if(rating >= 3.25 && rating < 3.75) {
            return(<>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star-half my-star"></i>
            </> )
        } if(rating >= 3.75 && rating < 4.25) {
            return(<>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
            </> )
        } if(rating >= 4.25 && rating < 4.75) {
            return(<>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star-half my-star"></i>
            </> )
        } if(rating >= 4.75) {
            return(<>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
                <i class="fa-solid fa-star my-star"></i>
            </> )
        }
    }

    function recoStars(rating) {
        if(rating < 0.25) {
            return("Non noté")
        } if(rating >= 0.25 && rating < 0.75) {
            return(<i class="fa-solid fa-star-half"></i>)
        } if(rating >= 0.75 && rating < 1.25) {
            return(<i class="fa-solid fa-star"></i>)
        } if(rating >= 1.25 && rating < 1.75) {
            return(<>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half"></i>
                </> )
        } if(rating >= 1.75 && rating < 2.25) {
            return(<>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </> )
        } if(rating >= 2.25 && rating < 2.75) {
            return(<>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half"></i>
            </> )
        } if(rating >= 2.75 && rating < 3.25) {
            return(<>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </> )
        } if(rating >= 3.25 && rating < 3.75) {
            return(<>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half"></i>
            </> )
        } if(rating >= 3.75 && rating < 4.25) {
            return(<>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </> )
        } if(rating >= 4.25 && rating < 4.75) {
            return(<>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half"></i>
            </> )
        } if(rating >= 4.75) {
            return(<>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </> )
        }
    }

    function getEvalNumber() {
        if(props.evalNumber > 1) {
            return " (" + props.evalNumber + " évaluations)"
        } 
        if(props.evalNumber == 1) {
            return " (1 évaluation)"
        }
    }

    function commentClass(evaluation) {
        switch(evaluation.rating) {
            case 1:
                return "alert alert-danger mx-2";
            case 2:
                return "alert alert-warning mx-2";
            case 3:
                return "alert alert-secondary mx-2";
            case 4:
                return "alert alert-info mx-2";
            case 5:
                return "alert alert-success mx-2";
        }
    }

    function getMonth(month) {
        switch(month) {
            case "01" : 
                return "janvier"
            case "02" :
                return "février"
            case "03" : 
                return "mars"
            case "04" :
                return "avril"
            case "05" : 
                return "mai"
            case "06" :
                return "juin"
            case "07" : 
                return "juillet"
            case "08" :
                return "août"
            case "09" :
                return "septembre"
            case "10" : 
                return "octobre"
            case "11" :
                return "novembre"
            case "12" : 
                return "décembre"
            default :
                return "n/a"
        }
    }

    function displayDate(date) {
        let day = date[8] == "0" ? date[9] : date.substring(8)
        let month = getMonth(date.substring(5,7))
        let year = date.substring(0,4)

        return day + " " + month + " " + year
    }

    function addAllComments() {
        var comments = [];
        for(var i=0; i<props.evals.length; i++) {
            comments.push(
                

            <div class={commentClass(props.evals[i])}>
                <div>
                    {stars(props.evals[i].rating)}
                </div>
                <div>
                    <strong>
                        {"par " + props.evals[i].customer.firstName + " " + props.evals[i].customer.lastName.charAt(0) + ". le " + displayDate(props.evals[i].date)} 
                    </strong>
                </div>
                <div>
                    {props.evals[i].comment}
                </div>
            </div>
            );
        }
        return comments;
    }

    function displayAverage() {
        var toDisplay = props.average.toFixed(1).toString()
        if(toDisplay[2] == "0") {
            return toDisplay[0]
        }
        return toDisplay
    }

    function evalDisplay() {
        var evalString = "";

        if(props.average >= 0.25) {
            evalString += displayAverage() + "/5 sur la base de " + props.evals.length;
            if(props.evals.length > 1 ) {
                evalString += " évaluations";
            } else {
                evalString += " évaluation";
            }
        }
        return evalString;
    }

    function starBars() {
        var numberStars = [0, 0, 0, 0, 0];
        var ratioStars = ["0", "0", "0", "0", "0"];
        for(var c=0; c < props.evals.length; c++) {
            numberStars[props.evals[c].rating - 1] += 1;
        }
        if(props.evals.length > 0) {
            for(var s=0; s < numberStars.length; s++) {
                ratioStars[s] = Math.round(numberStars[s]*100/props.evals.length).toString();
            }
            return(
                <div class="my-progress my-2">
                        <ProgressBar>
                            <ProgressBar animated class="progress my-progress" variant="success" label={"5★"} now={ratioStars[4]} key={1} />
                            <ProgressBar animated class="progress my-progress" variant="info" label={"4★"}  now={ratioStars[3]} key={2} />
                            <ProgressBar animated class="progress my-progress" label={"3★"}  now={0} key={ratioStars[2]} />
                            <ProgressBar animated class="progress my-progress" variant="warning" label={"2★"} now={ratioStars[1]} key={4} />
                            <ProgressBar animated class="progress my-progress" variant="danger" label={"1★"} now={ratioStars[0]} key={5} />
                        </ProgressBar>
                    
                </div>
            );
        }

        return (<></>)
    }

    function newComment() {
        if(props.hasBought == "1" || (props.owner && props.owner.firstName == "Aloïs" && props.owner.lastName == "Garnier")) {
            return(
                <Formik
                    enableReinitialize
                    initialValues={{
                        rating: 0,
                        comment: "",
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                {({ errors, touched, values }) => (
                    <Form class="d-flex flex-column comment-new my-2">
                    <h5 class="my-header">
                        <label for="floatingInput" class="always-grey">Ajouter un nouveau commentaire</label>
                    </h5>
                    <div class="d-flex flex-wrap w-100 justify-content-around align-content-center">
                        {ratingNewComment()}
                        <div class="form-floating w-50 align-self-center">
                                <Field name="commentaire" type="label" class="form-control my-textarea" component="textarea"/>
                                <label for="floatingInput" class="always-grey">Commentaire</label>
                        </div>
                        <div class="d-flex justify-content-center align-self-center w-25">
                            <Link 
                                type="button" 
                                class="btn btn-success"
                                onClick={() => props.sendNewComment(values.commentaire, myNewRating)}>
                                    Valider
                            </Link>
                        </div>
                    </div>
                    </Form>
                    )} 
                </Formik>
            );
        }
    }

    function displayComments() {
        return(
            <div class={cardClass()}>
                <h5 class="card-header my-header">
                    <div class="my-card-header">
                            Commentaires
                    </div>
                </h5>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column comment-gal">
                            <div class="d-flex flex-wrap my-2">
                                <div class="mx-1">
                                    {stars(props.average)} 
                                </div>
                                <div class="mx-1">
                                    {evalDisplay()}
                                </div>
                            </div>
                            {starBars()}
                        </div>
                        <div class="d-flex flex-wrap comment-comments my-2">
                            {addAllComments()}
                        </div>
                    </div>
                    {newComment()}
                </div>
            </div>
            );
    }

    function displayRecommendations() {
        if(!props.owner || props.owner.id != 1) {
            return(
            <div class={cardClass()}>
                <h5 class="card-header my-header">
                    <div class="my-card-header">
                            Recommandations
                    </div>
                </h5>
                <div class="d-flex flex-wrap justify-content-around">
                    {addAllRecommendations()}
                </div>
            </div>
            );
        }
    }

    function moreDetails(decoration) {
        return "/decoration?id=" + decoration.id;
    }

    function getFormattedPrice(price) {
        if(price - Math.trunc(price) >= 0.01) {
            return Math.floor(price) + "," + ((price - Math.trunc(price))*100).toFixed(0) + " €";
        } else {
            return price + " €";
        }
    }

    function addOne(decoration) {
        let newBasket = [...props.basket];
        let alreadyInBasket = false;
        for(let i = 0; i<newBasket.length; i++) {
            if(newBasket[i][0].id == decoration.id) {
                newBasket[i][1] += 1;
                alreadyInBasket = true;
            } 
        }
        if (!alreadyInBasket) {
            newBasket.push([decoration, 1]);
        }
        props.setBasket(newBasket);
        window.localStorage.setItem("basket", JSON.stringify(newBasket));
    }


    function bottomButtons(deco) {
        if(props.owner && props.owner.id == 1) {
            return(
                <div class="d-flex flex-wrap justify-content-center align-content-center max-20">
                    <Link to={moreDetails(deco)} type="button" class="btn btn-info">Modifier</Link>
                    <button onClick={() => props.deleteDecoration(deco)} type="button" class="btn btn-danger">Supprimer</button>
                </div>
            );
        } else {
            return(
                <div class="d-flex flex-wrap justify-content-center align-content-center max-20">
                    <button onClick={() => addOne(deco)} type="button" class="btn btn-success">Ajouter 1 au panier</button>
                    <Link to={moreDetails(deco)} type="button" class="btn btn-info">Plus d'infos</Link>
                </div>
            );
        }
    }

    function isRecoFavourite(deco) {
        if(props.owner && props.owner.id != 1) {
            for(let i=0; i<props.favourites.length; i++) {
                if(props.favourites[i].id == deco.id) {
                    return(
                        <button onClick={() => props.removeFromFavourites(deco)} class="badge my-badge rounded-pill bg-danger mx-1"><i class="fa-solid fa-heart"></i></button> 
                    )
                }
            }
            return(            
                <button onClick={() => props.addToFavourites(deco)} class="badge my-badge rounded-pill bg-secondary mx-1"><i class="fa-solid fa-heart"></i></button>
            )
        }
        return(
            <></>
        )
    }

    function decoCardClass() {
        if(props.isChristmas) {
            return "card christmas-card single-card reco-card"
        }

        if(props.isLightTheme) {
            return "card light-card single-card reco-card"
        }
        
        return "card dark-card single-card reco-card"
    }

    function getRecoRating(deco) {
        for(let av=0; av<props.averages.length; av++) {
            if(props.averages[av].decorationId == deco.id) {
                let rating = parseFloat(props.averages[av].rating)
                return(recoStars(rating))
            }
        }
    }

    function addAllRecommendations() {
        let allDecorations = [];

        if(props.recommendations.length > 0) {
            props.recommendations.forEach(deco => {

                let currentPrice = 0;
                for(let i = 0; i < deco.decorationPrices.length; i++) {
                    if(deco.decorationPrices[i].withdrawalPrice == null) {
                        currentPrice = deco.decorationPrices[i].price.amount;
                    }
                }
    
                let tagNames = [];
                let tags = [];
                for(let i = 0; i < deco.decorationTags.length; i++) {
                    tagNames.push(deco.decorationTags[i].tag.name);
                }
                tagNames.sort();
                for(let i = 0; i < deco.decorationTags.length; i++) {
                    tags.push(
                        <span class="badge my-badge rounded-pill bg-secondary mx-1">{tagNames[i]}</span>
                    );
                }
    
                allDecorations.push(
                <div class={decoCardClass()}>
                    <div class="card-header max-20 d-flex justify-content-between align-items-center">
                        <div class="my-card-header">
                            {deco.name}
                        </div>
                        <div class="my-card-header">
                            <span class="badge badge-price bg-danger">{getFormattedPrice(currentPrice)}</span>
                        </div>
                    </div>
                    <div class="card-body max-80">
                        <div class="d-flex justify-content-center max-60">
                            <img class="little-image" src={deco.pictures[0].path}/>
                        </div>
                        <div class="d-flex flex-wrap justify-content-center align-content-center max-20 tags">
                            {isRecoFavourite(deco)} 
                            <span class="badge my-badge rounded-pill bg-warning mx-1">
                                {getRecoRating(deco)}
                            </span>
                        </div>
                        {bottomButtons(deco)}
                    </div>
                </div> 
                )
            });
        }

        return allDecorations;
    }

    function displayCard() { 
        if(props.owner && props.owner.id == 1) {
            return(
            <div class={cardClass()}>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: props.decoration.name,
                        picture1: props.pictures[0],
                        picture2: props.pictures[1],
                        picture3: props.pictures[2],
                        description: props.decoration.description,
                        price: props.currentPrice,
                        preparationDelay: props.decoration.preparationDelay,
                        weight: props.decoration.weight,
                        dimensions: props.decoration.dimensions,
                        tag1: props.tags[0],
                        tag2: props.tags[1],
                        tag3: props.tags[2]
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h3 class="card-header my-header">
                        <label for="floatingInput" class="always-grey">Titre</label>
                        <Field name="name" type="label" class="form-control" />
                    </h3>
                    <div class="card-body d-flex flex-column">
                        <div class="form-floating mb-3">
                                <Field name="picture1" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">URL de l'image n°1</label>
                        </div>
                        <div class="form-floating mb-3">
                                <Field name="picture2" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">URL de l'image n°2</label>
                        </div>
                        <div class="form-floating mb-3">
                                <Field name="picture3" type="label" class="form-control" />
                                <label for="floatingInput" class="always-grey">URL de l'image n°3</label>
                        </div>
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
                        <div class="m-2 d-flex justify-content-end">
                            <Link to="/catalogue" type="button" class="btn btn-warning">Annuler</Link>
                            <Link
                                type="button" 
                                class="btn btn-success"
                                onClick={() => props.modifyDecoration(props.decoration.id, 
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
        } else {
            return(
            <div class={cardClass()}>
                <h3 class="card-header my-header">
                    <div class="my-card-header">
                            {props.decoration.name}
                    </div>
                    <div class="my-card-header">
                        <span class="badge big-badge-price bg-danger">{getFormattedPrice(props.currentPrice)}</span>
                    </div>
                </h3>
                <div class="card-body d-flex flex-wrap justify-content-around my-5">
                    <span class="my-carousel space-small-screen">
                        {carousel(props.decoration.pictures)}
                    </span>
                    <span class="d-flex flex-column justify-content-start align-content-start w-25 my-carousel space-small-screen">
                        <div>
                            {getRating()} {getEvalNumber()}
                        </div>
                        <div>
                            <br/>
                            {isFavourite(props.decoration)}
                        </div>
                        <div> <br /> {props.decoration.description} </div>
                        <div> <br /> {props.tagDisplay} </div>
                        <div> <br /> Poids : {props.decoration.weight} </div>
                        <div> <br /> Dimensions : {props.decoration.dimensions} </div>
                        <div> <br /> Temps de préparation estimé : {props.decoration.preparationDelay} jours </div>
                    </span>
                    <span class="d-flex flex-column justify-content-center align-self-center space-small-screen">
                        <Formik
                            initialValues={{
                                quantity: 1
                            }}
                        >
                        {({ errors, touched, values }) => (
                            <Form>
                                <span class="d-flex flex-column justify-content-center">
                                    <div class="form-floating">
                                        <Field name="quantity" as="select" class="form-select">
                                            {getQuantity()}
                                        </Field>
                                        <label for="floatingInput" class="always-grey">Quantité</label>
                                    </div>
                                        <Link 
                                            type="button" 
                                            class="btn btn-success"
                                            to="/catalogue"
                                            onClick={() => addInBasket(values.quantity)}
                                        >
                                            Ajouter au panier
                                        </Link>
                                </span>
                            </Form>
                            )} 
                        </Formik>
                    </span>
                </div>
            </div> 
            );
        }
    }

    return(
        <>
            {displayCard()}
            {displayComments()}
            {displayRecommendations()}
        </>
    );

    function ratingNewComment() {
        return(
            <div class="feedback w-25 align-self-center">
                <div class="rating" onChange={fetchNewRating.bind(this)}>
                    <input type="radio" name="rating" id="rating-5" value="5"/>
                    <label for="rating-5"></label>
                    <input type="radio" name="rating" id="rating-4" value="4"/>
                    <label for="rating-4"></label>
                    <input type="radio" name="rating" id="rating-3" value="3"/>
                    <label for="rating-3"></label>
                    <input type="radio" name="rating" id="rating-2" value="2"/>
                    <label for="rating-2"></label>
                    <input type="radio" name="rating" id="rating-1" value="1"/>
                    <label for="rating-1"></label>
                <div class="emoji-wrapper">
                    <div class="emoji">
                    <svg class="rating-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                    <path d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z" fill="#f4c534"/>
                    <ellipse transform="scale(-1) rotate(31.21 715.433 -595.455)" cx="166.318" cy="199.829" rx="56.146" ry="56.13" fill="#fff"/>
                    <ellipse transform="rotate(-148.804 180.87 175.82)" cx="180.871" cy="175.822" rx="28.048" ry="28.08" fill="#3e4347"/>
                    <ellipse transform="rotate(-113.778 194.434 165.995)" cx="194.433" cy="165.993" rx="8.016" ry="5.296" fill="#5a5f63"/>
                    <ellipse transform="scale(-1) rotate(31.21 715.397 -1237.664)" cx="345.695" cy="199.819" rx="56.146" ry="56.13" fill="#fff"/>
                    <ellipse transform="rotate(-148.804 360.25 175.837)" cx="360.252" cy="175.84" rx="28.048" ry="28.08" fill="#3e4347"/>
                    <ellipse transform="scale(-1) rotate(66.227 254.508 -573.138)" cx="373.794" cy="165.987" rx="8.016" ry="5.296" fill="#5a5f63"/>
                    <path d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z" fill="#3e4347"/>
                    </svg>
                    <svg class="rating-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                    <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
                    <path d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z" fill="#3e4347"/>
                    <path d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z" fill="#f4c534"/>
                    <path d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z" fill="#fff"/>
                    <path d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z" fill="#3e4347"/>
                    <path d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z" fill="#fff"/>
                    <path d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z" fill="#f4c534"/>
                    <path d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z" fill="#fff"/>
                    <path d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z" fill="#3e4347"/>
                    <path d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z" fill="#fff"/>
                    </svg>
                    <svg class="rating-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                    <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
                    <path d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z" fill="#3e4347"/>
                    <path d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z" fill="#fff"/>
                    <circle cx="340" cy="260.4" r="36.2" fill="#3e4347"/>
                    <g fill="#fff">
                        <ellipse transform="rotate(-135 326.4 246.6)" cx="326.4" cy="246.6" rx="6.5" ry="10"/>
                        <path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z"/>
                    </g>
                    <circle cx="168.5" cy="260.4" r="36.2" fill="#3e4347"/>
                    <ellipse transform="rotate(-135 182.1 246.7)" cx="182.1" cy="246.7" rx="10" ry="6.5" fill="#fff"/>
                    </svg>
                    <svg class="rating-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                <path d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z" fill="#3e4347"/>
                <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
                <g fill="#fff">
                <path d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z"/>
                <ellipse cx="356.4" cy="205.3" rx="81.1" ry="81"/>
                </g>
                <ellipse cx="356.4" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"/>
                <g fill="#fff">
                <ellipse transform="scale(-1) rotate(45 454 -906)" cx="375.3" cy="188.1" rx="12" ry="8.1"/>
                <ellipse cx="155.6" cy="205.3" rx="81.1" ry="81"/>
                </g>
                <ellipse cx="155.6" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"/>
                <ellipse transform="scale(-1) rotate(45 454 -421.3)" cx="174.5" cy="188" rx="12" ry="8.1" fill="#fff"/>
            </svg>
                    <svg class="rating-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <circle cx="256" cy="256" r="256" fill="#ffd93b"/>
                    <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"/>
                    <path d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"/>
                    <path d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z" fill="#d03f3f"/>
                    <path d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"/>
                    <path d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"/>
                    <path d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z" fill="#d03f3f"/>
                    <path d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"/>
                    <path d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z" fill="#3e4347"/>
                    <path d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z" fill="#e24b4b"/>
                    </svg>
                    <svg class="rating-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g fill="#ffd93b">
                        <circle cx="256" cy="256" r="256"/>
                        <path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z"/>
                    </g>
                    <path d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z" fill="#e9eff4"/>
                    <path d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#45cbea"/>
                    <path d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#e84d88"/>
                    <g fill="#38c0dc">
                        <path d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z"/>
                    </g>
                    <g fill="#d23f77">
                        <path d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z"/>
                    </g>
                    <path d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z" fill="#3e4347"/>
                    <path d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z" fill="#e24b4b"/>
                    <path d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z" fill="#fff" opacity=".2"/>
                    </svg>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}