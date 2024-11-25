const CabRequestsTable = ({ cabRequests }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Visitor Name</th>
            <th className="px-4 py-2">Pickup Location</th>
            <th className="px-4 py-2">Drop Location</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {cabRequests.map((request) => (
            <tr key={request.id} className="border-b">
              <td className="px-4 py-2">{request.visitorName}</td>
              <td className="px-4 py-2">{request.pickupLocation}</td>
              <td className="px-4 py-2">{request.dropLocation}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-lg ${
                    request.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : request.status === 'approved'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {request.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
