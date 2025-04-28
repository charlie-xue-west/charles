"use client";

import { fetchUserInfo } from "../../../../api";
import { login, loginError, logout, setUser } from "@lib/redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetchUserInfo();

      if (response.status === "success") {
        dispatch(setUser(response.data.user));
        dispatch(login());
      } else {
        dispatch(logout());
      }

      if (response.error) dispatch(loginError(response.error.message));
    };

    getUserInfo();
  }, [dispatch]);

  return null;
};
