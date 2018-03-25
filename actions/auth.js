export const AUTH_TOKEN_UPDATED = "AUTH_TOKEN_UPDATED";

export function updateToken(authToken){
  return{
    authToken: authToken,
    type: AUTH_TOKEN_UPDATED
  }
}
