import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cliffvibe.app',
  appName: 'CliffVibe',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    // Add plugin configurations here
  }
};

export default config;
