// Modules
import http from '../util/http'

// Types

/**
 * GetEntryRequestParams is an object with optional apiKey, required universeId, required
 * datastoreName, optional scope, and required entryKey properties.
 * @property {string} apiKey - The API key to use to authenticate the request.
 * @property universeId - The ID of the universe you want to get the entry from.
 * @property {string} datastoreName - The name of the datastore you want to get an entry from.
 * @property {string} scope - The scope of the entry.
 * @property {string} entryKey - The key of the entry you want to retrieve.
 */
export type getEntryRequestParams = {
    apiKey?: string,
    universeId: (string | number),
    datastoreName: string,
    scope?: string,
    entryKey: string
}

/**
 * getEntryResponseData a compilation of the returned response from the Roblox API when calling getEntry.
 * @property data - The data you want to store in the entry.
 * @property {string} version - The version of the entry.
 * @property {object} attributes - An object containing the attributes of the entry.
 * @property userIds - The user IDs of the users who have access to this entry.
 * @property {Date} createdAt - The date and time the entry was created.
 * @property {Date} lastModified - The last time the entry was modified.
 * @property {string} md5 - The MD5 hash of the data.
 */
export type getEntryResponseData = {
    data: (object | string | number),
    version: string,
    attributes: object,
    userIds: Array<number>,
    createdAt: Date,
    lastModified: Date,
    md5: string,
}

// Declaration
export default function getEntry(params: getEntryRequestParams): Promise<getEntryResponseData> {
    return new Promise((resolve: Function, reject: Function): void => {
        let request = http(`https://apis.roblox.com/datastores/v1/universes/${params.universeId}/standard-datastores/datastore/entries/entry`, {
            method: 'GET',
            includeCredentials: true,
            resolveWithBoolean: false
        });

        request.catch((requestError) => { reject(requestError) });
        request.then((requestResponse) => {
            let headers = typeof(requestResponse) == 'object' && requestResponse.headers || {};
            let responseData = typeof(requestResponse) == 'object' && {
                data: requestResponse.data,
                version: headers['roblox-entry-version'],
                attributes: headers['roblox-entry-attributes'],
                createdAt: headers['roblox-entry-created-time'],
                lastModified: headers['last-modified'],
                md5: headers['content-md5']
            };

            resolve(responseData);
        })
    })
}