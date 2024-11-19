import React, { useState, useEffect } from "react";
import { fetchCurrencyAlerts } from "../services/fireStoreService"; // Import the service function
import AlertListItem from "./AlertListItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 10; // Number of alerts per page

const RateAlertHistory: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const fetchedAlerts = await fetchCurrencyAlerts();
        setAlerts(fetchedAlerts);
        setError(null);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setError("Failed to fetch alerts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return <p>Loading alerts...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Calculate the start and end indices for slicing alerts
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice alerts for the current page
  const currentAlerts = alerts.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);

  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate condensed page numbers
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if total pages are <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Condensed pagination logic
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col w-full justify-center gap-6">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold text-sm opacity-75">Previous alerts</p>
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 rounded-md ${
              currentPage === 1 ? "cursor-not-allowed" : "hover:bg-[#7265EE]"
            }`}
          >
            <FaAngleLeft />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === page
                    ? "bg-[#7265EE] text-white"
                    : "hover:bg-[#7265EE]"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 text-gray-500">
                {page}
              </span>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-md ${
              currentPage === totalPages
                ? "cursor-not-allowed"
                : "hover:bg-[#7265EE]"
            }`}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
      {currentAlerts.length ? (
        <div className="flex flex-col w-full gap-6">
          {currentAlerts.map((alert) => (
            <AlertListItem key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <p>No alerts found.</p>
      )}
    </div>
  );
};

export default RateAlertHistory;
