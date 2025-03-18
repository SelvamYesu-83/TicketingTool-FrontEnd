import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/tickets/view-ticket.css";

const ViewTicketDetails = () => {
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
    agentDescription: "",
    dueDate: "",
  });
  const [solution, setSolution] = useState(""); // State for the solution input
  const [attachmentUrl, setAttachmentUrl] = useState(null); // State for attachment URL
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error

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

  // Handle downloading the attachment
  const handleDownloadAttachment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace with your API endpoint for downloading the attachment
      const response = await axios.get(
        `https://mocki.io/v1/attachment-download-endpoint/${ticketDetails.ticketNumber}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a URL for the blob
      const url = URL.createObjectURL(response.data);
      setAttachmentUrl(url);

      // Trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `attachment-${ticketDetails.ticketNumber}.png`
      ); // Set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Failed to download attachment.");
      console.error("Error downloading attachment:", err);
    } finally {
      setLoading(false);
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
        <div className="close-problem2">
          <p>Agent Description</p>
          <p className="close-problem2-colon">
            {" "}
            : {ticketDetails.agentDescription}
          </p>
        </div>
        <div className="close-duedate">
          <p>Due Date</p>
          <p className="close-duedate-colon"> : {ticketDetails.dueDate}</p>
        </div>
        <div className="bottom-btn">
          {/* Download Attachment Button */}
          <div className="close-download">
            <button
              type="button"
              onClick={handleDownloadAttachment}
              disabled={loading}
            >
              {loading ? "Downloading..." : "Download Attachment"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="Close-container">
            <div className="Close">
              <button type="button" onClick={handleCloseClick}>
                Aknowladged
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicketDetails;
