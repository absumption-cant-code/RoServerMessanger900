/** @returns getConfig, setConfig  */

// Dependencies
import { config } from 'dotenv';

// Types
/* Interface for all possible configuration options */
interface configurationOptions {
    apiKey?: string
}

// Declarations
/**
 * Utility for obtaining the current configuration object
 * @category Util
 * @alias config
 * @returns {configurationOptions} - Library configuration options
 * @example getConfig();
 */
export function getConfig(): configurationOptions {
    let config = process.env._libraryConfiguration;

    if (!config) { return {} } else {
        return JSON.parse(config)
    }
}

/**
 * Utility for seting the current configuration Object
 * @category Util
 * @alias config
 * @returns {void}
 * @example setConfig({apiKey: 'api-key-here'});
 */
export function setConfig(config: configurationOptions): void {
    process.env._libraryConfiguration = JSON.stringify(config)
}