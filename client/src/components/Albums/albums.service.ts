import { AlbumType, AlbumsState } from './Album.types';
import BaseModel from '../../utils/baseModel';

export default class AlbumService {
  readonly endpoint: string = `album`;
  public async downloadAllAlbums(): Promise<Array<AlbumType>> {
    const downloadAlbums = (await BaseModel.downloadAnythingWithBody(this.endpoint)) as AlbumType[];

    return this.changeDatesToDateType(downloadAlbums);
  }

  private changeDatesToDateType(albums: Array<AlbumType>): Array<AlbumType> {
    const albumsAfterChange = albums.map(album => {
      const { beginningDate, endDate, ...restAlbum } = album;

      return {
        ...restAlbum,
        beginningDate: beginningDate ? new Date(beginningDate).toDateString() : '',
        endDate: endDate ? new Date(endDate).toDateString() : '',
      };
    });

    return albumsAfterChange;
  }

  public async submitAlbum(albumState: AlbumsState): Promise<boolean> {
    const token = BaseModel.getAuthToken();

    const { showModalAddAlbum, albums, beginningDate, endDate, ...stateToSend } = albumState;

    const albumData = {
      ...stateToSend,
      beginningDate: Date.parse(beginningDate) || undefined,
      endDate: Date.parse(endDate) || undefined,
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

        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  }
}
