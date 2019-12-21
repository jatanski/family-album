import { AlbumType, AlbumsState } from './types';
import BaseModel from '../../utils/baseModel';

export default class AlbumService {
  readonly endpoint: string = `album`;
  public downloadAllAlbums = async (): Promise<Array<AlbumType>> => {
    const token: string | null = BaseModel.getAuthToken();

    if (token) {
      try {
        const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
          method: 'GET',
          headers: { 'x-token': token },
        });

        const downloadAlbums: Array<AlbumType> = await response.json();

        return this.changeDatesToDateType(downloadAlbums);
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  };

  private changeDatesToDateType = (albums: Array<AlbumType>): Array<AlbumType> => {
    const albumsAfterChange = albums.map(album => {
      const { beginningDate, endDate, ...restAlbum } = album;

      return {
        ...restAlbum,
        beginningDate: new Date(beginningDate).toDateString(),
        endDate: new Date(endDate).toDateString(),
      };
    });

    return albumsAfterChange;
  };

  public submitAlbum = async (state: AlbumsState): Promise<boolean> => {
    const token = BaseModel.getAuthToken();

    const { showModalAddAlbum, albums, beginningDate, endDate, ...stateToSend } = state;

    const albumData = {
      ...stateToSend,
      beginningDate: new Date(beginningDate).getTime(),
      endDate: new Date(endDate).getTime(),
    };

    if (token) {
      try {
        const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,
          },
          body: JSON.stringify(albumData),
        });

        const responseData = await response.json();

        console.log(responseData);
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };
}
