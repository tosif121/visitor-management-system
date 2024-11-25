const Notifications = () => {
  return (
    <div className="relative">
      <FontAwesomeIcon icon={faBell} className="text-gray-600" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
    </div>
  );
};
