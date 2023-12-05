
import axios from "axios";

// Fetch user data from the server
const getUser = (setUserData, setLoading) => {
    axios
      .get("http://localhost:3030/user/profile", { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  };
  export { getUser };