import { useState } from "react";
import type { TakenStatus } from "./types";

export const useToday = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("medicine");
    return saved ? JSON.parse(saved) : {};
  });

  const todayKey = new Date().toISOString().slice(0, 10);

  const status = data[todayKey] || {
    morning: false,
    noon: false,
    night: false,
  };

const toggle = (date: string, key: keyof TakenStatus) => {
  const current = data[date] || {
    morning: false,
    noon: false,
    night: false,
  };

    const newStatus = {
    ...current,
    [key]: !current[key],
  };

  const newData = {
    ...data,
    [date]: newStatus,
  };


    setData(newData);
    localStorage.setItem("medicine", JSON.stringify(newData));
  };

  return { status, toggle ,data };
};