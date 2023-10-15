import { InteractionType, AuthError } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { useState, useEffect } from 'react';
import { TargetScopes, msalConfig } from '../authConfig';
import { callApiWithToken } from '../fetch';
import { getClaimsFromStorage } from '../utils/storageUtils';
import { AvailableHttpMethodOptions } from '../utils/HttpMethodUtils';

const useRequestWithAccessToken = <T>(
  requestURL: string,
  method: AvailableHttpMethodOptions = 'GET',
): [T | null, AuthError | null] => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * an array of all accounts currently signed in and an inProgress vale
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const [responseData, setResponseData] = useState();
  const resource = new URL(requestURL).hostname;

  const request = {
    scopes: TargetScopes.scopes,
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
    if (!!responseData) {
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
      callApiWithToken(result.accessToken, requestURL, account, method)
        .then((response) => setResponseData(response))
        .catch((error) => {
          if (error.message === 'claims_challenge_occurred') {
            acquireToken(InteractionType.Redirect, request as any);
          } else {
            console.log(error);
          }
        });
    }
  }, [responseData, result, error, acquireToken]);

  return [responseData as T, error];
};

export default useRequestWithAccessToken;
