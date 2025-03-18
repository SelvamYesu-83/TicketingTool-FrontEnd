import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../style/tickets/ticket-left.css";
import { apiService, PORTS } from "../../services/apiService";

const TicketLeft = () => {
  const { formId, action } = useParams(); 
  const [tickets, setTickets] = useState([]); // Stores submission data
  const [pagination, setPagination] = useState({}); // Stores pagination info
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await apiService.get(PORTS.formService, `/api/form-submission/${formId}/${action}?page=${page}&limit=10`);

        // const response = await axios.get(`http://localhost:4005/api/form-submission/32/view?page=${page}&limit=10`);

        if (response.status && response.data) {
          setTickets(response.data);
          setPagination(response.pagination);
        } else {
          setError("Failed to load data");
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setError("Failed to load ticket details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [page]); // Runs whenever `page` changes

  if (loading) return <p>Loading ticket details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="TicketBox">
      <div className="Ticket-Container">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Submission ID</th>
              <th>Project Module</th>
              <th>Module</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Source</th>
              <th>Due Date</th>
              <th>Behalf Of</th>
              <th>Attachment</th>
              <th>Problem Description</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.submission_id}>
                <td>{ticket.submission_id}</td>
                {["Project Module", "Module", "Subject", "Priority", "Category", "Source", "Due Date", "Behalf of", "Attachment", "problem Description"].map((fieldLabel) => {
                  const field = ticket.fields.find((f) => f.label === fieldLabel);
                  return <td key={fieldLabel}>{field ? field.value : "N/A"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button disabled={page >= pagination.totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketLeft;
