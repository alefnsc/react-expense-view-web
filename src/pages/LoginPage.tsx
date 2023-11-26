import { Box, Button, Container, TextField } from "@mui/material";
import { signInEndpoint } from "../services/backend";
import { useState } from "react";
import { IUser } from "../types/userType";

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginPage(props: ILoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    console.log("signIn");
    signInEndpoint(email, password).then(
      (user) => {
        console.log(user);
        props.onSignIn(user);
      },
      () => setError("Invalid credentials")
    );
  }
  return (
    <Container>
      <h2 className=" text-gray-700  text-4xl mb-5 col-span-2">
        React Expense View
      </h2>
      <Box className="border-gray-400 border-3 bg-gradient-to-br from-green-200 via-white to-green-200 rounded-2xl shadow-2xl grid grid-row-2 gap-1 border sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px]  w-full p-6 space-x-6 ">
        <Box className="col-start-1  rounded-lg ">
          <h2 className="text-gray-900  text-3xl p-6">Login Page</h2>
          <p className=" text-gray-700 p-4 text-2xl">
            We help you to get under control!
          </p>
        </Box>
        <Box className="col-start-2 ">
          <h2 className="text-gray-800  text-xl p-4">
            Please Enter your credentials:
          </h2>
          <form
            onSubmit={signIn}
            className="flex flex-1 flex-col space-y-6"
            id="login"
            name="login"
          >
            <TextField
              type="text"
              label="Email"
              variant="outlined"
              color="success"
              onChange={(evt) => setEmail(evt.target.value)}
              value={email}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              color="success"
              onChange={(evt) => setPassword(evt.target.value)}
              value={password}
            ></TextField>
            {error && (
              <Box className="bg-red-100 rounded-md p-4 my-4">{error}</Box>
            )}
            <Button
              variant="contained"
              color="success"
              type="submit"
              className="bg-green-600 p-6"
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
