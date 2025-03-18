import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/tickets/ticket-right.css";

const TicketRight = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/e40288c9-c9cd-438b-a3e0-e4175c2273b0"
        );
        setTicketDetails(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setError("Failed to load ticket details. Please try again later.");
      }
    };

    fetchTicketDetails();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!ticketDetails) {
    return <p>Loading ticket details...</p>;
  }

  return (
    <div className="DetailBox">
      <div className="Deatil-1">
        {Object.keys(ticketDetails).map((key, index) => {
          const detail = ticketDetails[key];
          return (
            <div key={index} className="Detail">
              <p className="text">{detail.label}</p>
              <p className={detail.className || "default-class"}> : </p>
              <p className="text">{detail.value ?? "N/A"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketRight;
