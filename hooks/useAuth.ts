"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      window.location.href = "/login";
      return;
    }

    setToken(storedToken);
  }, []);

  return token;
}