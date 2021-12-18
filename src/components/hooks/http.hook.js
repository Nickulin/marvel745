import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null) ;

    const request = useCallback(async (url, method ='GET', body= null, headers = {'Content-Type': 'application/json'})=> {
        setLoading(true);

        try {                           //пытаемся сделать запрос на сервер
            const response = await fetch(url, {method, body, headers}); //url, и настройки в {}
            
            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;
        }catch(e){
            setLoading(false);
            setError(e.message);  // выкидывает ошибку message
            throw e;
        }
    }, []);

    const clearError = useCallback(()=> setError(null), []); // выкинутую ошибку очищает

    return {loading, request, error, clearError}
}
