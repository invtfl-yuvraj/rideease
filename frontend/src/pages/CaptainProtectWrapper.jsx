import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);

  const {setCaptain, updateCaptain} = useContext(CaptainDataContext)

  useEffect(() => {
    if (!token || token === null) {
      navigate("/captain-login");
    }else{
      axios
    .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCaptain(response.data.data)
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/captain-login");
    });
    }
  }, [token, navigate, setCaptain]);

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
