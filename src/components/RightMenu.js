import React, { useState } from 'react';
import Tabs from './Tabs';
import Assistant from './Assistant';

function RightMenu() {
  const [activeTab, setActiveTab] = useState('assistant');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabsData = [
    { id: 'assistant', label: 'Assistant' },
  ];

  return (
    <div className="right-menu">
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabsData={tabsData} />

      <div className="tab-content" style={{ display: activeTab === 'assistant' ? 'block' : 'none' }}>
        <Assistant />
      </div>
    </div>
  );
}

export default RightMenu;