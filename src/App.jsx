import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CourseList from './components/CourseList';
import Login from './components/Login';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Course Management App</h1>
        <Login />
        <CourseList />
      </div>
    </Provider>
  );
};

export default App;
