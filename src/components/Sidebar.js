import React, { useState } from 'react';

function Sidebar() {
  const [activeTab, setActiveTab] = useState('files');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="sidebar">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => handleTabClick('files')}
        >
          Files
        </button>
        <button
          className={`tab ${activeTab === 'explorer' ? 'active' : ''}`}
          onClick={() => handleTabClick('explorer')}
        >
          Explorer
        </button>
      </div>

      <div className="tab-content" style={{ display: activeTab === 'files' ? 'block' : 'none' }}>
        <h2>Files</h2>
        <ul>
          <li>index.js</li>
          <li>App.js</li>
          <li>index.html</li>
        </ul>
      </div>

      <div className="tab-content" style={{ display: activeTab === 'explorer' ? 'block' : 'none' }}>
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