import updateVersionJson from '../update-version.json';
import { getGlobal } from '@electron/remote';

export const DEBUG_PROD =
  getGlobal('DEBUG_PROD') ||
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true';

export const VERSION_UPDATE_URL = updateVersionJson.releases;
export const CURRENT_VERSION = updateVersionJson.version;

export const APP_NAME = 'Upfire';

export const SITE = 'https://www.upfire.com';
export const SITE_DECRYPTION = 'https://www.upfire.com/decryption.html';
export const SITE_PRIVACY = 'https://upfire.com/disclaimer.html';
