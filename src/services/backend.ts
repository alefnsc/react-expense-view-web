import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/userType";

const apiUrl = "http://localhost:3001/despesas";

// Expenses
export async function getExpenses() {
  const url = `${apiUrl}/?_sort=mes,dia,valor`;
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
}

// Users

export async function getUserEndpoint(): Promise<IUser> {
  const resp = await axios.get(`http://localhost:3001/sessao/usuario`, {
    withCredentials: true,
  });
  return handleResponse(resp);
}

export async function signInEndpoint(
  email: string,
  password: string
): Promise<IUser> {
  const resp = await axios.post(
    `http://localhost:3001/sessao/criar`,
    {
      email,
      senha: password,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return handleResponse(resp);
}

export async function signOutEndpoint(): Promise<IUser> {
  const resp = await axios.post(
    `http://localhost:3001/sessao/finalizar`,
    null,
    {
      withCredentials: true,
    }
  );
  return handleResponse(resp);
}

function handleResponse(resp: AxiosResponse<IUser>) {
  if (resp.status === 200) {
    return resp.data;
  } else {
    throw new Error(resp.statusText);
  }
}
