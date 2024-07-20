import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // Fetch all resources when the component mounts
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data);
      } catch (error) {
        console.error('Failed to fetch resources', error);
      }
    };

    fetchResources();
  }, [baseUrl]);

  // Create a new resource
  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources(resources.concat(response.data));
    } catch (error) {
      console.error('Failed to create resource', error);
    }
  };

  return [resources, { create }];
};

export default useResource;
