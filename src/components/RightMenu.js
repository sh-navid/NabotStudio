/**/
import React, { useState } from 'react';
import Tabs from './Tabs';

function RightMenu() {
  const [activeTab, setActiveTab] = useState('settings');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabsData = [
    { id: 'settings', label: 'Settings' },
    { id: 'extensions', label: 'Extensions' },
  ];

  return (
    <div className="right-menu">
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabsData={tabsData} />

      <div className="tab-content" style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
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