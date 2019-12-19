class BaseModel {
  public static baseApiUrl = 'http://localhost:3069/';

  public static getAuthTokenHeaderObj() {
    return { 'x-auth-token': this.getAuthToken() };
  }

  public static saveAuthToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  public static saveToLocalStorage(where: string, what: string) {
    localStorage.setItem(where, JSON.stringify(what));
  }

  public static loadFromLocalStorage = (what: string) => {
    return JSON.parse(localStorage.getItem(what) || '{}');
  };

  public static getAuthToken() {
    return localStorage.getItem('token');
  }

  public static onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

export default BaseModel;
