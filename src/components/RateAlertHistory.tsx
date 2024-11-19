import React, { useState, useEffect } from "react";
import { fetchCurrencyAlerts } from "../services/fireStoreService";
import AlertListItem from "./AlertListItem";
import Shimmer from "./Shimmer";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 10;

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
        toast.success("Alerts fetched successfully!", {
          autoClose: 2000,
          style: {
            color: "#79E7A5",
            backgroundColor: "#222222",
            borderRadius: "8px",
          },
        });
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setError("Failed to fetch alerts. Please try again.");
        toast.error("Failed to fetch alerts. Please try again.", {
          autoClose: 3000,
          style: {
            color: "#EF4444",
            backgroundColor: "#222222",
            borderRadius: "8px",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentAlerts = alerts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
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
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 rounded-md ${
              currentPage === 1 ? "cursor-not-allowed" : "hover:bg-[#7265EE]"
            }`}
          >
            <FaAngleLeft />
          </button>

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

      {loading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Shimmer
              key={index}
              className="w-full h-24 bg-[#222222] rounded-lg"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : currentAlerts.length ? (
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
