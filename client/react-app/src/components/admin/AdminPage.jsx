import React, { useState, useEffect } from 'react';
import { getFirst } from '../../services/AdminService';
import { useNavigate } from "react-router-dom";

function AdminPage() {
    const [data, setData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFirst();
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/')
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
      }

  return (
    <div>
      <h1>Admin page</h1>
      <h4>{data}</h4>
    </div>
  );

};

export default AdminPage;