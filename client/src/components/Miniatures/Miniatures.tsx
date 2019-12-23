import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MiniaturesState, MiniaturesProps } from './Miniatures.types';
import View from './Miniatures.view';
import BaseModel from '../../utils/baseModel';
import { AppState } from '../../redux/reducers';
import { AlbumType } from '../Albums/Album.types';
import enHanceComponentWithHistory from '../Utils/Hoc/enHanceComponentWithHIstory';

class Miniatures extends Component<MiniaturesProps, MiniaturesState> {
	readonly albumEndpoint: string = `album/${this.takeAlbumIdFromQuery()}`;

	private takeAlbumIdFromQuery(): string {
		return this.props.history.location.pathname
			.split('/')
			.slice(2)
			.join();
	}

	state = {
		images: [],
	};

	componentDidMount(): void {
		this.downloadMiniatures();
	}

	private async downloadMiniatures(): Promise<void> {
		const albumWithImageIds: AlbumType = await BaseModel.downloadAnythingWithBody(this.albumEndpoint);
		this.setState({ images: albumWithImageIds.images });
	}

	render() {
		return <View images={this.state.images}></View>;
	}
}

const mapStateToProps = (state: AppState) => ({
	selectedAlbum: state.album.selectedAlbum,
});

export default enHanceComponentWithHistory(connect(mapStateToProps, {})(Miniatures));
