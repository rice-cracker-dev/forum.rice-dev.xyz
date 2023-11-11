import { gfmPlugin } from 'svelte-exmarkdown/gfm';
import { common, createLowlight } from 'lowlight';

export const mdPlugins = [gfmPlugin()];
export const lowlight = createLowlight(common);
