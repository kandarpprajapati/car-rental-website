import { useEffect, useState } from "react";
import { useExportTodayBookings } from "../hooks/bookings/useExportTodaysBooking";
import { getUserRole } from "../utils/auth";

const ExportBookingsButton = () => {
  const { mutateAsync, isLoading, isError, error } = useExportTodayBookings();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = getUserRole(); // Assuming the role is in localStorage or JWT token
    console.log(role);
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  if (!isAdmin) {
    return null; // Don't render the button if not an admin
  }

  const handleExport = () => {
    mutateAsync();
  };

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        {isLoading ? "Exporting..." : "Export Today's Bookings"}
      </button>
    </div>
  );
};

export default ExportBookingsButton;
