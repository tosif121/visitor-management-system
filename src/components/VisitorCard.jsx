export default VisitorCard = ({ visitor }) => {
  return (
    <div className="border p-4 rounded-lg bg-white">
      <h3 className="font-semibold text-lg">{visitor.name}</h3>
      <p>Host: {visitor.host}</p>
      <p>Check-in: {visitor.checkInTime}</p>
      <p>Check-out: {visitor.checkOutTime}</p>
      <p>Badge #: {visitor.badgeNumber}</p>
    </div>
  );
};
