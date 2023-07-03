import React, { useEffect, useState } from "react";
import "../../css/Navbar.css";
import apiServer from "../../config/apiServer";

const UserAvatar = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const getUser = async (id) => {
    const res = await apiServer.get(`/users/${id}`);
    setUser(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <div className="user-avatar">
      {(user.name[0] + user.name[1]).toUpperCase()}
    </div>
  );
};

export default UserAvatar;
