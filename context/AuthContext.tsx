import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Text, View } from "react-native";

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
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadSession = async () => {
      console.log("⏳ Loading session...");

      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");

        console.log("✅ Stored user:", storedUser);
        console.log("✅ Stored token:", storedToken);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (e) {
        console.error("❌ Failed to load auth data:", e);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.role === "worker") {
          router.replace("/(home)/(worker)");
        } else if (user.role === "driver") {
          router.replace("/(home)/(driver)");
        } else if (user.role === "client") {
          router.replace("/(home)");
        }
      } else {
        router.replace("/(auth)");
      }
    }
  }, [user, loading]);

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
      console.log("🚪 Logging out...");
      await AsyncStorage.multiRemove(["user", "token"]);
      setUser(null);
      setToken(null);

      setTimeout(() => {
        router.replace("/(auth)");
      }, 100);
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
