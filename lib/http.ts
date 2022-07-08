/** @returns {Function http}  */

// Dependencies
import axios, { AxiosError, AxiosResponse } from 'axios';

// Modules

// Types
interface requestOptions {
    // Required Params
    method: string,

    // Optional Params
    headers?: object,
    contentType?: string,
    includeCredentials?: boolean,
    resolveWithBoolean?: boolean
}

// Documentation
/**
 * Utility for sending various different kinds of http requests to the Roblox Cloud API service
 * @category Util
 * @alias https
 * @param {string} url - The URL
 * @param {requestOptions} options - The options that are used to configure the http object
 * @param {object || string} body - An optional argument that will be passed as the body
 * @returns {Promise<string>} - API response from Roblox
 * @example http("https://apis.roblox.com/", {method: "GET", includeCredentials: false})
 */

export default function http(url: string, options: requestOptions, body?: (object|string)): Promise<string> {
    if (!url) { throw new Error('You must provide a url to send the request to.') };
    if (!options.method) { throw new Error('You must provide a method in the options object.') };
    if (!url.includes('roblox.com')) { throw new Error('The URL argument must contain the roblox domain') };

    return new Promise((resolve: Function, reject: Function): void => {
        let request = axios({
            url: url,
            method: options.method,
            headers: Object.assign({ // Headers defined in the options object have priority over default headers
                'Content-Type': options.contentType || 'application/json',
                'x-api-key': options.includeCredentials ? 'api-key' : ''
            }, options.headers || {}) 
        });

        request.catch((error: AxiosError): void => { reject(options.resolveWithBoolean ? false : error.status) });
        request.then((response: AxiosResponse): void => {
            if (response.status >= 300 || response.status <= 199) { reject(options.resolveWithBoolean ? false : response.statusText) };
            resolve(options.resolveWithBoolean ? true : response)
        })
    })
}