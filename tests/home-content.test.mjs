import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../lib/home-content.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { defaultHomeContent, fallbackImage, parseHomeContent, visibleImages, visibleWords } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

const image = { id: 'b102eb69-7680-43cb-9bbd-57bc2db52b21.webp', src: '/api/media/b102eb69-7680-43cb-9bbd-57bc2db52b21.webp', alt: 'Courtyard', x: 50, y: 50 };

test('an empty carousel always displays the default image', () => {
  assert.deepEqual(visibleImages(parseHomeContent(defaultHomeContent)), [fallbackImage]);
});
test('main title can stand alone, and hidden words do not create separators', () => {
  const content = parseHomeContent({ ...defaultHomeContent, title: '  STUDIO  ', showCompanion: false, showWords: [false, false, false] });
  assert.equal(content.title, 'STUDIO');
  assert.deepEqual(visibleWords(content), []);
  assert.deepEqual(visibleWords({ ...content, showWords: [true, false, true] }), ['Architecture', 'Design']);
});
test('drafts require a title, while preview can display an in-progress empty field', () => {
  assert.throws(() => parseHomeContent({ ...defaultHomeContent, title: ' ' }), /main title/);
  assert.equal(parseHomeContent({ ...defaultHomeContent, title: '' }, true).title, '');
});
test('only registered upload URLs and bounded image positions are accepted', () => {
  assert.equal(parseHomeContent({ ...defaultHomeContent, images: [image] }).images[0].src, image.src);
  for (const patch of [{ src: 'https://elsewhere.test/image.jpg' }, { src: '/api/media/../../secret' }, { x: 101 }, { y: -1 }, { x: NaN }]) {
    assert.throws(() => parseHomeContent({ ...defaultHomeContent, images: [{ ...image, ...patch }] }));
  }
  assert.throws(() => parseHomeContent({ ...defaultHomeContent, images: [image, image] }), /twice/);
});
test('malformed, oversized and incomplete settings are rejected', () => {
  for (const value of [null, {}, { ...defaultHomeContent, title: 'X'.repeat(41) }, { ...defaultHomeContent, words: ['one'] }, { ...defaultHomeContent, showWords: [true, true, 'false'] }]) assert.throws(() => parseHomeContent(value));
});
