export default Sidebar = ({ role }) => {
  return (
    <aside className="bg-white shadow-lg w-64 p-4">
      <ul>
        {role === 'admin' && (
          <li className="px-4 py-2">
            <a href="/admin-dashboard">Admin Dashboard</a>
          </li>
        )}
        {role !== 'admin' && (
          <li className="px-4 py-2">
            <a href="/visitor-management">Visitor Management</a>
          </li>
        )}
        <li className="px-4 py-2">
          <a href="/cab-management">Cab Requests</a>
        </li>
        <li className="px-4 py-2">
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </aside>
  );
};
