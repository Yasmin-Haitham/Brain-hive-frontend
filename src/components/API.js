import axios from "axios";
const API_BASE_URL = "http://localhost:3030";
/********************************************User API Start*********************************************************/

// Fetch user data from the server
export const getUser = async (setUserData, setUserSet, setLoading) => {
  await axios
    .get(`${API_BASE_URL}/user/profile`, { withCredentials: true })
    .then((res) => {
      setUserData(res.data);
      setUserSet(true);
      setLoading(false);
      console.log("User Data Fetched " + res.data);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching user data:", error);
    });
};

// add friend

export const addFriend = async (friendEmail) => {
  await axios
  .post(`${API_BASE_URL}/user/addFriend`, { friendEmail: friendEmail }, { withCredentials: true })
  .then((res) => console.log(res.data))
  .catch((error) => console.error("Error adding friend:", error));
};

// get friends

export const getFriends = async () => {
  await axios
.get(`${API_BASE_URL}/user/getFriends`, { withCredentials: true })
.then((res) => console.log(res.data))
.catch((error) => console.error("Error fetching friends:", error));
};

/********************************************User API End**********************************************************/

/********************************************Course API Start******************************************************/
// Fetch all courses from contentful
export const getCourses = async (setCards) => {
  await axios
    .get(`${API_BASE_URL}/courses`)
    .then((res) => setCards(res.data))
    .catch((error) =>
      console.error("Error fetching data from Contentful:", error)
    );
};

// Fetch recommended courses from contentful
export const getrecommendedCourses = async (setCards) => {
  await axios
    .get(`${API_BASE_URL}/courses/recommended`, { withCredentials: true })
    .then((res) => setCards(res.data))
    .catch((error) =>
      console.error("Error fetching data from Contentful:", error)
    );
};

//Fetch specific courses from contentful
export const getProfileCourses = async (
  userCoursesArray,
  setCourses,
  setError
) => {
  // Extract course names from the array of objects
  const courseNames = userCoursesArray.map((course) => course.courseName);

  await axios
    .get(`${API_BASE_URL}/courses/profileCourses`, {
      params: { userCourses: courseNames },
    })
    .then((res) => setCourses(res.data))
    .catch((err) => setError("Error fetching courses"));
};

//Fetch certain course and all its content
export const getOneCourse = async (
  id,
  setCourseSet,
  setCurrentCourse,
  setAPI_KEY
) => {
  await axios
    .get(`${API_BASE_URL}/courses/content`, {
      params: { id: id },
    })
    .then((res) => {
      setCurrentCourse(res.data);
      setAPI_KEY(res.data.API_KEY);
      setCourseSet(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const extractYouTubeTitle = async (url) => {
  // Extract video ID from the YouTube URL
  const videoId = url.match(
    /(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)/
  )[1];
  console.log(videoId);

  try {
    // Make a request to the YouTube Data API to fetch video details
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    const data = await response.json();
    const title = data.title;
    console.log(title); // Output the video title
    return title;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

/********************************************Course API End*******************************************************/

/********************************************Todo API Start*******************************************************/
// Function to fetch all todos
export const getAllTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Function to add a new todo
export const addTodo = async (title, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, {
      title,
      createdBy: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Function to delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

// Function to toggle completion of a todo
export const toggleTodoCompletion = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error("Error toggling todo completion:", error);
    throw error;
  }
};

// Function to update a todo's task
export const updateTodo = async (id, title) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, { title });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
/********************************************Todo API End*********************************************************/

export * from "./API";
