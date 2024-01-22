import axios from 'axios';

// Fetch user data from the server
const getUser = async (setUserData, setUserSet, setLoading) => {
  await axios
    .get('http://localhost:3030/user/profile', { withCredentials: true })
    .then((res) => {
      setUserData(res.data);
      setUserSet(true);
      setLoading(false);
      console.log('User Data Fetched ' + res.data);
    })
    .catch((error) => {
      setLoading(false);
      console.error('Error fetching user data:', error);
    });
};

// Fetch all courses from contentful
const getCourses = async (setCards) => {
  await axios
    .get('http://localhost:3030/courses')
    .then((res) => setCards(res.data))
    .catch((error) => console.error('Error fetching data from Contentful:', error));
};

//Fetch specific courses from contentful
const getProfileCourses = async (userCoursesArray, setCourses, setError) => {
  // Extract course names from the array of objects
  const courseNames = userCoursesArray.map((course) => course.courseName);

  await axios
    .get('http://localhost:3030/courses/profileCourses', {
      params: { userCourses: courseNames },
    })
    .then((res) => setCourses(res.data))
    .catch((err) => setError('Error fetching courses'));
};

//Fetch certain course and all its content
const getOneCourse = async (id, setCourseSet, setCurrentCourse, setAPI_KEY) => {
  await axios
    .get('http://localhost:3030/courses/content', {
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

const extractYouTubeTitle = async (url) => {
  // Extract video ID from the YouTube URL
  const videoId = url.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)/)[1];
  console.log(videoId);

  try {
    // Make a request to the YouTube Data API to fetch video details
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    const data = await response.json();
    const title = data.title;
    console.log(title); // Output the video title
    return title;
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

export { getUser, getCourses, getProfileCourses, getOneCourse, extractYouTubeTitle };
