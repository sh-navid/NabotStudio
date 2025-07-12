import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';

function Sidebar() {
    const [activeTab, setActiveTab] = useState('files');
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:4000/status');
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

    const tabsData = [
        { id: 'files', label: 'Project' },
        { id: 'explorer', label: 'Data' },
    ];

    return (
        <div className="sidebar">
            <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabsData={tabsData} />
            <div className="tab-content" style={{ display: activeTab === 'files' ? 'block' : 'none' }}>
                <h2>Projects</h2>
                {error && <div className="error">Error: {error}</div>}
                <ul>
                    {projects.map(project => (
                        <li key={project.name}>{project.name} (Port: {project.port}, Running: {project.running ? 'Yes' : 'No'})</li>
                    ))}
                </ul>
            </div>

            <div className="tab-content" style={{ display: activeTab === 'explorer' ? 'block' : 'none' }}>
                <h2>Data</h2>
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