import { ExpoConfig, ConfigContext } from 'expo/config';
import { execSync } from 'child_process';

const getCommitHash = (): string => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
};

const getBuildDate = (): string => {
  return new Date().toISOString();
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  plugins: [
    ...(config.plugins ?? []),
    'expo-localization',
  ],
  extra: {
    ...config.extra,
    buildId: `${getBuildDate()}-${getCommitHash()}`,
    commitHash: getCommitHash(),
  },
});
