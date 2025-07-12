import { useState, useEffect } from "react";
import Tabs from "./Tabs";

function Sidebar({ onProjectSelect, onFileSelect }) {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [fileStructure, setFileStructure] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects...");
        const response = await fetch("http://localhost:4000/status");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Projects data:", data);
        setProjects(data);
      } catch (e) {
        setError(e.message);
        console.error("Could not fetch projects:", e);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchFileStructure = async () => {
      if (selectedProject) {
        console.log(selectedProject);

        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://localhost:4000/files?path=${selectedProject.name}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
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

    fetchFileStructure();
  }, [selectedProject]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleProjectClick = (project) => {
    console.log("Selected project:", project);
    setSelectedProject(project);
    onProjectSelect(project);
    setActiveTab("explorer");
  };

  const handleFileClick = (item) => {
    console.log(item)
    if (selectedProject) {
      // Pass selectedProject.path as basePath and selectedProject.name for projectName
      const filePath = getFilePath(item, selectedProject.path);
      onFileSelect({
        path: filePath,
        project: selectedProject.name, // Pass project name to onFileSelect
      });
    }
  };

  const getFilePath = (item, basePath) => {
    let path = item.name;
    let parent = item.parent;

    // Build the path by traversing up the parent chain
    while (parent && parent.name) {
      path = `${parent.name}/${path}`;
      parent = parent.parent;
    }
    // Prepend the base path
    return `${path}`;
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

      <div
        className="tab-content"
        style={{ display: activeTab === "explorer" ? "block" : "none" }}
      >
        <h2>Explorer</h2>
        {selectedProject ? (
          <div>
            <h3>{selectedProject.name}</h3>
            {error && <div className="error">Error: {error}</div>}
            <ul>
              {isLoading ? (
                <li>Loading...</li>
              ) : fileStructure === null || fileStructure.length === 0 ? (
                <li>No files found.</li>
              ) : (
                renderFileStructure(fileStructure)
              )}
            </ul>
          </div>
        ) : (
          <p>Select a project to view its file structure.</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;