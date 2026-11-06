import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import semver from 'semver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

async function getLatestNpmVersion(packageName: string): Promise<string | null> {
  try {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data['dist-tags']?.latest || null;
  } catch {
    return null;
  }
}

function getLatestCommitMessage(): string {
  try {
    return execSync('git log -1 --pretty=%B', { encoding: 'utf-8', cwd: ROOT_DIR }).trim();
  } catch {
    return '';
  }
}

type ReleaseType = 'major' | 'minor' | 'patch';

function determineReleaseType(commitMessage: string): ReleaseType {
  const normalized = commitMessage.toLowerCase();

  // 1. Major: BREAKING CHANGE: 또는 type!:
  if (
    commitMessage.includes('BREAKING CHANGE') ||
    /^[a-z]+(\([a-z0-9_-]+\))?!:/i.test(commitMessage)
  ) {
    return 'major';
  }

  // 2. Minor: feat: 또는 feat(...):
  if (/^feat(\([a-z0-9_-]+\))?:/i.test(commitMessage)) {
    return 'minor';
  }

  // 3. Default: patch (fix, docs, chore, refactor, perf, style, etc.)
  return 'patch';
}

async function main() {
  console.log('🔍 Calculating semantic version bump based on commit history & registry...');

  const pkgPath = path.join(ROOT_DIR, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const currentPkgVersion = pkg.version || '0.1.0';

  const commitMsg = getLatestCommitMessage();
  console.log(`📝 Latest commit message: "${commitMsg.split('\n')[0]}"`);

  if (commitMsg.includes('[skip ci]') || commitMsg.includes('chore(release):')) {
    console.log('⏭️ Release skipped: detected automated release commit.');
    process.exit(0);
  }

  // 1. Find the highest base version between package.json and npm registry
  const npmVersion = await getLatestNpmVersion(pkg.name);
  console.log(`📦 Registry latest version: ${npmVersion || 'None'}`);
  console.log(`📄 Local package.json version: ${currentPkgVersion}`);

  let baseVersion = currentPkgVersion;
  if (npmVersion && semver.valid(npmVersion)) {
    if (semver.gt(npmVersion, baseVersion)) {
      baseVersion = npmVersion;
    }
  }

  // 2. Determine bump type
  const releaseType = determineReleaseType(commitMsg);
  const nextVersion = semver.inc(baseVersion, releaseType);

  if (!nextVersion) {
    throw new Error(`Failed to increment version from base: ${baseVersion}`);
  }

  console.log(`🚀 Bumping version: ${baseVersion} -> ${nextVersion} (${releaseType})`);

  // 3. Update package.json
  pkg.version = nextVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
  console.log(`✅ Updated package.json version to ${nextVersion}`);

  // 4. Update src/index.ts
  const indexPath = path.join(ROOT_DIR, 'src', 'index.ts');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    indexContent = indexContent.replace(
      /export const ATOM_VERSION = ['"][^'"]+['"];/,
      `export const ATOM_VERSION = '${nextVersion}';`
    );
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log(`✅ Updated src/index.ts ATOM_VERSION to ${nextVersion}`);
  }

  // 5. Update src/cli.ts
  const cliPath = path.join(ROOT_DIR, 'src', 'cli.ts');
  if (fs.existsSync(cliPath)) {
    let cliContent = fs.readFileSync(cliPath, 'utf-8');
    cliContent = cliContent.replace(
      /console\.log\(['"]atomsystem v[^'"]+['"]\);/,
      `console.log('atomsystem v${nextVersion}');`
    );
    fs.writeFileSync(cliPath, cliContent, 'utf-8');
    console.log(`✅ Updated src/cli.ts version fallback to ${nextVersion}`);
  }

  // 6. Export outputs for GitHub Actions
  const githubOutput = process.env.GITHUB_OUTPUT;
  if (githubOutput && fs.existsSync(githubOutput)) {
    fs.appendFileSync(githubOutput, `version=${nextVersion}\n`);
    fs.appendFileSync(githubOutput, `release_type=${releaseType}\n`);
  }

  const githubEnv = process.env.GITHUB_ENV;
  if (githubEnv && fs.existsSync(githubEnv)) {
    fs.appendFileSync(githubEnv, `NEW_VERSION=${nextVersion}\n`);
  }

  console.log(`✨ Successfully prepared release for version v${nextVersion}!`);
}

main().catch((err) => {
  console.error('❌ Failed to bump version:', err);
  process.exit(1);
});
