const CabTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['pending', 'approved', 'completed', 'cancelled'];
  return (
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};
