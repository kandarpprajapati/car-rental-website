import { useEffect, useState } from "react";
import { useExportTodayBookings } from "../hooks/bookings/useExportTodaysBooking";
import { getUserRole } from "../utils/auth";

const ExportBookingsButton = () => {
  const { mutateAsync } = useExportTodayBookings();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleExport = async () => {
    setLoading(true);

    try {
      await mutateAsync(); // Wait for the export to complete
    } catch (error) {
      console.error("Export failed:", error);
      // Optionally show a toast or handle error as needed
    } finally {
      setLoading(false); // Reset loading state after the operation is complete
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto mt-5">
      <button
        onClick={handleExport}
        disabled={loading}
        className="bg-secondary-foreground text-white px-4 py-2 rounded hover:bg-secondary-foreground/80"
      >
        {loading ? "Exporting..." : "Export Today's Bookings"}
      </button>
    </div>
  );
};

export default ExportBookingsButton;
