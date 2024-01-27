import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
//
import SignUp from "./components/SignUp";
import "./index.css";
import Home from "./components/Home";
import QuizPage from "./components/QuizPage";
import ProfilePage from "./components/ProfilePage";
import Courses from "./components/Courses";
import CourseContent from "./components/CourseContent";

import GalleryGrid from "./components/GalleryGrid";
import CourseMenu from "./components/CourseMenu";

import FriendList from "./components/FriendList";
import TodoFinal from "./components/TodoFinal";
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/quiz' element={<QuizPage />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/ProfilePage' element={<ProfilePage />} />
          <Route path='/Courses' element={<Courses />} />
          <Route path='/CourseContent/:courseId' element={<CourseContent />} />
          <Route path='/GalleryGrid' element={<GalleryGrid />} />
          <Route path='/CourseMenu' element={<CourseMenu />} />
          <Route path='/FriendList' element={<FriendList />} />
          <Route path='/TodoFinal' element={<TodoFinal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
