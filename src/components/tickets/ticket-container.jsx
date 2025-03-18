import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketLeft from "../../components/tickets/ticket-left";
import TicketRight from "../../components/tickets/ticket-right";
import "../../style/tickets/ticket-container.css";

function TicketContainer() {
  return (
    <>
      <div className="Container">
        <div className="Second-Container">
          <div className="ticketLeft">
            <TicketLeft />
          </div>
          {/* <div className="ticketRight">
            <TicketRight />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default TicketContainer;
