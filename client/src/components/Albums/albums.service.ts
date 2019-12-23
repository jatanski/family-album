import { AlbumType, AlbumsState } from './Album.types';
import BaseModel from '../../utils/baseModel';
import { ToastConsumerContext } from 'react-toast-notifications';

export default class AlbumService {
	readonly endpoint: string = `album`;
	private readonly toastManager?: ToastConsumerContext;

	constructor(toastManager?: ToastConsumerContext) {
		this.toastManager = toastManager;
	}

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

		if (albumState.name == '') {
			this.toastManager?.add('Musisz wpisać nazwę albumu', {
				appearance: 'info',
				autoDismiss: true,
			});
			return false;
		}

		const { showModalAddAlbum, albums, beginningDate, endDate, ...stateToSend } = albumState;

		const albumData = {
			...stateToSend,
			beginningDate: Date.parse(beginningDate) || undefined,
			endDate: Date.parse(endDate) || undefined,
		};

		if (token && this.toastManager) {
			try {
				const response = await fetch(BaseModel.baseApiUrl + this.endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-token': token,
					},
					body: JSON.stringify(albumData),
				});

				if (response.ok) return true;
				else {
					this.toastManager.add(
						'Niespodziewany błąd. Jeśli widzisz taki często skontaktuje się z autorami.',
						{
							appearance: 'error',
							autoDismiss: true,
						},
					);
					return false;
				}
			} catch (error) {
				this.toastManager.add('Nie udało się połączyć z serwerem. Sprawdź połączenie internetowe', {
					appearance: 'error',
					autoDismiss: true,
				});
				console.error(error);
			}
		}
		return false;
	}
}
