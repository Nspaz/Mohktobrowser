import { spawnSync } from 'node:child_process';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import type { Browser } from 'playwright';

const COLORS = {
  reset: '\x1b[0m',
  cyan: '\x1b[96m',
  green: '\x1b[92m',
  magenta: '\x1b[95m',
  yellow: '\x1b[93m',
  red: '\x1b[91m',
};

const REQUIRED_PACKAGES = ['playwright'];
const DEFAULT_URL = 'https://example.com';
const SLEEP_MS = 45;

const color = (code: string, text: string): string => `${code}${text}${COLORS.reset}`;
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

function runCommand(command: string, args: string[]): void {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(' ')}`);
  }
}

function isPackageInstalled(pkg: string): boolean {
  try {
    require.resolve(pkg);
    return true;
  } catch {
    return false;
  }
}

function installMissingPackages(missingPackages: string[]): void {
  if (!missingPackages.length) {
    return;
  }
  console.log(color(COLORS.yellow, `\n[deps] Installing missing packages: ${missingPackages.join(', ')}`));
  runCommand(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install', ...missingPackages, '--save']);
}

async function showLoadingScreen(label: string): Promise<void> {
  const width = 30;
  process.stdout.write(`\n${color(COLORS.magenta, '[boot]')} ${label}\n`);
  for (let i = 0; i <= width; i += 1) {
    const completed = '#'.repeat(i);
    const pending = '.'.repeat(width - i);
    const percentage = Math.floor((i / width) * 100);
    process.stdout.write(`\r${color(COLORS.cyan, '[system]')} [${completed}${pending}] ${percentage}%`);
    await sleep(SLEEP_MS);
  }
  process.stdout.write('\n');
}

function normalizeUrl(rawInput: string): string {
  const trimmed = rawInput.trim() || DEFAULT_URL;
  const candidate = trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`;
  const parsed = new URL(candidate);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only http/https URLs are supported.');
  }
  return parsed.toString();
}

async function main(): Promise<void> {
  console.log(color(COLORS.magenta, '╔═════════════════════════════════════════════╗'));
  console.log(color(COLORS.magenta, '║      BULLETPROOF OCTO MOBILE LAUNCHER      ║'));
  console.log(color(COLORS.magenta, '╚═════════════════════════════════════════════╝'));

  const missingPackages = REQUIRED_PACKAGES.filter((pkg) => !isPackageInstalled(pkg));
  installMissingPackages(missingPackages);

  console.log(color(COLORS.yellow, '[deps] Ensuring Chromium browser dependency is installed...'));
  runCommand(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['playwright', 'install', 'chromium']);

  const rl = readline.createInterface({ input, output });
  const rawUrl = await rl.question(
    color(COLORS.green, `\n[target] Enter URL to open (default: ${DEFAULT_URL}): `),
  );
  rl.close();

  const url = normalizeUrl(rawUrl);
  await showLoadingScreen('Booting secure mobile browsing session...');

  const { chromium } = await import('playwright');
  let browser: Browser;
  try {
    browser = await chromium.launch({ headless: false });
  } catch {
    console.log(color(COLORS.yellow, '[warn] No display detected, falling back to headless mode.'));
    browser = await chromium.launch({ headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page = await context.newPage();

  console.log(color(COLORS.cyan, `[nav] Navigating to ${url}`));
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  console.log(color(COLORS.green, '[ok] Connected. Press Ctrl+C to close.'));

  process.on('SIGINT', async () => {
    console.log(color(COLORS.red, '\n[exit] Closing browser...'));
    await browser.close();
    process.exit(0);
  });
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(color(COLORS.red, `[error] ${message}`));
  process.exit(1);
});
