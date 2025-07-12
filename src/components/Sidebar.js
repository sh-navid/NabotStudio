import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";

function Sidebar({ onProjectSelect }) {
    const [activeTab, setActiveTab] = useState("projects");
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [fileStructure, setFileStructure] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        const fetchFileStructure = async (projectPath) => {
            if (!projectPath) return;

            setIsLoading(true);
            setFileStructure(null); // Reset file structure on new project selection
            try {
                const response = await fetch(
                    `http://localhost:4000/files?path=${projectPath}`
                );
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData?.error || 'Unknown error'}`);
                }
                const data = await response.json();
                setFileStructure(data);

            } catch (e) {
                setError(e.message);
                console.error("Could not fetch file structure:", e);

            } finally {
                setIsLoading(false);
            }
        };

        if (selectedProject) {
            fetchFileStructure(selectedProject.path);
        } else {
            setFileStructure(null);
        }
    }, [selectedProject]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        onProjectSelect(project);
    };

    const renderFileStructure = (structure) => {
        if (!structure || structure.length === 0) {
            return <li>No files found.</li>;
        }

        return structure.map((item, index) => (
            <li key={index}>
                {item.type === "directory" ? (
                    <>
                        {item.name}
                        <ul>{renderFileStructure(item.children)}</ul>
                    </>
                ) : (
                    item.name
                )}
            </li>
        ));
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
                {selectedProject ? (
                    <div>
                        <h3>{selectedProject.name}</h3>
                        {error && <div className="error">Error: {error}</div>} {/* Display error */}
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