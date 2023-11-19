import axios from "axios";

const apiUrl = "http://localhost:3001";

export async function getExpenses(yearMonth?: string) {
  const url = `${apiUrl}/despesas?_sort=mes,dia`;
  // if (yearMonth) {
  //   url += `?mes=${yearMonth}&_sort=dia`;
  // } else {
  //   url += "?_sort=dia";
  // }
  const response = await axios.get(url);
  return response.data;
}
