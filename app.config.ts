import type { ConfigContext, ExpoConfig } from 'expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'my-app',
  name: 'My App',
  extra: {
    ...ClientEnv,
  },
});
