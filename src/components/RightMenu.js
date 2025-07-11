/**/
import React, { useState } from 'react';

function RightMenu() {
  const [activeTab, setActiveTab] = useState('settings');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="right-menu">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          Settings
        </button>
        <button
          className={`tab ${activeTab === 'extensions' ? 'active' : ''}`}
          onClick={() => handleTabClick('extensions')}
        >
          Extensions
        </button>
      </div>

      <div className="tab-content active" style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
        <h2>Settings</h2>
        <ul>
          <li>Theme</li>
          <li>Font Size</li>
          <li>Keybindings</li>
        </ul>
      </div>

      <div className="tab-content" style={{ display: activeTab === 'extensions' ? 'block' : 'none' }}>
        <h2>Extensions</h2>
        <ul>
          <li>Ext1</li>
          <li>Ext2</li>
          <li>Other</li>
        </ul>
      </div>
    </div>
  );
}

export default RightMenu;