import React from 'react';

import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css'; TODO

const Toast = () => {
  return (
    <ToastContainer
      autoClose={3000}
      closeOnClick
      hideProgressBar
      newestOnTop
      pauseOnHover
      position="top-center"
      rtl={false}
      theme="dark"
    />
  );
};

export default Toast;