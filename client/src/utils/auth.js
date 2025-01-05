// utils/auth.js
export function getUserRole() {
  const token = localStorage.getItem("token"); // or use context, depending on where your token is stored
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding the JWT
    console.log(decodedToken);
    return decodedToken.role; // Assuming 'role' is stored in the token payload
  }
  return null;
}
