import React, {useState, useEffect} from "react";
import {Route, Routes, Link, useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

import CatalogController from "./CatalogController";
import LoginController from "./LoginController";
import SignupController from "./SignupController";
import ResearchController from "./ResearchController";
import Basket from "./Basket";
import MyAccountController from "./MyAccountController";
import DecorationController from "./DecorationController";
import ChristmasController from "./ChristmasController";
import AboutController from "./AboutController";
import NewDecorationController from "./NewDecorationController";
import Delivery from "./Delivery";
import NewController from "./NewController";
import CommandController from "./CommandController";
import StatsController from "./StatsController";
import Legal from "./Legal";
import Terms from "./Terms";

import lightBg from "../img/light-bg.png";
import darkBg from "../img/dark-bg.png";
import christmasBg from "../img/christmas-bg.png";

import favicon from '../img/favicon.png'

import "../css/style.css";
import "../css/sketchy.css";
import "../css/fontawesome.all.min.css";
import { Helmet } from "react-helmet";
import MessagesController from "./MessagesController";
import MessagesHandlingController from "./MessagesHandlingController";
import { randomUUID } from "crypto";

export default function App() {

  const domain = "https://api.mille-arts.fr";
  //const domain = "http://localhost:8081"

  const [themeBackground, setThemeBackground] = useState(lightBg);
  const [owner, setOwner] = useState(null);
  const [basket, setBasket] = useState([]);
  const [research, setResearch] = useState({search: ''});
  const [allDecorations, setAllDecorations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [decorations, setDecorations] = useState([]);
  const [isCollapsedDisplayed, setCollapsedDisplayed] = useState(false);
  const [isLightTheme, setLightTheme] = useState(true);
  const [isChristmas, setChristmas] = useState(false);
  const [isDiscussionDisplayed, setDiscussionDisplayed] = useState(false);
  const [about, setAbout] = useState("");
  const [cookies, setCookies] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [averages, setAverages] = useState([]);
  const [fullCatalog, setFullCatalog] = useState([]);
  const [deactivatedDecorations, setDeactivatedDecorations] = useState([]);

  useEffect(() => fetchConnectedOwner(), []);
  useEffect(() => fetchPreviousBasket(), []);
  useEffect(() => fetchCookies(), []);
  useEffect(() => fetchFavourites(), []);
  useEffect(() => fetchFullCatalog(), []);

  const navigate = useNavigate();

  function fetchFullCatalog() {
    fetch(domain + "/catalog/all")
      .then(response => response.json())
      .then(json => setFullCatalog(json))
  }

  /**
   * Fetches a connectedOwner in localStorage if there is one
   */
  function fetchConnectedOwner() {
    if(JSON.parse(window.localStorage.getItem("owner"))) {
      setOwner(JSON.parse(window.localStorage.getItem("owner")));
    }
  }

  function fetchPreviousBasket() {
    if(JSON.parse(window.localStorage.getItem("basket"))) {
      setBasket(JSON.parse(window.localStorage.getItem("basket")));
    }
  }

  function fetchCookies() {
    if(JSON.parse(window.localStorage.getItem("cookies"))) {
      setCookies(JSON.parse(window.localStorage.getItem("cookies")));
    }
  }

  function fetchFavourites() {
    if(JSON.parse(window.localStorage.getItem("favourites"))) {
      setFavourites(JSON.parse(window.localStorage.getItem("favourites")))
    }
  }

  function basketLength() {
    var l = 0;
    for(var i=0; i<basket.length; i++) {
      l+=basket[i][1]
    }
    return l
  }

  function displayBasket() {
    if(!owner || owner.id != 1) {
      return(
        <Link to="/panier" class="btn btn-link"><i class="fa-solid fa-basket-shopping"></i><span class="cart-badge"> {basketLength()} </span></Link>
      );
    }
  }

  function changeTheme() {
    isLightTheme ? setThemeBackground(darkBg) : setThemeBackground(lightBg);
    isLightTheme ? setLightTheme(false) : setLightTheme(true);
    setChristmas(false);
  }

  function getParamInURL() {
    if(research.search) {
      return "/recherche?q=" + research.search;
    } else {
      return "/catalogue"
    }
  }

  /**
   * Goes to the corresponding research page
   * @param {when the research form is validated by click or enter} event 
   */
  function goToResearchPage(event) {
    if(research.search) {
      event.preventDefault();
      navigate("/recherche?q=" + research.search);
      navigate(0);
    }
  }

  function displayCollapsedItems() {
    if(isCollapsedDisplayed && (!owner || owner.id != 1)){
      return (
        <div class="d-flex flex-column">
          <Link to={account()} class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}><i class="fa-solid fa-user"></i>&thinsp; {ownerName()}</Link>
          <Link to="/panier" class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}><i class="fa-solid fa-basket-shopping"></i><span class="cart-badge"> {basketLength()} </span> </Link>
          <Link to="/catalogue" class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}>Tous les articles</Link>
          <Link to="/a-propos" class="btn btn-link" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}>Qui suis-je ?</Link>
          <form class="d-flex" onSubmit={event => goToResearchPage(event)}>
                  <input 
                    class="form-control me-sm-2" 
                    type="input" 
                    placeholder="Votre recherche"
                    value={research.search}
                    onChange={form => setResearch({...research, search: form.target.value})}
                  ></input>
                  <Link reloadDocument type="submit" to={getParamInURL()} class="btn btn-link my-2 my-sm-0" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}><i class="fas fa-search"></i></Link>
                </form>
        </div>
      )
    }
  }
  
  function navBarClass() {
    if(!isLightTheme && !isChristmas) {
      return("navbar navbar-expand-lg navbar-light bg-light-purple sticky-top")
    } else {
      return("navbar navbar-expand-lg navbar-light bg-light-red sticky-top")
    }
  }

  function acceptCookies() {
    setCookies(true);
    window.localStorage.setItem("cookies", true);
  }

  function checkCookiesAcceptance() {
    if(!cookies) {
      return(
        <div class="alert popup alert-danger d-flex flex-row justify-content-between">
          <div class="m-2">
            Nous utilisons des cookies et outils similaires afin de faciliter votre navigation sur ce site et améliorer votre expérience d'achat. <br/>
            Merci d'accepter tous les cookies ou de refuser les cookies non-essentiels.
          </div>
          <div class="m-2 d-flex justify-content-end">
            <Link 
                type="button" 
                class="btn btn-info"
                onClick={() => acceptCookies()}
            >
                J'accepte seulement les cookies essentiels
            </Link>
            <Link 
                type="button" 
                class="btn btn-success"
                onClick={() => acceptCookies()}
            >
                J'accepte tous les cookies
            </Link>
          </div>
        </div>
      );
    }
  }

  function checkCollapsedCookiesAcceptance() {
    if(!cookies) {
      return(
        <div class="alert popup alert-danger d-flex flex-column justify-content-between">
          <div class="m-2">
            Nous utilisons des cookies et outils similaires afin de faciliter votre navigation sur ce site et améliorer votre expérience d'achat. <br/>
            Merci d'accepter tous les cookies ou de refuser les cookies non-essentiels.
          </div>
            <Link 
                type="button" 
                class="btn btn-info"
                to="/catalogue"
                onClick={() => acceptCookies()}
            >
                J'accepte seulement les cookies essentiels
            </Link>
            <Link 
                type="button" 
                class="btn btn-success"
                to="/catalogue"
                onClick={() => acceptCookies()}
            >
                J'accepte tous les cookies
            </Link>
        </div>
      );
    }
  }


  function isSnow() {
    if(themeBackground == christmasBg) {
      let snowflakes = [];
      for(let i=0;i<200;i++) {
        snowflakes.push(
          <div class="snow"></div>  
        );
      }
      return(
      <>
        {snowflakes}
      </>);
    }
  }

  function mainOptions() {
    if(!owner || owner.id != 1) {
      return(
        <div>
          <Link to="/catalogue" class="btn btn-link">Tous les articles</Link>
          <Link to="/nouveautes" class="btn btn-link">Nouveautés</Link>
          <Link to="/noel" class="btn btn-link">C'est déjà Noël !</Link>
          <Link to="/a-propos" class="btn btn-link">Qui suis-je ?</Link>
        </div>
      );
    } else {
      return(
        <div>
          <Link to="/catalogue" class="btn btn-link">Catalogue</Link>
          <Link to="/commandes" class="btn btn-link">Commandes</Link>
          <Link to="/messagerie" class="btn btn-link">Messagerie</Link>
          <Link to="/gestion" class="btn btn-link">Statistiques</Link>
          <Link to="/a-propos" class="btn btn-link">Contact</Link>
        </div>
      );
    }
  }

  function displayMessageController() {
    if(owner && owner.id != 1) {
      return(
        <MessagesController 
        owner = {owner}
        domain = {domain}
        isDiscussionDisplayed = {isDiscussionDisplayed}
        setDiscussionDisplayed = {setDiscussionDisplayed}
        />
      );
    }
  }

  function logOut() {
    setOwner(undefined);
    window.localStorage.removeItem("owner");
  }

  function displayAccount() {
    if(owner != undefined) {
      return(<Dropdown>
                <Dropdown.Toggle variant="transparent-account" id="dropdown-basic">
                  <i class="fa-solid fa-user-check"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item><Link to="/compte" class="not-underlined">Votre compte</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/favoris" class="not-underlined">Vos favoris</Link></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/catalogue" onClick={() => logOut()}>Se déconnecter</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
      );
    } else {
    return(
               <Dropdown>
                <Dropdown.Toggle variant="transparent-account" id="dropdown-basic">
                  <i class="fa-solid fa-user"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/connexion">Se connecter</Dropdown.Item>
                  <Dropdown.Item href="/inscription">Créer un compte</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          );
    }
  }

  return (
    <div class="theme" style={{backgroundImage:`url(${themeBackground})`}}>
      {isSnow()}
      <Helmet>
        <title>Mille Arts</title>
        <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
        <meta property="og:title" content="Mille Arts" />
        <meta property="og:description" content="Venez dans ma boutique en-ligne pour acheter plein d'objets décoratifs" />
        <meta property="og:url" content="https://mille-arts.fr/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <nav class={navBarClass()}>
        <div class="container-fluid">
          <div class="col">
            <div class="my-row">
              <div class="collapse navbar-collapse navbar-left">
                <form class="d-flex" onSubmit={event => goToResearchPage(event)}>
                  <input 
                    class="form-control me-sm-2" 
                    type="input" 
                    placeholder="Votre recherche"
                    value={research.search}
                    onChange={form => setResearch({...research, search: form.target.value})}
                  ></input>
                  <Link reloadDocument type="submit" to={getParamInURL()} class="btn btn-link my-2 my-sm-0"><i class="fas fa-search"></i></Link>
                </form>
              </div>
              <Link class="d-flex navbar-brand me-auto" to="/">Mille Arts</Link>
              <div class="collapse navbar-collapse navbar-right">
                {displayAccount()}
                {displayBasket()}
              </div>
              <div class="collapsed navbar-right-collapsed">
                <div class="d-flex navbar-toggler-collapsed">
                  <button class="navbar-toggler" onClick={() => setCollapsedDisplayed(!isCollapsedDisplayed)}>
                    <span class="navbar-toggler-icon"></span>
                  </button>
                </div>
              </div>
            </div>

            <div class="my-bottom-row collapse navbar-collapse nav-item navbar-nav me-auto">
              <div class="sun-moon">
                <label class="form-check-label me-2" for="flexSwitchCheckChecked"><i class="fa-solid fa-sun"></i></label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onClick={() => changeTheme()} value={isLightTheme}/>
                  <label class="form-check-label" for="flexSwitchCheckChecked"><i class="fa-sharp fa-solid fa-moon"></i></label>
                </div>
              </div>
              {mainOptions()}
              <div class="pe-3 d-flex flex-row justify-content-around">
                <Link to="https://www.pinterest.fr/milleartsfr/" target="_blank" class="btn-link social-network"><i class="fa-brands fa-pinterest"></i></Link>
                <Link to="https://www.instagram.com/carolinemilard/" target="_blank" class="btn-link social-networkk"><i class="fa-brands fa-instagram"></i></Link>
              </div>
            </div>
            <div class="nav-item navbar-nav me-auto collapsed my-toggler d-block d-lg-none">
                  {displayCollapsedItems()}
            </div>
          </div>
        </div>
      </nav>
    
        <Routes>
          <Route exact path="/" element={
            <CatalogController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            allDecorations={allDecorations}
            setAllDecorations={setAllDecorations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            averages = {averages}
            setAverages = {setAverages}
            deactivatedDecorations={deactivatedDecorations}
            setDeactivatedDecorations={setDeactivatedDecorations}
          />}></Route>
          <Route exact path="/catalogue" element={
            <CatalogController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            allDecorations={allDecorations}
            setAllDecorations={setAllDecorations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            averages = {averages}
            setAverages = {setAverages}
            deactivatedDecorations={deactivatedDecorations}
            setDeactivatedDecorations={setDeactivatedDecorations}
          />}></Route>
          <Route exact path="/connexion" element={
            <LoginController 
              owner={owner}
              setOwner={setOwner}
              domain = {domain}
              favourites={favourites}
              setFavourites={setFavourites}
              isLightTheme = {isLightTheme}
              isChristmas = {isChristmas}
              setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/inscription" element={
            <SignupController
              owner={owner}
              setOwner={setOwner}
              domain = {domain}
              isLightTheme = {isLightTheme}
              isChristmas = {isChristmas}
              setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/panier" element={
            <Basket
            owner={owner} 
            basket={basket}
            setBasket={setBasket}
            domain = {domain}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            />
          }></Route>
          <Route exact path="/recherche" element={
            <ResearchController
            owner={owner}
            research={research}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            allDecorations={allDecorations}
            setAllDecorations={setAllDecorations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            averages = {averages}
            setAverages = {setAverages}
          />}></Route>
          <Route exact path="/favoris" element={
            <CatalogController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={favourites}
            setDecorations={setDecorations}
            allDecorations={allDecorations}
            setAllDecorations={setAllDecorations}
            currentPage={1}
            setCurrentPage={setCurrentPage}
            pageNumber={1}
            setPageNumber={setPageNumber}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            averages = {averages}
            setAverages = {setAverages}
            deactivatedDecorations={deactivatedDecorations}
            setDeactivatedDecorations={setDeactivatedDecorations}
          />}></Route>
          <Route exact path="/compte" element={
            <MyAccountController
            owner={owner}
            setOwner={setOwner}
            domain = {domain}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/decoration" element={
            <DecorationController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            averages = {averages}
            setAverages = {setAverages}
          />}></Route>
          <Route exact path="/noel" element={
            <ChristmasController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            allDecorations={allDecorations}
            setAllDecorations={setAllDecorations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            themeBackground={themeBackground}
            setThemeBackground={setThemeBackground}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            averages = {averages}
            setAverages = {setAverages}
          />}></Route>
          <Route exact path="/nouveautes" element={
            <NewController
            owner={owner}
            basket={basket}
            setBasket={setBasket}
            decorations={decorations}
            setDecorations={setDecorations}
            allDecorations={allDecorations}
            setAllDecorations={setAllDecorations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            themeBackground={themeBackground}
            setThemeBackground={setThemeBackground}
            domain = {domain}
            favourites = {favourites}
            setFavourites = {setFavourites}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
            averages = {averages}
            setAverages = {setAverages}
          />}></Route>
          <Route exact path="/a-propos" element={
            <AboutController
            domain = {domain}
            owner = {owner}
            about = {about}
            setAbout = {setAbout}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/nouvelle-decoration" element={
            <NewDecorationController
            domain = {domain}
            owner = {owner}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/livraison-paiement" element={
            <Delivery
            domain = {domain}
            owner = {owner}
            basket = {basket}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/commandes" element={
            <CommandController
            domain = {domain}
            owner = {owner}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/gestion" element={
            <StatsController
            domain = {domain}
            fullCatalog = {fullCatalog}
            fetchFullCatalog = {fetchFullCatalog}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/cgv" element={
            <Terms
            domain = {domain}
            owner = {owner}
            basket = {basket}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/mentions-legales" element={
            <Legal
            domain = {domain}
            owner = {owner}
            basket = {basket}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
          <Route exact path="/messagerie" element={
            <MessagesHandlingController
            domain = {domain}
            owner = {owner}
            isLightTheme = {isLightTheme}
            isChristmas = {isChristmas}
            setChristmas = {setChristmas}
          />}></Route>
        </Routes>

      <footer class="none-if-small sticky-bottom">
        <div class="my-footer d-flex flex-row">
          {checkCookiesAcceptance()}
        </div>
      </footer>

      <footer class="none-if-large sticky-bottom">
        <div class="my-footer d-flex flex-row">
          {checkCollapsedCookiesAcceptance()}
        </div>
      </footer>

      <footer class="none-if-small sticky-bottom">
        {displayMessageController()}
      </footer>

    </div>
  );
}