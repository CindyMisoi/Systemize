import React, { useEffect, useState } from "react";
import "../../css/Navbar.css";
import apiServer from "../../config/apiServer";

const UserAvatar = ({ id, name, email }) => {
  const [loading, setLoading] = useState(true);
  const [initials, setInitials] = useState("NA");

  const getInitials = (name) => {
    if (!name) return "NA";

    const nameArray = name.trim().split(" ");
    if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    } else {
      return (
        nameArray[0].charAt(0).toUpperCase() +
        nameArray[nameArray.length - 1].charAt(0).toUpperCase()
      );
    }
  };

  useEffect(() => {
    if (name) {
      setInitials(getInitials(name));
      setLoading(false);
    } else {
      setLoading(true);
      const fetchUser = async () => {
        try {
          const response = await apiServer.get(`/user/${id}`);
          const user = response.data;
          setInitials(getInitials(user.name || user.email));
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, name]);

  if (loading) {
    return <div>Loading..</div>;
  }

  return <div className="user-avatar">{initials}</div>;
};

export default UserAvatar;

