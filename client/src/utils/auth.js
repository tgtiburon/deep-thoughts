import decode from "jwt-decode";

// Creating a new class
// We will create a new version for each component that imports it.
// ensures we are using new version of the functionality
class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is still logged in
  loggedIn() {
    // Checks if there is a token and if it's valid
    const token = this.getToken();
    // use type coersion to check if token is NOT undefined
    // and the token is not expired
    return !!token && !this.isTokenExpired(token);
  }

  // check is token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem("id_token");
  }

  // set token to localStorage and reload page to homepage
  login(id_token) {
    localStorage.setItem("id_token", id_token);

    //move user to homepage
    window.location.assign("/");
  }

  // clear token from localStorage and force logout with reload
  logout() {
    // Clear data
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
