import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/tickets/close-ticket.css";

const CloseTicketDetail = () => {
  const [ticketDetails, setTicketDetails] = useState({
    ticketNumber: "",
    projectModule: "",
    module: "",
    category: "",
    priority: "",
    source: "",
    subject: "",
    raisedBy: "",
    problemDescription: "",
    dueDate: "",
  });
  const [solution, setSolution] = useState(""); // State for the solution input

  const navigate = useNavigate();

  // Fetch ticket details from the API
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/90a8a049-b62a-4ae4-91bd-b417fff4f066"
        );
        setTicketDetails(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, []);

  // Handle closing the ticket (POST API call)
  const handleCloseClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mocki.io/v1/12de49c6-1e52-40db-beb5-3b119c6904d8",
        {
          ticketId: ticketDetails.ticketNumber,
          solution: solution, // Send the solution input value
        }
      );

      if (response.status === 200) {
        navigate("/ticket"); // Navigate to the ticket page after closing
      } else {
        console.error("Failed to close the ticket");
      }
    } catch (error) {
      console.error("Error closing the ticket:", error);
    }
  };

  return (
    <div className="CloseTicket-Container">
      <div className="CloseTicket-first">
        <div className="first-details">
          <div className="close-ticketno">
            <p>Ticket Number</p>
            <p className="close-ticketno-colon">
              {" "}
              : {ticketDetails.ticketNumber}
            </p>
          </div>
          <div className="close-projectmodule">
            <p>Project Module</p>
            <p className="close-projectmodule-colon">
              {" "}
              : {ticketDetails.projectModule}
            </p>
          </div>
          <div className="close-module">
            <p>Module</p>
            <p className="close-module-colon"> : {ticketDetails.module}</p>
          </div>
        </div>
        <div className="Second-details">
          <div className="close-category">
            <p>Category</p>
            <p className="close-category-colon"> : {ticketDetails.category}</p>
          </div>
          <div className="close-priority">
            <p>Priority</p>
            <p className="close-priority-colon"> : {ticketDetails.priority}</p>
          </div>
          <div className="close-source">
            <p>Source</p>
            <p className="close-source-colon"> : {ticketDetails.source}</p>
          </div>
        </div>
      </div>
      <div className="CloseTicket-Second">
        <div className="close-subject">
          <p>Subject</p>
          <p className="close-subject-colon"> : {ticketDetails.subject}</p>
        </div>
        <div className="close-rasied">
          <p>Raised this request on behalf of</p>
          <p className="close-rasied-colon"> : {ticketDetails.raisedBy}</p>
        </div>
        <div className="close-problem">
          <p>Problem Description</p>
          <p className="close-problem-colon">
            {" "}
            : {ticketDetails.problemDescription}
          </p>
        </div>
        <div className="close-duedate">
          <p>Due Date</p>
          <p className="close-duedate-colon"> : {ticketDetails.dueDate}</p>
        </div>
        <div className="close-solution">
          <p>Solution</p>
          <p className="close-solution-colon"> :</p>
          <input
            className="description"
            type="text"
            placeholder="Enter Description"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
          <div className="Close-container">
            <div className="Close">
              <button type="button" onClick={handleCloseClick}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseTicketDetail;
