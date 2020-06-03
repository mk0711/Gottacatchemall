import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="Home">
      <div className="container">
        <div class="row">
          <div class="col-sm-8" id="game">
            Generate game here 
          </div>
          <div class="col-sm-4" id="chat">
            <form name="message" action="" id="message">
               <input name="usermsg" type="text" id="usermsg" size="40" />
               <input name="submitmsg" type="submit"  id="submitmsg" value="Send" />
            </form>
        </div>
      </div>
    </div>
  </div>
  );
}