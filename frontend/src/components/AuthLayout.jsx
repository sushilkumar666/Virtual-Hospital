import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const identity = useSelector((state) => state.auth.identity);

  useEffect(() => {
    if (authStatus === false) {
      navigate("/login");
    }

    setLoader(false);
  }, [authStatus, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
