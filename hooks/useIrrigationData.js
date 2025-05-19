import { useEffect, useState } from "react";
import { getAllData } from "../lib/requestdata";

export const useIrrigationData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await getAllData();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();// eslint-disable-next-line no-undef
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    // eslint-disable-next-line no-undef
    return () => clearInterval(interval);
  }, []);

  return { data, loading, fetchData };
};
