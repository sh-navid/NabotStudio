import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";

function Sidebar({ onProjectSelect }) {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/status");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (e) {
        setError(e.message);
        console.error("Could not fetch projects:", e);
      }
    };

    fetchProjects();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onProjectSelect(project);
  };

  const tabsData = [
    { id: "projects", label: "Project" },
    { id: "explorer", label: "Explorer" },
  ];

  return (
    <div className="sidebar">
      <Tabs
        activeTab={activeTab}
        onTabClick={handleTabClick}
        tabsData={tabsData}
      />
      <div
        className="tab-content"
        style={{ display: activeTab === "projects" ? "block" : "none" }}
      >
        <h2>Projects</h2>
        {selectedProject && (
          <div className="selected-project">
            Selected Project: {selectedProject.name}
          </div>
        )}
        {error && <div className="error">Error: {error}</div>}
        <ul>
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleProjectClick(project);
                }}
                className={selectedProject?.name === project.name ? "active" : ""}
              >
                {project.name} (Port: {project.port}, Running:{" "}
                {project.running ? "Yes" : "No"})
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="tab-content"
        style={{ display: activeTab === "explorer" ? "block" : "none" }}
      >
        <h2>Explorer</h2>
        <ul>
          <li>src</li>
          <li>public</li>
          <li>.gitignore</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;