import NextAuth from 'next-auth';
import Auth0 from 'next-auth/providers/auth0';
import AzureAd from 'next-auth/providers/azure-ad';

import { getServerConfig } from '@/config/server';

const {
  ALLOW_LIST,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER,
  AZURE_AD_CLIENT_ID,
  AZURE_AD_CLIENT_SECRET,
  AZURE_AD_TENANT_ID,
  ENABLE_OAUTH_SSO,
  NEXTAUTH_SECRET,
  SSO_PROVIDERS,
} = getServerConfig();

function meetRequirement(email: string, cond: string) {
  if (cond === '*') return true;
  if (email === cond) return true;
  if (!cond.includes('@') && email.endsWith(cond)) return true;
  return false;
}

export const isEmailAllowed = (email: string) => {
  return ALLOW_LIST.some((cond) => meetRequirement(email.toLowerCase(), cond));
};

declare module '@auth/core/jwt' {
  // Returned by the `jwt` callback and `auth`, when using JWT sessions
  interface JWT {
    userId?: string;
  }
}

const nextAuth = NextAuth({
  callbacks: {
    // Note: Data processing order of callback: authorize --> jwt --> session
    async jwt({ token, account }) {
      // Auth.js will process the `providerAccountId` automatically
      // ref: https://authjs.dev/reference/core/types#provideraccountid
      if (account) {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      // Pick userid from token
      if (session.user) {
        // @ts-ignore next line
        session.user.id = token.userId ?? session.user.id;
      }
      return session;
    },
    signIn({ user }) {
      if (!user.email) return false;
      return isEmailAllowed(user.email);
    },
  },
  providers: ENABLE_OAUTH_SSO
    ? SSO_PROVIDERS.split(/[,，]/).map((provider) => {
        switch (provider) {
          case 'auth0': {
            return Auth0({
              // Specify auth scope, at least include 'openid email'
              // all scopes in Auth0 ref: https://auth0.com/docs/get-started/apis/scopes/openid-connect-scopes#standard-claims
              authorization: { params: { scope: 'openid email profile' } },
              clientId: AUTH0_CLIENT_ID,
              clientSecret: AUTH0_CLIENT_SECRET,
              issuer: AUTH0_ISSUER,
            });
          }
          case 'azure-ad': {
            return AzureAd({
              // Specify auth scope, at least include 'openid email'
              // all scopes in Azure AD ref: https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc#openid-connect-scopes
              authorization: { params: { scope: 'openid email profile' } },
              clientId: AZURE_AD_CLIENT_ID,
              clientSecret: AZURE_AD_CLIENT_SECRET,
              tenantId: AZURE_AD_TENANT_ID,
            });
          }
          default: {
            throw new Error(`[NextAuth] provider ${provider} is not supported`);
          }
        }
      })
    : [],
  secret: NEXTAUTH_SECRET,
  trustHost: true,
});

export const {
  handlers: { GET, POST },
  auth,
} = nextAuth;
