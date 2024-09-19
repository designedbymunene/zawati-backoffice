import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import { UserCredentials } from "@/app/(auth)/login/_services/login.services";

const useSessionCookie = () => {
  const [sessionCookie, setSessionCookie] = useState<UserCredentials | null>(
    null
  );

  // Read operation - Retrieve session cookie from the browser
  useEffect(() => {
    const cookieData = Cookies.get("sessionCookie");
    if (cookieData) {
      setSessionCookie(JSON.parse(cookieData));
    }
  }, []);

  // Create operation - Set session cookie in the browser
  const createSessionCookie = (data: UserCredentials) => {
    Cookies.set("sessionCookie", JSON.stringify(data), { expires: 2 });
    setSessionCookie(data);
  };

  // Update operation - Update session cookie in the browser
  const updateSessionCookie = (updatedData: Partial<UserCredentials>) => {
    if (sessionCookie) {
      const newSessionCookie = { ...sessionCookie, ...updatedData };
      Cookies.set("sessionCookie", JSON.stringify(newSessionCookie), {
        expires: 2,
      });
      setSessionCookie(newSessionCookie);
    }
  };

  // Delete operation - Remove session cookie from the browser
  const deleteSessionCookie = () => {
    Cookies.remove("sessionCookie");
    setSessionCookie(null);
  };

  return {
    sessionCookie,
    createSessionCookie,
    updateSessionCookie,
    deleteSessionCookie,
  };
};

export default useSessionCookie;
