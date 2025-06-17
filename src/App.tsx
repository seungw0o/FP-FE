import { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

export const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    console.log(name, age, email);
    axios
      .post("http://localhost:4000/api/users/fake", { name, age, email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Div>
      <Container>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <Input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="age"
        />
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Container>
    </Div>
  );
};

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

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
