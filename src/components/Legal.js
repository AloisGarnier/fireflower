import React from "react";
import { Helmet } from "react-helmet";

import favicon from '../img/favicon.png'

export default function Legal(props) {

    return(
        <>
            <Helmet>
                <title>{"Mentions légales - Mille-Arts"}</title>
                <meta name="description" content="Décorations et petits objets pour égayer le quotidien" />
                <meta property="og:title" content="Mille Arts" />
                <meta property="og:description" content="Mentions légales" />
                <meta property="og:url" content="https://mille-arts.fr/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>
            <div class="card my-card">
                <h3 class="card-header my-header">Mentions légales</h3>
                <div class="card-body">
                    <div class="d-flex flex-column flex-wrap">
                    <h4 class="my-title d-flex justify-content-center">1. Présentation du site</h4>
                        <p class="justify-content-start text-align-justify margin-x">
                            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, 
                            il est précisé aux utilisateurs du site mille-arts.fr l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :<br />
                            <ul>
                                <li>
                                    Propriétaire et responsable de publication : Caroline Jurien de La Gravière, dirigeante de l'entreprise individuelle Caroline Mille Arts - Conseils
                                    immatriculée au répertoire SIRENE sous le numéro 980 746 945, et sise au 58 rue Chardon Lagache - 75016 Paris
                                </li>
                                <li>
                                    Responsable de la conception et du développement : Aloïs Garnier
                                </li>
                                <li>
                                    Hébergement : Google Cloud Platform - Google France, 8 rue de Londres, 75009 Paris
                                </li>
                            </ul>
                        </p>
                        
                        <h4 class="my-title d-flex justify-content-center">2. Conditions générales d'utilisation du site</h4>
                        <p class="justify-content-start text-align-justify margin-x">    
                            Les utilisateurs du site mille-arts.fr acceptent pleinement et entièrement les conditions générales d'utilisation décrites ci-après.
                            Ces conditions d'utilisation pouvant être modifiées ou complétées à tout moment, les utilisateurs du site mille-arts.fr sont donc invités à les consulter de manière régulière.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x"> 
                            Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique ou de mise à jour peut être toutefois décidée par les responsables du site, 
                            qui s'efforceront alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x"> 
                            De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s'imposent néanmoins à l'utilisateur qui est invité à s'y référer le plus souvent possible afin d'en prendre connaissance.
                        </p>
                        
                        <h4 class="my-title d-flex justify-content-center">3. Services fournis</h4>
                        <p class="justify-content-start text-align-justify margin-x"> 
                            Le site mille-arts.fr a pour objet de présenter l'ensemble des activités de la société, et tout particulièrement la vente d'objets décoratifs.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x"> 
                            Toutes les informations indiquées sur le site sont données à titre indicatif, et sont susceptibles d'évoluer. Par ailleurs, ces informations ne sont pas exhaustives.
                        </p>
                        
                        <h4 class="my-title d-flex justify-content-center">4. Informations et limites contractuelles liées aux données techniques</h4>
                        <p class="justify-content-start text-align-justify margin-x">
                            Le site mille-arts.fr utilise les technologies Java et JavaScript.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Le site ne pourra être tenu pour responsable d'éventuels dommages matériels liés à son utilisation. 
                            De plus, l'utilisateur du site s'engage à y accéder en utilisant un matériel sûr et ne contenant pas de virus.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Toute tentative malveillante d'intrusion indue dans les données du site ou d'entrave à son bon fonctionnement sera passible de poursuites judiciaires.
                        </p>
                        
                        <h4 class="my-title d-flex justify-content-center">5. Propriété intellectuelle</h4>
                        <p class="justify-content-start text-align-justify margin-x">
                            Caroline Jurien de La Gravière est propriétaire de l'intégralité des droits d'auteur et droits voisins afférant à ses créations et à tous les éléments accessibles sur le site,
                            notamment les textes, images, graphismes, logiciels, etc.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Par conséquent, toute utilisation, reproduction ou modification de tout ou partie des éléments du site, par quelque moyen que ce soit, est interdite, sauf autorisation préalable de Caroline Jurien de La Gravière.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Toute exploitation non autorisée du site ou de l'un des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et passible de poursuites judiciaires conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                        </p>

                        <h4 class="my-title d-flex justify-content-center">6. Limitations de responsabilité</h4>
                        <p class="justify-content-start text-align-justify margin-x">
                            Caroline Jurien de La Gravière ne pourra être tenue pour responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site mille-arts.fr,
                            résultant soit de l'utilisation de matériel incompatible, soit de l'apparition d'un problème technique.      
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            En outre, Caroline Jurien de La Gravière ne pourra être tenue pour responsable des dommages indirects (par exemple, une perte de marché ou une perte de chance) consécutifs à l'utilisation du site.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Au sein des espaces interactifs (messagerie, commentaires, etc.), Caroline Jurien de La Gravière se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu qui contreviendrait à la législation applicable en France,
                            en particulier aux dispositions realtives à la protection des données. Le cas échéant, elle se réserve la possibilité de mettre en cause la responsabilité civile ou pénale de l'utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamatoire ou pornographique, quel que soit le support utilisé.                    
                        </p>

    
                        <h4 class="my-title d-flex justify-content-center">7. Gestion des données personnelles</h4>
                        <p class="justify-content-start text-align-justify margin-x">
                            Au sein des espaces interactifs (messagerie, commentaires, etc.), Caroline Jurien de La Gravière se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu qui contreviendrait à la législation applicable en France,
                            en particulier aux dispositions realtives à la protection des données. Le cas échéant, elle se réserve la possibilité de mettre en cause la responsabilité civile ou pénale de l'utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamatoire ou pornographique, quel que soit le support utilisé.                    
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            En l'espèce, le site collecte certaines données personnelles (noms, adresses, etc.) uniquement dans le but d'assurer les services proposés par le site et à des fins d'analyse technique ou commerciale. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé à l'utilisateur du site mille-arts.fr l'obligation ou non de fournir ces informations. 
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, tout utilisateur dispose d'un droit d'accès, de rectification et d'opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée, accompagnée d'une copie du titre d'identité avec signature du titulaire de la pièce, en précisant l'adresse à laquelle la réponse doit être envoyée.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Aucune information personnelle de l'utilisateur du site mille-arts.fr n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.
                        </p>

                        <h4 class="my-title d-flex justify-content-center">8. Liens hypertextes externes</h4>
                        <p class="justify-content-start text-align-justify margin-x">
                            Le site mille-arts.fr contient un certain nombre de liens hypertextes vers d'autres sites, mis en place avec l'autorisation de Caroline Jurien de La Gravière. Cependant, n'ayant pas la possibilité de vérifier le contenu des sites ainsi visités, elle n'assumera aucune responsabilité de ce fait.
                        </p>

                        <h4 class="my-title d-flex justify-content-center">9. Traceurs et cookies</h4>
                        <p class="justify-content-start text-align-justify margin-x">
                            La navigation sur le site mille-arts.fr est susceptible de provoquer l'utilisation et l'installation de traceurs (cookies, stockage local, etc.) sur l'ordinateur de l'utilisateur. 
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Les données obtenues grâce à ces traceurs visent à faciliter la navigation ultérieure sur le site, et ont également vocation à permettre diverses mesures de fréquentation.
                        </p>
                        <p class="justify-content-start text-align-justify margin-x">
                            Le refus d'installation de traceurs peut entraîner l'impossibilité d'accéder à certains services.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

}