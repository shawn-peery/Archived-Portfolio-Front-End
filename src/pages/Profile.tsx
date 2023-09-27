import { useMsalAuthentication, useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { msalConfig, protectedResources } from '../authConfig';
import { getClaimsFromStorage } from '../utils/storageUtils';
import { callApiWithToken } from '../fetch';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * an array of all accounts currently signed in and an inProgress value
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const [graphData, setGraphData] = useState();
  const resource = new URL(protectedResources.apiHello.endpoint).hostname;

  const request = {
    scopes: protectedResources.apiHello.scopes,
    account: account,
    claims:
      account &&
      getClaimsFromStorage(
        `cc.${msalConfig.auth.clientId}.${(account as any).idTokenClaims.oid}.${resource}`,
      )
        ? window.atob(
            getClaimsFromStorage(
              `cc.${msalConfig.auth.clientId}.${(account as any).idTokenClaims.oid}.${resource}`,
            ) as string,
          )
        : undefined, // e.g {"access_token":{"xms_cc":{"values":["cp1"]}}}
  };

  const { acquireToken, result, error } = useMsalAuthentication(InteractionType.Popup, {
    ...request,
    redirectUri: '/redirect',
  } as any);

  useEffect(() => {
    if (!!graphData) {
      return;
    }

    if (!!error) {
      // in case popup is blocked, use redirect instead
      if (error.errorCode === 'popup_window_error' || error.errorCode === 'empty_window_error') {
        acquireToken(InteractionType.Redirect, request as any);
      }

      console.log(error);
      return;
    }

    if (result) {
      callApiWithToken(result.accessToken, protectedResources.apiHello.endpoint, account)
        .then((response) => setGraphData(response))
        .catch((error) => {
          if (error.message === 'claims_challenge_occurred') {
            acquireToken(InteractionType.Redirect, request as any);
          } else {
            console.log(error);
          }
        });
    }
    // eslint-disable-next-line
  }, [graphData, result, error, acquireToken]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>Hi</h1>
      {graphData ? (
        <textarea value={JSON.stringify(graphData, null, 4)} style={{ height: '20rem' }}></textarea>
      ) : null}
    </>
  );
};

export default Profile;
