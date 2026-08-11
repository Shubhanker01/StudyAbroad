import { useState, useEffect } from "react";
import { getDashboardData } from '../services/dashboard';
export function useDashboardData() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getDashboardData();
                const json = await res.data
                console.log(json.data)
                setData(json.data);
            } catch (err) {
                setError(err.message || "Failed to fetch dashboard data");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return { data, isLoading, error };
}