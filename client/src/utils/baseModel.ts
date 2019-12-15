class BaseModel {
  public static baseApiUrl = 'http://localhost:3069/';

  public static getAuthTokenHeaderObj() {
    return { 'x-auth-token': this.getAuthToken() };
  }

  public static saveAuthToken = (token: string) => {
    localStorage.setItem('x-auth-token', token);
  };

  public static saveToLocalStorage(where: string, what: string) {
    localStorage.setItem(where, JSON.stringify(what));
  }

  public static loadFromLocalStorage = (what: string) => {
    return JSON.parse(localStorage.getItem(what) || '{}');
  };

  public static getAuthToken() {
    return localStorage.getItem('x-auth-token');
  }

  public static onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('x-auth-token');
  }
}

export default BaseModel;
