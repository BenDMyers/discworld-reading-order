import getItemBySlug from './get-item-by-slug.js';
import linkFromSlug from './link-from-slug.js';

/**
 * @typedef {Object} StoryData
 * @property {string} title
 * @property {string?} displayTitle
 * @property {'starter' | 'standard' | 'ya' | 'short' | 'science' | 'illustrated'} storyType
 * @property {Object} connections
 * @property {string[]} connections.prequel
 * @property {string[]} connections.sequel
 * @property {string[]} connections.minor
 * @property {string[]} connections.historyMonksPrequel
 * @property {string[]} connections.historyMonksSequel
 */

/**
 * @typedef {Object} StoryTemplate
 * @property {Object} page
 * @property {string} page.fileSlug
 * @property {StoryData} data
 */

const storyTypes = {
	starter: 'Starter novel',
	standard: 'Novel',
	ya: 'Young adult novel',
	short: 'Short story',
	science: 'Science novel',
	illustrated: 'Illustrated novel'
};

/**
 * @param {string} slug
 * @param {StoryTemplate[]} all
 * @returns {string}
 */
export default function storyCard(slug, all) {
	/** @type {StoryTemplate} */
	const story = getItemBySlug(all, slug);

	const prequels = story.data.connections.prequel ?
		/* html */`<div>
				<dt>Previous:</dt>
				${story.data.connections.prequel.map(p => '<dd>' + linkFromSlug(p, all) + '</dd>').join('')}
			</div>` : '';
	const sequels = story.data.connections.sequel ?
		/* html */`<div>
				<dt>Next:</dt>
				${story.data.connections.sequel.map(p => '<dd>' + linkFromSlug(p, all) + '</dd>').join('')}
			</div>` : '';
	const minorConnections = story.data.connections.minor ?
		/* html */`<div>
				<dt>Minor connections:</dt>
				${story.data.connections.minor.map(p => '<dd>' + linkFromSlug(p, all) + '</dd>').join('')}
			</div>` : '';
	const historyMonksPath = (story.data.connections.historyMonksPrequel || story.data.connections.historyMonksSequel) ?
		/* html */`<div>
				<dt>History Monks path:</dt>
				${story.data.connections.historyMonksPrequel ? `<dd>${linkFromSlug(story.data.connections.historyMonksPrequel[0], all)} <i>(previous)</i></dd>` : ''}
				${story.data.connections.historyMonksSequel ? `<dd>${linkFromSlug(story.data.connections.historyMonksSequel[0], all)} <i>(next)</i></dd>` : ''}
			</div>` : ''; 

	return /* html */`<article class="story ${story.data.storyType}">
		<hgroup>
			<h3 tabindex="-1" id="${story.page.fileSlug}">${story.data.displayTitle || story.data.title}</h3>
			<small>${storyTypes[story.data.storyType]}</small>
		</hgroup>
		<dl>
			${prequels}
			${sequels}
			${historyMonksPath}
			${minorConnections}
		</dl>
</article>`;
}