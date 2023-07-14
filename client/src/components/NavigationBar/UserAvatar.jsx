import React, { useEffect, useState } from "react";
import "../../css/Navbar.css";
import apiServer from "../../config/apiServer";

const UserAvatar = ({id}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await apiServer.get(`/user/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const foundUser = JSON.parse(userData);
      //   console.log(foundUser)
      setUser(foundUser);
    };
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="user-avatar">
      {user && user.name && user.name.length > 1
        ? `${user.name[0]}${user.name[1]}`.toUpperCase()
        : "NA"}
    </div>
  );
};

export  default UserAvatar;
