import axios from "axios";
import { useEffect, useState } from "react";

export const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);

            try {
                const response = await axios.get(url, {
                    cancelToken: source.token,
                });

                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (e) {
                if (isMounted) {
                    setFetchError(e.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        fetchData(dataUrl);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [dataUrl]);

    return { data, fetchError, isLoading };
};
