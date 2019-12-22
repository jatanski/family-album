import React, { Component } from 'react';
import View from './Carousel.view';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { AlbumType } from '../Albums/Album.types';
import BaseModel from '../../utils/baseModel';
import { CarouselProps, CarouselState } from './Carousel.types';

type fullImageObjectsType = { description: string; imageId: string };

class Carousel extends Component<CarouselProps, CarouselState> {
	albumEndpoint: string = `album/${this.props.selectedAlbum}`;

	state = {
		imageIds: [],
		imageDescriptions: [],
	};

	async componentDidMount(): Promise<void> {
		const imageIds = await this.downloadImagesIds();

		await this.downloadAndSetStateImageDescriptions(imageIds);
	}

	private async downloadImagesIds(): Promise<Array<string> | undefined> {
		const albumWithImageIds: AlbumType = await BaseModel.downloadAnythingWithBody(this.albumEndpoint);
		const imageIds = albumWithImageIds.images;
		this.setState({ imageIds: imageIds });

		return imageIds;
	}

	private async downloadAndSetStateImageDescriptions(imageIds: Array<string> | undefined): Promise<void> {
		const imageDescriptions: Array<string> = [];

		if (imageIds) {
			await BaseModel.asyncForEach(imageIds, async (imageId: string) => {
				const fullImageObjects = await this.downloadFullImageObjects(imageId);

				imageDescriptions.push(fullImageObjects.description);
			});
		}

		this.setState({ imageDescriptions: imageDescriptions });
	}

	private async downloadFullImageObjects(imageId: string): Promise<fullImageObjectsType> {
		const imageEndpoint: string = `image/${imageId}`;
		const fullImageObjects: fullImageObjectsType = await BaseModel.downloadAnythingWithBody(imageEndpoint);

		return fullImageObjects;
	}

	render() {
		return <View imageDescriptions={this.state.imageDescriptions} imageIds={this.state.imageIds}></View>;
	}
}

const mapStateToProps = (state: AppState) => ({
	selectedAlbum: state.album.selectedAlbum,
});

export default connect(mapStateToProps, {})(Carousel);
