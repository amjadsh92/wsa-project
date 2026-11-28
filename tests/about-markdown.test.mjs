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
