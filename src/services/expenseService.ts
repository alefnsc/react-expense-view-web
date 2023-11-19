import axios from "axios";

const apiUrl = "http://localhost:3001";
export async function getExpenses() {
  const response = await axios.get(`${apiUrl}/despesas`);
  return response.data;
}
