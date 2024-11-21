import path from 'node:path';
import {compileString} from 'sass';

/**
 * Configures a template extension for Sass files.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @see https://www.11ty.dev/docs/languages/custom/
 */
export default function applySassPlugin(eleventyConfig) {
	eleventyConfig.addTemplateFormats('scss');
	eleventyConfig.addExtension(
		'scss',
		{
			outputFileExtension: 'css',
			compile: async function (inputContent, inputPath = '') {
				const parsed = path.parse(inputPath);

				// By convention, Sass doesn't write output files whose input files start with an underscore — this ensures Eleventy skips those files, too.
				if (parsed.name.startsWith('_')) {
					return;
				}

				const includePath = path.resolve(this.config.dir.input, this.config.dir.includes);

				const result = compileString(inputContent, {
					style:
						process.env.NODE_ENV === 'production' ?
							'compressed' :
							'expanded',
					loadPaths: [
						parsed.dir || '.',
						includePath
					]
				});

				this.addDependencies(inputPath, result.loadedUrls);

				return async (data) => result.css;
			}
		}
	);
}