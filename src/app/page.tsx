import { Button } from '@nextui-org/react';
import React from 'react';

const HomePage = () => {
  return (
    <div className="m-5 space-x-5 h-screen gap-4">
      <Button color="primary">Login</Button>
      <Button color="primary">Sign up</Button>
    </div>
  );
};

export default HomePage;
