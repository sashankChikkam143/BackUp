import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Oopbrowse({ clientid, userid }) {
    const getRootId = async () => {
        try {
          const response = await axios.get(`/clients/${clientid}/users/${userid}/getrootid`);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    const getChildren = async (folderId) => {
        try {
          const response = await axios.get(`/clients/${clientid}/users/${userid}/getchildren/${folderId}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

  useEffect(() => {
    getRootId();
    //getChildren();
  }, [clientid, userid]);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}

export default Oopbrowse;
