import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

export const useLogoutConfirmation = () => {
 const {  logout } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const requestLogout = () => setIsModalVisible(true);

  const confirmLogout = () => {
    setIsModalVisible(false);
    logout();
  };

  const cancelLogout = () => setIsModalVisible(false);

  return {
    isModalVisible,
    requestLogout,
    confirmLogout,
    cancelLogout,
  };
};
