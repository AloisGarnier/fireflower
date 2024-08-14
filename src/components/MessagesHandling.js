import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MessagesHandling(props) {

    const [message, setMessage] = useState({message: ''});

    function cardClass() {
        if(props.isChristmas) {
            return "card christmas-card my-card"
        }
        if(props.isLightTheme) {
            return "card light-card my-card"
        }
        return "card dark-card my-card"
    }

    function classActiveOrNot(customer) {
        if(customer.id == props.currentCustomer) {
            return("list-group-item list-group-item-success list-group-item-action")
        }
        return("list-group-item list-group-item-action")
    }

    function changeConv(i) {
        props.setCurrentCustomer(props.chattingCustomers[i].id)
        props.fetchCurrentMessages(props.chattingCustomers[i].id)
    }

    function displayLeftMenu() {
        let leftMenu = []
        for(let i=0; i<props.chattingCustomers.length ; i++) {
            leftMenu.push(
                <button onClick={() => changeConv(i)} class={classActiveOrNot(props.chattingCustomers[i])}>
                    {props.chattingCustomers[i].firstName + " " + props.chattingCustomers[i].lastName}
                </button> 
            )
        }
        return(
            <>
                {leftMenu}
            </>
        );
    }

    function displayCard() { 
        return(
            <div class={cardClass()}>
                <h3 class="card-header my-header">Messagerie</h3>
                <div class="card-body d-flex flex-row justify-content-between">
                    <div class="list-group d-flex flex-column align-content-top max-100">
                        {displayLeftMenu()}
                    </div>
                    <div class="card text-white bg-info mb-3">
                        <div class="d-flex flex-column-reverse card-body my-body overflow-scroll">
                            {displayMessages()}
                        </div>
                        <div class="d-flex flex-row justify-content-end card-footer my-footer-discussion">
                            <form class="d-flex" onSubmit={() => props.sendMessage(message.message)}>
                                <input 
                                class="form-control me-sm-2" 
                                type="input" 
                                placeholder="Votre message"
                                value={message.message}
                                onChange={form => setMessage({...message, message: form.target.value})}
                                ></input>
                                <Link onClick={() => props.sendMessage(message.message)} type="submit" class="btn btn-link my-2 my-sm-0"><i class="fa-regular fa-paper-plane white-icon"></i></Link>
                            </form>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        ); 
    }

    function letterMonth(month) {
        switch(month) {
          case "1":
            return(" janvier ");
          case "2":
            return(" février ");
          case "3":
            return(" mars ");
          case "4":
            return(" avril ");
          case "5":
            return(" mai ");
          case "6":
            return(" juin ");
          case "7":
            return(" juillet ");
          case "8":
            return(" août ");
          case "9":
            return(" septembre ");
          case "10":
            return(" octobre ");
          case "11":
            return(" novembre ");
          case "12":
            return(" décembre ");
        }
      }
    
      function formatDate(date) {
        let year = date.substring(0,4);
        let month = date.substring(5,7)[0] == "0" ? date.substring(6,7) : date.substring(5,7);
        let day = date.substring(8,10)[0] == "0" ? date.substring(9,10) : date.substring(8,10);
    
        let dateDate = new Date(year, month-1, day);
    
        let today = new Date();
    
        if(year == today.getFullYear() && month == today.getMonth()+1 && day == today.getDate()) {
          let dateUTC = new Date(date + ".000Z")
          return(dateUTC.toLocaleString().substring(11, 16));
        } else if (today.getTime()-dateDate.getTime() < 1000*3600*24*2) {
          return("Hier");
        } else {
          return(day + letterMonth(month) + year);
        }
    
      }
    
      function displayMessages() {
        let messagesDisplay = [];
    
        if(props.currentMessages) {
          for(let m = props.currentMessages.length-1; m>=0; m--) {
            if(props.currentMessages[m].isReceived) {
              messagesDisplay.push(
                <>
                  <div class="grey sent mb-3">{formatDate(props.currentMessages[m].sendingDate)}</div>
                  <div class="card sent">
                    <div class="card-body my-body">
                      {props.currentMessages[m].messageContent}
                    </div>
                  </div>
                </>
              );
            } else {
                messagesDisplay.push(
                  <>
                    <div class="grey mb-3">{formatDate(props.currentMessages[m].sendingDate)}</div>
                    <div class="card received">
                      <div class="card-body my-body">
                      {props.currentMessages[m].messageContent}
                      </div>
                    </div>
                  </>
                );
            }
          }
        }
        return messagesDisplay;
      }

    return(
        <>{displayCard()}</>
    );
}