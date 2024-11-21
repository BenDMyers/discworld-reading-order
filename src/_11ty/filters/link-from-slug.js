import getItemBySlug from "./get-item-by-slug.js";

export default function linkFromSlug(slug, all) {
	const story = getItemBySlug(all, slug);
	return /* html */`<a href="#${slug}">${story.data.title}</a>`;
}