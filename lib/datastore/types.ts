export type datastoreRequestParameters = {
    universeId: number,
    datastoreName: string,
    entryKey: string,

    scope?: string,
    attributes?: object,
    userids?: Array<number>,
    
    versionId?: string,
    matchVersion?: string,
    cursor?: string
}

export interface datastoreRequestParametersSet extends datastoreRequestParameters {
    content: JSON,
    contentmd5: string,
}

export interface datastoreListRequestParameters {
    prefix?: string,
    limit?: number,
    cursor?: string
}

export interface datastoreEntriesRequestParameters {
    datastoreName: string,
    scope?: string,
    AllScopes?: boolean,
    prefix?: string,
    limit?: number,
    cursor?: string
}
