import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import UserList from './components/UserList';

const App = () => {
  const [reload, setReload] = useState(false);

  return (
    <div className="container">
      <h1>Register Page</h1>
      <RegisterForm onRegister={() => setReload(!reload)} />
      <UserList reload={reload} />
    </div>
  );
};

export default App;
