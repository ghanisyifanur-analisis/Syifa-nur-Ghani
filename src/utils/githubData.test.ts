import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILES, generateContributionWeeks, buildProfileMarkdown } from './githubData';

test('PROFILES contains ghanisyifanur-analisis and maoneart', () => {
  assert.ok(PROFILES['ghanisyifanur-analisis'], 'Profile ghanisyifanur-analisis should exist');
  assert.ok(PROFILES['maoneart'], 'Profile maoneart should exist');
  
  const ghani = PROFILES['ghanisyifanur-analisis'];
  assert.equal(ghani.login, 'ghanisyifanur-analisis');
  assert.equal(ghani.company, 'Indonesia');
  assert.equal(ghani.location, 'Jawa Barat, Bekasi');
  assert.ok(ghani.pinnedRepos.length > 0, 'Should have pinned repositories');
});

test('generateContributionWeeks returns 52 weeks of 7 days each', () => {
  const weeks = generateContributionWeeks(42);
  assert.equal(weeks.length, 52, 'Should generate exactly 52 weeks');
  for (const w of weeks) {
    assert.equal(w.days.length, 7, 'Each week must have 7 days');
    for (const d of w.days) {
      assert.ok(d.level >= 0 && d.level <= 4, 'Level must be 0..4');
      assert.ok(d.count >= 0, 'Count must be >= 0');
    }
  }
});

test('buildProfileMarkdown formats valid README markdown', () => {
  const ghani = PROFILES['ghanisyifanur-analisis'];
  const md = buildProfileMarkdown(ghani);
  assert.ok(md.includes(ghani.readme.greeting), 'Markdown should include greeting');
  assert.ok(md.includes('Interested in:'), 'Markdown should include Interested in');
  assert.ok(md.includes('Currently learning:'), 'Markdown should include Currently learning');
  assert.ok(md.includes('GitHub Stats'), 'Markdown should include GitHub Stats header');
});
