import axios from "axios";
import { IUser } from "../types/userType";

const apiUrl = "http://localhost:3001/despesas";

//Expenses
export async function getExpenses() {
  const response = await axios.get(apiUrl);
  return response.data;
}

//Users

export async function getUserEndpoint(): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: "include",
  });
  return handleResponse(resp);
}

export async function signInEndpoint(
  email: string,
  password: string
): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/criar`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha: password }),
  });
  return handleResponse(resp);
}

export async function signOutEndpoint(): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/finalizar`, {
    credentials: "include",
    method: "POST",
  });
  return handleResponse(resp);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
