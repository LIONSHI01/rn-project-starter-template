const z = require('zod');

const path = require('path');
const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);
console.log('env path', envPath);

require('dotenv').config({
  path: envPath,
});

const client = z.object({
  APP_ENV: z.enum(['development', 'production']),
  API_URL: z.string(),
});

const buildTime = z.object({
  SENTRY_TOKEN: z.string(),
  BUNDLE_ID: z.string(),
});

/**
 * @type {Record<keyof z.infer<typeof client>, string | undefined>}
 * */

const _clientEnv = {
  APP_ENV,
  API_URL: process.env.API_URL,
};

console.log('======', process.env.API_URL);
const _buildTimeEnv = {
  SENTRY_TOKEN: process.env.SENTRY_TOKEN,
  BUNDLE_ID: process.env.BUNDLE_ID,
};

const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

// merge the two schemas
const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,
    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`
  );
}

const Env = parsed.success ? parsed.data : null;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
};
