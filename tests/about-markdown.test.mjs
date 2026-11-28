import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const render = source => renderToStaticMarkup(createElement(Markdown, { remarkPlugins: [remarkGfm], skipHtml: true }, source));

test('renders headings, formatting, tables, images, lists and links', () => {
  const html = render('## Studio\n\n**Bold** and *italic*\n\n| Name | Year |\n| --- | --- |\n| Project | 2026 |\n\n![Courtyard](/api/media/image.webp)\n\n- Item\n\n[Visit](https://example.com)');
  for (const expected of ['<h2>Studio</h2>', '<strong>Bold</strong>', '<em>italic</em>', '<table>', '<td>2026</td>', 'alt="Courtyard"', '<li>Item</li>', 'href="https://example.com"']) assert.ok(html.includes(expected), expected);
});
test('raw scripts and executable URL schemes are not rendered', () => {
  const html = render('<script>alert(1)</script>\n\n[Unsafe](javascript:alert%281%29)\n\n<img src=x onerror=alert(1)>');
  assert.ok(!html.includes('<script'));
  assert.ok(!html.includes('javascript:'));
  assert.ok(!html.includes('onerror'));
});


const { readFile } = await import('node:fs/promises');
const { default: ts } = await import('typescript');
const compile = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText).toString('base64')}`;
const aboutUrl = compile(await readFile(new URL('../lib/about-content.ts', import.meta.url), 'utf8'));
let imageSource = (await readFile(new URL('../lib/markdown-images.ts', import.meta.url), 'utf8')).replace('./about-content', aboutUrl);
for (const dependency of ['unified', 'remark-parse', 'remark-gfm', 'react-markdown']) imageSource = imageSource.replace(`"${dependency}"`, JSON.stringify(import.meta.resolve(dependency)));
const { markdownImages } = await import(compile(imageSource));
test('image controls find inline and reference images, excluding code and unsafe sources', () => {
  const markdown = '![Inline](/image.webp)\n\n![Reference][photo]\n\n[photo]: /second.webp\n\n`![Code](/ignored.webp)`\n\n![Duplicate](/image.webp)\n\n![Unsafe](javascript:bad)';
  assert.deepEqual(markdownImages(markdown), [{ src: '/image.webp', alt: 'Inline' }, { src: '/second.webp', alt: 'Reference' }]);
});
