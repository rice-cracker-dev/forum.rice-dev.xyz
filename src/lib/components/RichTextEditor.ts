import type { EditorOptions, Extensions } from '@tiptap/core';
import { lowlight } from '$lib/constants';
import { hsla } from 'color2k';
import BaseCodeBlock from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';

export const generatePalette = (
  { hue, shades, saturation }: { hue: number; shades: number; saturation: number },
  lightness: number
) => {
  return [...Array(shades).keys()].map((_, index) =>
    hsla(hue, saturation, lightness - (lightness / shades) * index, 1)
  );
};

export const generateColors = (hues: number) => {
  let colors: string[] = [];

  [...Array(hues).keys()].forEach(
    (o) =>
      (colors = [
        ...colors,
        ...generatePalette({ hue: (255 / hues) * o, shades: 9, saturation: 1 }, 0.5),
      ])
  );

  return colors;
};

export const CodeBlock = BaseCodeBlock.extend({
  addKeyboardShortcuts: () => {
    return {
      Tab: ({ editor }) => {
        if (editor.isActive('codeBlock')) {
          return editor.commands.insertContent('\t');
        }

        return false;
      },
    };
  },
});

export const RichTextEditorExtensions: Extensions = [
  Underline,
  // CodeBlock,
  Image,
  TextStyle,
  Link,
  StarterKit.configure({ codeBlock: false }),
  Color.configure({ types: ['textStyle'] }),
  TextAlign.configure({ types: ['paragraph', 'heading'] }),
  CodeBlock.configure({ lowlight }),
];

export const RichTextEditorInitialOptions: Partial<EditorOptions> = {
  extensions: RichTextEditorExtensions,
  editorProps: {
    attributes: {
      class:
        'prose dark:prose-invert min-h-[24rem] max-w-none ring-none outline-none border-none p-4 gap-0',
    },
  },
};

export const Colors: string[] = [
  ...generateColors(6),
  ...generatePalette({ hue: 0, saturation: 0, shades: 9 }, 0.5),
];
