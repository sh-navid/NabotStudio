/**/
import React from 'react';

function Tabs({ activeTab, onTabClick, tabsData }) {
  return (
    <div className="tabs">
      {tabsData.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;