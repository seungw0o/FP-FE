import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  age: number;
  email: string;
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.map((user: User, index) => (
        <div key={index}>
          <p>{user.name}</p>
          <p>{user.age}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};
