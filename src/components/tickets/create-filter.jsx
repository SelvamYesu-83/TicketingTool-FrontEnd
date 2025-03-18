import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/tickets/filtercreate.css"; // Importing the CSS file

const Filter = () => {
  const [formData, setFormData] = useState({ sections: [] });
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/4096927f-7f06-4024-9988-85c1f660c680"
        );

        // Transform the API response to match the expected structure
        const formattedData = {
          sections: [
            {
              inputs: response.data, // Wrapping the API response in `inputs`
            },
          ],
        };

        setFormData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFormData({ sections: [] }); // Ensure sections is always defined
      }
    };
    fetchFormData();
  }, []);

  const handleChange = (e, id, isMultiSelect = false) => {
    const value = isMultiSelect
      ? Array.from(e.target.selectedOptions, (option) => option.value)
      : e.target.value;
    setFormValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
  };

  return (
    <div className="filter-container">
      <form className="filter-form" onSubmit={handleSubmit}>
        {/* Ensure formData.sections is defined before mapping */}
        {Array.isArray(formData.sections) &&
          formData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="form-row">
              {Array.isArray(section.inputs) &&
                section.inputs.map((input, inputIndex) => (
                  <div key={inputIndex} className="form-group">
                    {/* <label>
                      {input.label}
                      {input.required && <span>*</span>}
                    </label> */}
                    {input.type === "select" ? (
                      <select
                        value={formValues[input.id] || ""}
                        onChange={(e) => handleChange(e, input.id)}
                        required={input.required}
                      >
                        <option value="">Select {input.label}</option>
                        {Array.isArray(input.options) &&
                          input.options.map((option, index) => (
                            <option
                              key={index}
                              value={option.id || option.label || option}
                            >
                              {option.label || option}
                            </option>
                          ))}
                      </select>
                    ) : input.type === "multi-select" ? (
                      <select
                        multiple
                        value={formValues[input.id] || []}
                        onChange={(e) => handleChange(e, input.id, true)}
                        required={input.required}
                      >
                        {Array.isArray(input.options) &&
                          input.options.map((option, index) => (
                            <option
                              key={index}
                              value={option.id || option.label || option}
                            >
                              {option.label || option}
                            </option>
                          ))}
                      </select>
                    ) : input.type === "textarea" ? (
                      <textarea
                        value={formValues[input.id] || ""}
                        onChange={(e) => handleChange(e, input.id)}
                        required={input.required}
                        rows="4"
                      ></textarea>
                    ) : (
                      <input
                        type={input.type}
                        value={formValues[input.id] || ""}
                        onChange={(e) => handleChange(e, input.id)}
                        required={input.required}
                        placeholder={input.placeholder}
                      />
                    )}
                  </div>
                ))}
            </div>
          ))}

        {/* Create Button */}
        <div className="submit-btn">
          <button
            type="button"
            className="submit-button"
            onClick={() => navigate("/Ticket/CreateTicket")}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
