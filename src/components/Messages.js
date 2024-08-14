import React, {useState } from "react";import "../css/fontawesome.all.min.css";
import { Link } from "react-router-dom";

export default function Messages(props) {

  const [message, setMessage] = useState({message: ''});

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

    if(props.messages) {
      for(let m = props.messages.length-1; m>=0; m--) {
        if(props.messages[m].isReceived) {
          messagesDisplay.push(
            <>
              <div class="grey mb-3">{formatDate(props.messages[m].sendingDate)}</div>
              <div class="card received">
                <div class="card-body my-body">
                  {props.messages[m].messageContent}
                </div>
              </div>
            </>
          );
        } else {
            messagesDisplay.push(
              <>
                <div class="grey sent mb-3">{formatDate(props.messages[m].sendingDate)}</div>
                <div class="card sent">
                  <div class="card-body my-body">
                  {props.messages[m].messageContent}
                  </div>
                </div>
              </>
            );
        }
      }
    }
    return messagesDisplay;
  }
  
  function displayDiscussion() {
    if(props.owner && props.owner.id != 1 && !props.isDiscussionDisplayed) {
      return(
        <div class="d-flex flex-row-reverse">
          <button type="button" class="btn btn-info btn-lg m-3 my-cross-button" onClick={() => props.setDiscussionDisplayed(true)}><i class="fa-solid fa-message"></i></button>
        </div>
      );
    } else if(props.owner && props.owner.id != 1 && props.isDiscussionDisplayed) {
      return(
        <div class="d-flex flex-row-reverse align-items-end">
          <div class="card my-discussion text-white bg-info mb-3">
            <div class="d-flex align-items-center justify-content-between card-header my-header">
              <div class="mx-2">Contactez-moi !</div>
              <button class="btn btn-info transparent-button" onClick={() => props.setDiscussionDisplayed(false)}><i class="fa-solid fa-times"></i></button>
            </div>
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
        </div>
      );
    }
  }

  return(
    <>{displayDiscussion()}</>
  );
}