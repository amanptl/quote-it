import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Swapnil',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      pictures: 1
    },
    {
      id: 'u2',
      name: 'Deep',
      image:
        'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      pictures: 3
    },
    {
      id: 'u3',
      name: 'Aman',
      image:
        'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      pictures: 2
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
