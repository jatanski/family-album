import jimp from "jimp";

export default class MiniatureCreator {
	private buffer: Buffer;

	static async create(imageBuffer: Buffer) {
		return await new MiniatureCreator(imageBuffer).create();
	}

	private constructor(imageBuffer: Buffer) {
		this.buffer = imageBuffer;
	}

	private async create() {
		const JPEG_QUALITY = 60;
		const image = await jimp.read(this.buffer);
		const scalingFactor = this.getMiniatureScalingFactor(image.bitmap.width);
		const small = image.scale(scalingFactor).quality(JPEG_QUALITY);
		return {
			data: await small.getBufferAsync(jimp.MIME_JPEG),
			contentType: "image/jpeg"
		};
	}
	private getMiniatureScalingFactor(miniatureWidth: number): number {
		const MINIATURE_WIDTH = 256;
		return MINIATURE_WIDTH / miniatureWidth;
	}
}
