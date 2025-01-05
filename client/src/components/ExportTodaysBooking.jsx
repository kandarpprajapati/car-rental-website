import { useExportTodayBookings } from "../hooks/bookings/useExportTodaysBooking";

const ExportBookingsButton = () => {
  const { mutateAsync, isLoading, isError, error } = useExportTodayBookings();

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
