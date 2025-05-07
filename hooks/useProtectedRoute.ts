import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const useProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // 🔒 Wait for session to load

    if (!user) {
      console.log("🔁 No user, redirecting to auth...");
      router.replace("/(auth)");
    }
  }, [user, loading]);

  return { user, loading };
};
