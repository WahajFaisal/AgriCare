import axios from "axios";
import { backendUrl } from "./data";

const getData = async () => {
  let products;
  try {
    const resp = await axios.get(`${backendUrl}buyer/crop/all`);
    console.log(resp.data.data);
    products = resp.data.data;
    console.log(products);
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default getData;
