import React, { useEffect } from 'react';
import axios from 'axios';

const config = {
  clientId: 'bd7bb4c4-cfec-4966-aad9-4c060be248fd',
  clientSecret: 'l_T8Q~B5oXJH7dEbbZ0viZIHV.M1.PrcJkaMHa9B',
  tenantId: '69da0b2f-3247-4ba8-887f-60a8068691f2',
  endpoints: {
    api: 'https://graph.microsoft.com', // Replace with the API you want to access
  },
};

const getToken = async () => {
  const tokenEndpoint = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', config.clientId);
  params.append('client_secret', config.clientSecret);
  params.append('scope', `${config.endpoints.api}/.default`);

  try {
    const response = await axios.post(tokenEndpoint, params);
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

const AzureApp = () => {
  useEffect(() => {
    getToken(); // Initial token acquisition
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${config.endpoints.api}/v1.0/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default AzureApp;
