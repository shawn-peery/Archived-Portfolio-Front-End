import type { HeadFC, PageProps } from 'gatsby';
import { useMsalAuthentication, useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { msalConfig, TargetScope } from '../authConfig';
import { getClaimsFromStorage } from '../utils/storageUtils';
import { callApiWithToken } from '../fetch';
import React, { useState, useEffect } from 'react';
import Layout from '../theme/Layout';
import useRequestWithAccessToken from '../hooks/useRequestWithAccessToken';

const Profile = () => {
  const [graphData, error] = useRequestWithAccessToken(
    'https://localhost:7218/api/profile/profile',
  );

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
