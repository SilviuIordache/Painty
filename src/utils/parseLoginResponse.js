export default function parseLoginResponse(raw) {
  if (raw) {
    const user = {
      email: raw.email,
      uid: raw.uid,
      token: raw.accessToken,
    }
    
    return user;
  }
}