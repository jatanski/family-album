import { SyntheticEvent } from 'react';
import { allActions } from '../redux/store';

class BaseModel {
  public static baseApiUrl = 'http://localhost:3069/';

  public static saveAuthToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  public static getAuthToken() {
    return localStorage.getItem('token');
  }

  public static onLogout() {
    localStorage.removeItem('token');
  }

  public static downloadAnythingWithBody = async (endpoint: string): Promise<any> => {
    const token: string | null = BaseModel.getAuthToken();

    if (token) {
      try {
        const response = await fetch(BaseModel.baseApiUrl + endpoint, {
          method: 'GET',
          headers: { 'x-token': token },
        });

        const responseData = await response.json();
        console.log(responseData);

        return responseData;
      } catch (error) {
        console.error(error);
      }
    }
  };

  public static setSelectedAlbum = (e: SyntheticEvent<HTMLButtonElement>): void => {
    allActions.setAlbum(e.currentTarget.id);
  };
}

export default BaseModel;
