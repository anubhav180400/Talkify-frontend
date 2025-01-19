import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, cacheKey) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url,{withCredentials:true});
       
    
        // console.log("response from frontend is",response)
       
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
        //   const json = await response.json();
          setData(response.data);
        } else {
          throw new Error('Response is not JSON');
        }
      } catch (err) {
        // console.log("error message is ",error)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheKey]);

  return { data, loading, error };
};

export default useFetchData;