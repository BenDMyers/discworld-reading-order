import getItemBySlug from './src/_11ty/filters/get-item-by-slug.js';
import storyCard from './src/_11ty/filters/story-card.js';
import applySassPlugin from './src/_11ty/plugins/sass.js';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
	applySassPlugin(eleventyConfig);
	eleventyConfig.addFilter('getItemBySlug', getItemBySlug);
	eleventyConfig.addFilter('stringify', (s) => JSON.stringify(s, null, 2));
	eleventyConfig.addFilter('storyCard', storyCard);

	return {
		dir: {
			input: 'src'
		}
	};
};