import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService, PORTS } from "../../services/apiService";
import "../../style/tickets/ticket-create.css";

const Create = () => {
  const { formId, action } = useParams(); // Extract formId & action from URL
  const [formData, setFormData] = useState({ sections: [] });
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [form_Id, setForm_Id] = useState(null);
  // ✅ Fetch form fields from API
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await apiService.get(PORTS.formService, `/api/form-fields/${formId}/${action}`);
        if (response.status && response.data) {
          setFormData(response.data || { sections: [] });
          setForm_Id(response.data.formId);
        } else {
          setError("Failed to load form fields.");
        }
      } catch (error) {
        console.error("Error fetching form fields:", error);
        setError("Error fetching form fields.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [formId, action]);

  // ✅ Handle input changes
  const handleChange = (e, fieldId, type) => {
    let value;

    if (type === "multi-select") {
      value = Array.from(e.target.selectedOptions, (option) => option.value);
    } else if (type === "file") {
      value = e.target.files[0]; // Handle file upload
    } else {
      value = e.target.value;
    }

    setFormValues((prevState) => ({
      ...prevState,
      [fieldId]: value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the API request payload
    const formattedFields = Object.keys(formValues).map((fieldId) => ({
      field_id: fieldId,
      value: formValues[fieldId],
    }));

    const payload = {
      form_id: form_Id,
      fields: formattedFields,
    };

    console.log("Submitting Form Data:", payload);

    try {
      const response = await apiService.post(PORTS.formService, "/api/form-fields-submission", payload);

      if (response.status) {
        alert("Form submitted successfully!");
        navigate("/ticket"); // ✅ Redirect after successful submission
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {loading ? (
        <p>Loading form...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form className="ticket-form" onSubmit={handleSubmit}>
          <h2>{formData.pageTitle}</h2>

          {formData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="form-section">
              <div className="form-row">
                {section.inputs.map((input, inputIndex) => (
                  <div key={inputIndex} className="form-group">
                    <label>
                      {input.label} {input.required && <span>*</span>}
                    </label>

                    {/* Select Dropdown */}
                    {input.type === "select" ? (
                      <select
                        value={formValues[input.fieldId] || ""}
                        onChange={(e) => handleChange(e, input.fieldId, "select")}
                        required={input.required}
                      >
                        <option value="">Select {input.label}</option>
                        {input.options.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : input.type === "multi-select" ? (
                      <select
                        multiple
                        value={formValues[input.fieldId] || []}
                        onChange={(e) => handleChange(e, input.fieldId, "multi-select")}
                        required={input.required}
                      >
                        {input.options.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : input.type === "textarea" ? (
                      <textarea
                        value={formValues[input.fieldId] || ""}
                        onChange={(e) => handleChange(e, input.fieldId, "textarea")}
                        required={input.required}
                        rows="4"
                      ></textarea>
                    ) : input.type === "file" ? (
                      <input
                        type="file"
                        onChange={(e) => handleChange(e, input.fieldId, "file")}
                        required={input.required}
                      />
                    ) : (
                      <input
                        type={input.type}
                        value={formValues[input.fieldId] || ""}
                        onChange={(e) => handleChange(e, input.fieldId, input.type)}
                        required={input.required}
                        placeholder={input.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={() => navigate("/ticket")}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Create;
