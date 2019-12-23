import React, { Component } from 'react';
import View from './Carousel.view';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { AlbumType } from '../Albums/Album.types';
import BaseModel from '../../utils/baseModel';
import { CarouselProps, CarouselState } from './Carousel.types';
import enHanceComponentWithHistory from '../Utils/Hoc/enHanceComponentWithHIstory';

type fullImageObjectsType = { description: string; creationDate: string; imageId: string };

class Carousel extends Component<CarouselProps, CarouselState> {
	state = {
		imageIds: [],
		imageDescriptions: [],
		imageCreationDates: [],
	};

	readonly albumEndpoint: string = `album/${this.takeAlbumIdFromQuery()}`;

	private takeAlbumIdFromQuery(): string {
		return this.props.history.location.pathname
			.split('/')
			.slice(2)
			.join();
	}

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
		const imageCreationDate: Array<string> = [];

		if (imageIds) {
			await BaseModel.asyncForEach(imageIds, async (imageId: string) => {
				const fullImageObjects = await this.downloadFullImageObjects(imageId);

				imageDescriptions.push(fullImageObjects.description);
				imageCreationDate.push(fullImageObjects.creationDate);
			});
		}

		this.setState({ imageDescriptions: imageDescriptions, imageCreationDates: imageCreationDate });
	}

	private async downloadFullImageObjects(imageId: string): Promise<fullImageObjectsType> {
		const imageEndpoint: string = `image/${imageId}`;
		const fullImageObjects: fullImageObjectsType = await BaseModel.downloadAnythingWithBody(imageEndpoint);

		return fullImageObjects;
	}

	render() {
		return (
			<View
				imageDescriptions={this.state.imageDescriptions}
				imageCreationDates={this.state.imageCreationDates}
				imageIds={this.state.imageIds}
			></View>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	selectedAlbum: state.album.selectedAlbum,
});

export default enHanceComponentWithHistory(connect(mapStateToProps, {})(Carousel));
