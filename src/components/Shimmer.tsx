import React from "react";

interface ShimmerProps {
  className?: string;
}

const Shimmer: React.FC<ShimmerProps> = ({ className = "" }) => {
  return (
    <div className={`bg-[#222222] relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-[#222222] via-gray-400 to-[#222222] opacity-20"></div>
    </div>
  );
};

export default Shimmer;
