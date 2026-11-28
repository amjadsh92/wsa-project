import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const projectSource = await readFile(new URL('../lib/project-content.ts', import.meta.url), 'utf8');
const projectCompiled = ts.transpileModule(projectSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const projectUrl = `data:text/javascript;base64,${Buffer.from(projectCompiled).toString('base64')}`;
const { allProjects, parsePortfolio, defaultPortfolio, createProject, coverGeometry } = await import(projectUrl);
const aboutSource = await readFile(new URL('../lib/about-content.ts', import.meta.url), 'utf8');
const aboutCompiled = ts.transpileModule(aboutSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const aboutUrl = `data:text/javascript;base64,${Buffer.from(aboutCompiled).toString('base64')}`;
const { parseAboutSections, defaultAboutSections } = await import(aboutUrl);
const source = (await readFile(new URL('../lib/home-content.ts', import.meta.url), 'utf8')).replace('./project-content', projectUrl).replace('./about-content', aboutUrl);
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { defaultHomeContent, fallbackImage, parseHomeContent, visibleImages, visibleWords, pageSlug, pagePath } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

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

test('older settings retain default navigation names', () => {
  const { navigation, ...legacy } = defaultHomeContent;
  assert.deepEqual(parseHomeContent(legacy).navigation, navigation);
});
test('navigation names are trimmed and validated before publishing', () => {
  const navigation = { page1: ' Studio ', page2: 'Objects', page3: 'Buildings' };
  assert.deepEqual(parseHomeContent({ ...defaultHomeContent, navigation }).navigation, { page1: 'Studio', page2: 'Objects', page3: 'Buildings' });
  for (const value of [null, {}, { ...navigation, page2: '' }, { ...navigation, page1: 'x'.repeat(31) }]) {
    assert.throws(() => parseHomeContent({ ...defaultHomeContent, navigation: value }));
  }
  assert.equal(parseHomeContent({ ...defaultHomeContent, navigation: { ...navigation, page2: '' } }, true).navigation.page2, '');
});

test('legacy navigation names migrate to stable page identifiers', () => {
  assert.deepEqual(parseHomeContent({ ...defaultHomeContent, navigation: { about: 'Studio', art: 'Design', architecture: 'Buildings' } }).navigation, { page1: 'Studio', page2: 'Design', page3: 'Buildings' });
});
test('public page URLs must be unique and avoid reserved paths', () => {
  for (const page2 of ['Admin', 'API', 'page1', 'About', '!!!']) {
    assert.throws(() => parseHomeContent({ ...defaultHomeContent, navigation: { ...defaultHomeContent.navigation, page2 } }));
  }
});

test('page names generate readable public URLs', () => {
  assert.equal(pageSlug('  Our Studio  '), 'our-studio');
  assert.equal(pageSlug('Café & Design'), 'cafe-design');
  assert.equal(pagePath({ ...defaultHomeContent.navigation, page2: 'Design' }, 'page2'), '/design');
  assert.throws(() => parseHomeContent({ ...defaultHomeContent, navigation: { page1: 'Our Studio', page2: 'Our-Studio', page3: 'Buildings' } }));
});

test('legacy documents receive independent projects in each header', () => {
  const { portfolio: _, ...legacy } = defaultHomeContent;
  const value = parseHomeContent(legacy);
  assert.equal(value.portfolio.page2.length, 3);
  assert.equal(new Set(allProjects(value.portfolio, 'page2').map(p => p.slug)).size, 27);
  value.portfolio.page2[1].projects[0].title = 'Changed';
  assert.notEqual(value.portfolio.page2[0].projects[0].title, 'Changed');
});
test('project category follows its header and text/images survive validation', () => {
  const portfolio = defaultPortfolio();
  portfolio.page2[1].title = 'Sculpture';
  Object.assign(portfolio.page2[1].projects[0], { title: 'New title', location: 'Beirut', year: '2030', image: image.src, description: 'Before', moreDescription: 'After', images: [{ src: image.src, alt: 'Detail' }] });
  const value = parsePortfolio(portfolio);
  const project = allProjects(value, 'page2').find(p => p.slug === 'header2-image1');
  assert.equal(project.category, 'Sculpture');
  assert.equal(project.description, 'Before');
  assert.equal(project.moreDescription, 'After');
  assert.equal(project.images[0].src, image.src);
});
test('project validation rejects malformed media, years, duplicate URLs and oversized text', () => {
  for (const patch of [{ image: '/etc/passwd' }, { year: '20x5' }, { description: 'x'.repeat(5001) }, { images: [{ src: 'https://example.com/x.jpg', alt: '' }] }, { title: '' }]) {
    const portfolio = defaultPortfolio();
    Object.assign(portfolio.page3[0].projects[0], patch);
    assert.throws(() => parsePortfolio(portfolio));
  }
  const portfolio = defaultPortfolio();
  portfolio.page2[1].projects[0].slug = 'image1';
  assert.throws(() => parsePortfolio(portfolio), /unique/);
});

test('headers support empty lists and more than fifty independently editable projects', () => {
  const portfolio = defaultPortfolio();
  portfolio.page2[0].projects = [];
  portfolio.page3[2].projects = Array.from({ length: 125 }, (_, i) => createProject('project-' + i));
  const parsed = parsePortfolio(portfolio);
  assert.equal(parsed.page2[0].projects.length, 0);
  assert.equal(parsed.page3[2].projects.length, 125);
  assert.equal(parsed.page3[2].projects[0].images.length, 0);
  parsed.page3[2].projects[0].images.push({ src: image.src, alt: 'Detail' });
  assert.equal(parsed.page3[2].projects[1].images.length, 0);
});

test('cover positions default to the center for existing projects and preserve edits', () => {
  const portfolio = defaultPortfolio();
  delete portfolio.page2[0].projects[0].coverX;
  delete portfolio.page2[0].projects[0].coverY;
  let parsed = parsePortfolio(portfolio);
  assert.equal(parsed.page2[0].projects[0].coverX, 50);
  assert.equal(parsed.page2[0].projects[0].coverY, 50);
  parsed.page2[0].projects[0].coverX = 20;
  parsed.page2[0].projects[0].coverY = 85;
  parsed = parsePortfolio(parsed);
  assert.equal(allProjects(parsed, 'page2')[0].coverX, 20);
  assert.equal(allProjects(parsed, 'page2')[0].coverY, 85);
});
test('cover positions reject invalid values', () => {
  for (const value of [-1, 101, NaN, Infinity, '50', null]) {
    const portfolio = defaultPortfolio();
    portfolio.page3[0].projects[0].coverY = value;
    assert.throws(() => parsePortfolio(portfolio), /Cover position/);
  }
});

test('cover zoom migrates old projects and survives a save round trip', () => {
  const portfolio = defaultPortfolio();
  delete portfolio.page2[0].projects[0].coverZoom;
  assert.equal(parsePortfolio(portfolio).page2[0].projects[0].coverZoom, 1);
  portfolio.page2[0].projects[0].coverZoom = 2.25;
  const project = parsePortfolio(portfolio).page2[0].projects[0];
  assert.equal(project.coverZoom, 2.25);
  assert.equal(coverGeometry(100, 100, 200, 100, project.coverZoom).width, 450);
});
test('cover zoom supports zooming out and rejects values outside the supported range', () => {
  for (const coverZoom of [0, 0.009, 3.01, NaN, Infinity, null, '2']) {
    const portfolio = defaultPortfolio();
    portfolio.page3[0].projects[0].coverZoom = coverZoom;
    assert.throws(() => parsePortfolio(portfolio), /Cover zoom/);
  }
});

test('zoomed-out settings survive validation', () => {
  const portfolio = defaultPortfolio();
  portfolio.page2[0].projects[0].coverZoom = 0.25;
  assert.equal(parsePortfolio(portfolio).page2[0].projects[0].coverZoom, 0.25);
});
test('fit full image reveals all pixels for wide and tall covers', () => {
  for (const [width, height] of [[2000, 200], [200, 2000], [800, 600]]) {
    const base = coverGeometry(340, 300, width, height);
    const fitted = coverGeometry(340, 300, width, height, base.fitZoom);
    assert.ok(fitted.width <= 340.0001 && fitted.height <= 300.0001);
    assert.ok(fitted.left >= -0.0001 && fitted.top >= -0.0001);
    assert.ok(Math.abs(fitted.width / fitted.height - width / height) < 0.0001);
  }
});

test('legacy content receives the existing About sections without changing their text', () => {
  const { about, ...legacy } = defaultHomeContent;
  assert.deepEqual(parseHomeContent(legacy).about, defaultAboutSections);
  const copy = parseAboutSections(undefined);
  copy[0].title = 'Changed';
  assert.notEqual(defaultAboutSections[0].title, 'Changed');
});
test('About Markdown preserves formatting and validates section shape', () => {
  const sections = structuredClone(defaultAboutSections);
  sections[1].title = 'Capabilities';
  sections[1].markdown = '## Heading\n\n| Name | Value |\n| --- | --- |\n| A | B |\n\n![Image](/architecture/images/project1.jpg)\n';
  assert.deepEqual(parseAboutSections(sections), sections);
  for (const value of [[], null, [{ ...sections[0], id: 'bad' }, ...sections.slice(1)], [{ ...sections[0], markdown: 5 }, ...sections.slice(1)]]) assert.throws(() => parseAboutSections(value));
});
