import {
  InteractionType,
  AuthError,
  AuthenticationResult,
  SilentRequest,
} from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { useState, useEffect, useCallback } from 'react';
import { TargetScopes, msalConfig } from '../authConfig';
import { callApiWithToken } from '../fetch';
import { getClaimsFromStorage } from '../utils/storageUtils';
import { AvailableHttpMethodOptions } from '../utils/HttpMethodUtils';
import { isNullOrUndefined } from '../utils/IsNullOrUndefined';

const useRequestWithAccessToken = <T>(
  requestURL: string,
  method: AvailableHttpMethodOptions,
): [AuthenticationResult | null, AuthError | null, (body?: unknown) => Promise<T> | null] =>
  // callbackInteractionType?: InteractionType | undefined,
  // callbackRequest?: SilentRequest | undefined,
  {
    /**
     * useMsal is hook that returns the PublicClientApplication instance,
     * an array of all accounts currently signed in and an inProgress vale
     * that tells you what msal is currently doing. For more, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { instance } = useMsal();
    const account = instance.getActiveAccount();
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

    const {
      acquireToken,
      result: authResult,
      error: authError,
    } = useMsalAuthentication(InteractionType.Popup, {
      ...request,
      redirectUri: '/redirect',
    } as any);

    useEffect(() => {
      if (!!authError) {
        // in case popup is blocked, use redirect instead
        if (
          authError.errorCode === 'popup_window_error' ||
          authError.errorCode === 'empty_window_error'
        ) {
          acquireToken(InteractionType.Redirect, request as any);
        }

        console.log(authError);
        return;
      }
    }, [authResult, authError, acquireToken]);

    const callApiWithTokenInternal = useCallback(
      (body: unknown) => {
        if (isNullOrUndefined(authResult)) {
          return null;
        }

        return callApiWithToken<T>(authResult.accessToken, requestURL, account, method, body).catch(
          (error) => {
            if (error.message === 'claims_challenge_occurred') {
              acquireToken(InteractionType.Redirect, request as any);
            } else {
              console.log(error);
            }
          },
        );
      },
      [isNullOrUndefined, authResult, authError, authResult, requestURL, account, method],
    );

    return [authResult, authError, callApiWithTokenInternal];
  };

export default useRequestWithAccessToken;
