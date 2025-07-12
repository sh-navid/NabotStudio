import React, { useState } from 'react';
import Tabs from './Tabs';

function Sidebar() {
  const [activeTab, setActiveTab] = useState('files');

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
        <h2>Project</h2>
        <ul>
          <li>index.js</li>
          <li>App.js</li>
          <li>index.html</li>
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