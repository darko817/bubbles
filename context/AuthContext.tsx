import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  name: string;
  email?: string;
  phone?: string
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => { },
  logout: async () => { },
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // This effect runs once, on app start, to load the session from AsyncStorage
  useEffect(() => {
    const loadSession = async () => {
      console.log("⏳ Loading session...");

      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");

        console.log("✅ Stored user:", storedUser);
        console.log("✅ Stored token:", storedToken);

        if (storedUser && storedToken) {
          // If we have user and token data, update the state
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (e) {
        console.error("❌ Failed to load auth data:", e);
      } finally {
        if (loading) {
          // Avoid unnecessary update if already set to false
          console.log("✅ Finished loading session");
          setLoading(false); // Once loading is done, set loading to false
        }
      }
    };

    loadSession();
  }, []);

  const login = async (userData: User, authToken: string) => {
    try {
      console.log("Logging in with:", userData, authToken);

      setUser(userData);
      setToken(authToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("token", authToken);
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
