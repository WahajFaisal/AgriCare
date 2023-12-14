import { backendUrl } from "./data";

let users = [];

const getData = async () => {
  try {
    users = [];
    const res = await fetch(`${backendUrl}admin/user/allUsers`, {
      method: "GET",
    });
    // console.log(res);
    const json = await res.json();
    const userz = json.data;
    if (res.status !== 201) alert("Error");
    userz.map((user) => {
      users.push(user);
    });
    // console.log(users);
    return users;
  } catch (err) {
    console.log(err);
  }
};
export default getData;
