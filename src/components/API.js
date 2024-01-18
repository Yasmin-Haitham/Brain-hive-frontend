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

// Fetch all courses from contentful
const getCourses = (setCards) => {
  axios
    .get("http://localhost:3030/courses")
    .then((res) => setCards(res.data))
    .catch((error) =>
      console.error("Error fetching data from Contentful:", error)
    );
};

//Fetch specific courses from contentful
const getProfileCourses = (userCoursesArray, setCourses, setError) => {
  // Extract course names from the array of objects
  const courseNames = userCoursesArray.map((course) => course.courseName);

  axios
    .get("http://localhost:3030/courses/profileCourses", {
      params: { userCourses: courseNames },
    })
    .then((res) => setCourses(res.data))
    .catch((err) => setError("Error fetching courses"));
};

//Fetch certain course and all its content
const getOneCourse = (id, setCurrentCourse, setAPI_KEY) => {
  axios
    .get("http://localhost:3030/courses/content", {
      params: { id: id },
    })
    .then((res) => {
      setCurrentCourse(res.data);
      setAPI_KEY(res.data.API_KEY);
    })
    .catch((err) => {
      
      console.log(err);
    });
};

const extractYouTubeTitle = (url, API_KEY) => {
  // Extract video ID from the YouTube URL
  const videoId = url.split("v=")[1];

  // Make a request to the YouTube Data API to fetch video details
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`
  )
    .then((response) => response.json())
    .then((data) => {
      const title = data.items[0].snippet.title;
      console.log(title); // Output the video title
      return(title)
    })
    .catch((error) => {
      console.error("Error fetching video details:", error);
    });
};


export { getUser, getCourses, getProfileCourses, getOneCourse, extractYouTubeTitle };
