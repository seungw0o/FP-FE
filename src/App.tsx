import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

interface User {
  name: string;
  age: number;
  email: string;
  _id: string;
}

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userList, setUserList] = useState<boolean>(false);
  const [shouldFetchUsers, setShouldFetchUsers] = useState<boolean>(true);

  useEffect(() => {
    if (shouldFetchUsers) {
      axios
        .get("http://localhost:4000/api/users")
        .then((res) => {
          setUsers(res.data);
          setUserList(true);
          setShouldFetchUsers(false);
        })
        .catch((err) => {
          console.log(err);
          setShouldFetchUsers(false);
        });
    }
  }, [shouldFetchUsers]);

  const onSubmit = () => {
    axios
      .post("http://localhost:4000/api/users/fake")
      .then((res) => {
        console.log(res);
        setShouldFetchUsers(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUser = () => {
    setUserList(!userList);
  };

  const onDelete = (id: string) => {
    axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then((res) => {
        console.log(res);
        setShouldFetchUsers(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Div>
      <Container>
        <Button onClick={onSubmit}>make random data</Button>
        <Button onClick={onUser}>view userList</Button>
      </Container>

      {userList &&
        users.map((user) => (
          <ContainerUserList key={user._id}>
            <p>{user.name}</p>
            <p>{user.age}</p>
            <p>{user.email}</p>
            <P onClick={() => onDelete(user._id)}>Delete</P>
          </ContainerUserList>
        ))}
    </Div>
  );
};

const ContainerUserList = styled.div`
  display: flex;
  gap: 2rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 300px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const P = styled.p`
  cursor: pointer;
  color: red;
`;
