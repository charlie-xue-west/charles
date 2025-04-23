"use client";

import { fetchUserInfo } from "@lib/api";
import { login, loginError, logout, setUser } from "@lib/redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetchUserInfo();

        if (response.status === "success") {
          dispatch(setUser(response.data.user));
          dispatch(login());
        } else {
          dispatch(logout());
        }
      } catch (error: unknown) {
        dispatch(loginError(error));
      }
    };

    getUserInfo();
  }, [dispatch]);

  return null; // Nothing to render, just effects
};
