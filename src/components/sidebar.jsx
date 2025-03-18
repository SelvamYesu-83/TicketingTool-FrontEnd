import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, PORTS } from "../services/apiService";
import OverView from "../assets/Dashboard-icon.png";
import Ticket from "../assets/Ticket-icon.png";
import Report from "../assets/Report-icon.png";
import Settings from "../assets/settings.png"; 
import "../style/sidebar.css";

// Function to map API `moduleIconName` to local images
const getIcon = (iconName) => {
  const icons = {
    cilArrowLeft: Ticket,
    cilSettings: Settings,
    cilReport: Report,
    cilDashboard: OverView,
  };
  return icons[iconName] || OverView; // Default to OverView if icon not found
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Function to ensure correct absolute path navigation
  const handleNavigate = (route) => {
    navigate(route, { replace: true }); // ✅ Forces absolute navigation
  };

  // ✅ Fetch RBAC modules
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await apiService.get(PORTS.rbac, "/api/rbac");
        if (response.status && response.data) {
          const extractedModules = response.data.flatMap(group => group.modules);
          setModules(extractedModules);
        } else {
          setError("Failed to load modules");
        }
      } catch (err) {
        setError("Error fetching modules");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          modules.map((module, index) => (
            <div key={index} className="module-container">
              {/* ✅ Main Module */}
              <button 
                className="nav-item main-menu" 
                onClick={() => handleNavigate(`/ticket/${module.moduleKey}/view`)}
              >
                <img src={getIcon(module.moduleIconName)} alt={module.moduleName} className="icon" />
                <span>{module.moduleName}</span>
              </button>

              {/* ✅ Submodules */}
              {module.subModules && module.subModules.length > 0 && (
                <ul className="submenu">
                  {module.subModules.map((sub, subIndex) => (
                    <li key={subIndex} className="sub-menu-item">
                      <button 
                        className="sub-menu-btn" 
                        onClick={() => handleNavigate(`/${sub.subModuleKey}`)}
                      >
                        <img src={getIcon(sub.subModuleIconName)} alt={sub.subModuleName} className="icon" />
                        {sub.subModuleName}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
