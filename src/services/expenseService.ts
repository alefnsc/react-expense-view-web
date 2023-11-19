import axios from "axios";

const apiUrl = "https://react-expense-view-api-afonseca.glitch.me/api";

export async function getExpenses() {
  const url = `${apiUrl}/?_sort=mes,dia`;
  // if (yearMonth) {
  //   url += `?mes=${yearMonth}&_sort=dia`;
  // } else {
  //   url += "?_sort=dia";
  // }
  const response = await axios.get(url);
  return response.data;
}
