import { spawnSync } from 'node:child_process';

const repository = process.env.VITE_GITHUB_PAGES_REPO || 'possiblecooker-cn-guide';
const base = `/${repository}/`;
const result = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--mode', 'public-release', '--base', base], { stdio: 'inherit' });
process.exit(result.status ?? 1);
