import React from 'react';

const MainContainer = ({ children }) => {
  return (
      <div className="main-container">
        <div className="main-container-children">
        <div className="auth-card">
       <div className="card-image">
                <img className="logo" src='https://res.cloudinary.com/npl-2021/image/upload/v1605111427/logo_bmcwa8.png' />
            </div>
            {children}
        </div>
        
        
        </div>
      </div>
  );
};


export default (MainContainer);
