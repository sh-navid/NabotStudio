import { useState, useEffect } from "react";
import Tabs from "./Tabs";
import { fetchProjects, fetchFileStructure } from "../services/projectService";
import { getFilePath } from "../helpers/fileHelper";

function Sidebar({ onProjectSelect, onFileSelect }) {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [fileStructure, setFileStructure] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (e) {
        setError(e.message);
        console.error("Could not fetch projects:", e);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    const loadFileStructure = async () => {
      if (selectedProject) {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchFileStructure(selectedProject.name);
          setFileStructure(data);
        } catch (e) {
          setError(e.message);
          console.error("Could not fetch file structure:", e);
          setFileStructure(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFileStructure(null);
      }
    };

    loadFileStructure();
  }, [selectedProject]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onProjectSelect(project);
  };

  const handleFileClick = (item) => {
    if (selectedProject) {
      const filePath = getFilePath(item, selectedProject.path);
      onFileSelect({
        path: filePath,
        project: selectedProject.name,
      });
    }
  };

  const renderFileStructure = (structure, parent = null) => {
    if (!structure || structure.length === 0) {
      return <li>No files found.</li>;
    }

    return structure.map((item, index) => {
      item.parent = parent;
      return (
        <li key={index}>
          {item.type === "directory" ? (
            <>
              {item.name}
              <ul>{renderFileStructure(item.children, item)}</ul>
            </>
          ) : (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFileClick(item);
              }}
            >
              {item.name}
            </a>
          )}
        </li>
      );
    });
  };

  const tabsData = [
    { id: "projects", label: "Projects" },
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
                className={
                  selectedProject?.name === project.name ? "active" : ""
                }
              >
                {project.name} (Port: {project.port}, Running:{" "}
                {project.running ? "Yes" : "No"})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;