import type { HeadFC } from 'gatsby';

import React from 'react';
import Layout from '../theme/Layout';
import useRequestWithAccessToken from '../hooks/useRequestWithAccessToken';
import { TodoService } from '../apiServices';

const Profile = () => {
  const [graphData, error] = useRequestWithAccessToken(TodoService.CreateTodo);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <h1>Hi</h1>
      {graphData ? (
        <textarea value={JSON.stringify(graphData, null, 4)} style={{ height: '20rem' }}></textarea>
      ) : null}
    </Layout>
  );
};

export default Profile;

export const Head: HeadFC = () => <title>Profile</title>;
