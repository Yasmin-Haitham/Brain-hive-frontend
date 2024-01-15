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
const getCourses = (setCards) => {
  axios
    .get("http://localhost:3030/courses")
    .then((res) => setCards(res.data))
    .catch((error) =>
      console.error("Error fetching data from Contentful:", error)
    );
};
const getProfileCourses = (userCoursesArray, setCourses, setError) => {
  axios
    .get("http://localhost:3030/courses/profileCourses", {
      params: { userCourses: userCoursesArray.join(',') },
    })
    .then((res) => setCourses(res.data))
    .catch((err) => setError("Error fetching courses"));
};

export { getUser, getCourses, getProfileCourses };
