export const AUTH_TOKEN_UPDATED = "AUTH_TOKEN_UPDATED";
export const DESTROY_TOKEN = "DESTROY_TOKEN";

export function updateToken(authToken){
  return{
    authToken: authToken,
    type: AUTH_TOKEN_UPDATED
  }
}

export function closeSession(){
  return {
    type: DESTROY_TOKEN
  }
}