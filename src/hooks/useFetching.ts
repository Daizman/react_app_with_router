import axios from "axios";
import { useState } from "react";

type useFetchingReturn = [(...args: any[]) => Promise<void>, boolean, string];

export const useFetching = (callback: (...args: any[]) => Promise<void> | void) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            if(e instanceof Error || axios.isAxiosError(e)) {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    let returnTup: useFetchingReturn = [fetching, isLoading, error];
    return returnTup;
};