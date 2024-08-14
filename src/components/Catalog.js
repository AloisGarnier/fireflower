import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/fontawesome.all.min.css";


export default function Catalog(props) {

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
                    <button onClick={() => props.deactivateDecoration(deco)} type="button" class="btn btn-danger">Désactiver</button>
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

    function bottomButtonsDeactivated(deco) {
        if(props.owner && props.owner.id == 1) {
            return(
                <div class="d-flex flex-wrap justify-content-center align-content-center max-20">
                    <Link to={moreDetails(deco)} type="button" class="btn btn-info">Modifier</Link>
                    <button onClick={() => props.reactivateDecoration(deco)} type="button" class="btn btn-success">Réactiver</button>
                </div>
            );
        }
    }

    function isFavourite(deco) {
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

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card mb-3 single-card"
        }

        if(props.isLightTheme) {
            return "card light-card mb-3 single-card"
        }
        
        return "card dark-card mb-3 single-card"
    }

    function paginationClass(thisPage) {
        var thisClass = "page-item"

        if(props.isChristmas) {
            thisClass += " christmas-card"
        }
        else if(props.isLightTheme) {
            thisClass += " light-card"
        } else {
            thisClass += " dark-card"
        }

        if(props.currentPage == thisPage) {
            thisClass += " active"
        }
        if((thisPage == "<" && props.currentPage == 1) ||
            (thisPage == ">" && props.pageNumber == props.currentPage)) {
            thisClass += " disabled"        
        }
        
        return thisClass
        
    }

    function linkClass(thisPage) {
        var thisClass = "page-link"

        if(props.isChristmas) {
            thisClass += " christmas-card"
        }
        else if(props.isLightTheme) {
            thisClass += " light-card"
        } else {
            thisClass += " dark-card"
        }

        if(props.currentPage == thisPage) {
            thisClass += " black-bg"
        }
        
        return thisClass
    }

    function getRating(deco) {
        for(let av in props.averages) {
            if(props.averages[av].decorationId == deco.id) {
                let rating = props.averages[av].rating
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
        }
    }

    function littleImage(deco) {
        if(deco.pictures[0]) {
            return(<img class="little-image" src={deco.pictures[0].path}/>)
        }
    }

    function addAllDecorations() {
        let allDecorations = [];

        if(props.decorations.length > 0) {
            props.decorations.forEach(deco => {

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
                <div class={cardClass()}>
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
                            {littleImage(deco)}
                        </div>
                        <div class="d-flex flex-wrap justify-content-center align-content-center max-20 tags">
                            {isFavourite(deco)} 
                            <span class="badge my-badge rounded-pill bg-warning mx-1">
                                {getRating(deco)}
                            </span>
                        </div>
                        {bottomButtons(deco)}
                    </div>
                </div> 
                )
            });
        }

        if(props.owner && props.owner.id == 1) {
            props.deactivatedDecorations.forEach(deco => {

                let currentPrice = 0;
                for(let i = 0; i < deco.decorationPrices.length; i++) {
                    if(deco.decorationPrices[i].withdrawalPrice == null) {
                        currentPrice = deco.decorationPrices[i].price.amount;
                    }
                }

                allDecorations.push(
                <div class={cardClass()}>
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
                            {isFavourite(deco)} 
                            <span class="badge my-badge rounded-pill bg-warning mx-1">
                                {getRating(deco)}
                            </span>
                        </div>
                        {bottomButtonsDeactivated(deco)}
                    </div>
                </div> 
                )
            })

            allDecorations.push(
                <div class={cardClass()}>
                    <div class="card-header">
                        <div class="my-card-header">
                            <span class="deco-name">Nouvelle décoration</span>
                        </div>
                    </div>
                    <div class="card-body d-flex justify-content-center">
                        <Link to="/nouvelle-decoration" type="button" class="btn btn-success align-self-center">Créer</Link>
                    </div>
                </div> 
            );
        }
        
        return allDecorations;
    }

    function addPagination() {
        if(props.pageNumber > 1.5) {
            var pag = []
            pag.push(
                <li class={paginationClass("<")}>
                    <a class={linkClass("<")} href={props.url + "?p=" + (parseInt(props.currentPage) - 1)}>&laquo;</a>
                </li>
            )
            for(let i=1;i<=props.pageNumber;i++) {
                pag.push(
                    <li class={paginationClass(i)}>
                        <a class={linkClass(i)} href={props.url + "?p=" + i}>{i}</a>
                    </li>
                )
            }
            pag.push(
                <li class={paginationClass(">")}>
                    <a class={linkClass(">")} href={props.url + "?p=" + (parseInt(props.currentPage)  + 1)}>&raquo;</a>
                </li>
            )
            return(
                <ul class="pagination pagination-lg">
                    {pag}
                </ul>
            )
        }
    }

    return (
        <div class="d-flex flex-column justify-content-center">
            <div class="d-flex flex-wrap justify-content-center my-catalog">
                {addAllDecorations()}
            </div>
            <div class="d-flex justify-content-center my-5">
                {addPagination()}
            </div>
        </div>
    );
}