import React, { useState } from 'react';
import Tabs from './Tabs';
import Assistant from './Assistant'; // Import the new Assistant component

function RightMenu() {
  const [activeTab, setActiveTab] = useState('assistant'); // Changed default to 'assistant'

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabsData = [
    { id: 'assistant', label: 'Assistant' }, // Changed 'settings' to 'assistant'
  ];

  return (
    <div className="right-menu">
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabsData={tabsData} />

      {/* Render the Assistant component when the 'assistant' tab is active */}
      <div className="tab-content" style={{ display: activeTab === 'assistant' ? 'block' : 'none' }}>
        <Assistant />
      </div>
    </div>
  );
}

export default RightMenu;