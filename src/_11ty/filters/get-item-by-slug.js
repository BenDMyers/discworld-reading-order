const memoized = {};

export default function getItemBySlug(collection, slug) {
	if (memoized[slug]) {
		return memoized[slug];
	}

	const itemWithSlug = collection.find(item => item.page.fileSlug === slug);
	memoized[slug] = itemWithSlug;
	return itemWithSlug;
}