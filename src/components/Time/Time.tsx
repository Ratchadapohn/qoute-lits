"use client";

import React, { useState, useEffect } from "react";
import "./Time.css";

interface TimeProps {
  format?: "12-hour" | "24-hour";
}

const Time: React.FC<TimeProps> = ({ format = "24-hour" }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;
      setCurrentTime(formattedTime);
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <div className="time">{currentTime}</div>;
};

export default Time;
