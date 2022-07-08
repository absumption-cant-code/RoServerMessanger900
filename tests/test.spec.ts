import http from '../lib/http';

describe('Test', () => {
    test('http functions', async () => {
        http("roblox.com", {method: 'GET', resolveWithBoolean: true})
            .then((stuff) => {console.warn(stuff)})
            .catch((stuff2) => { console.warn('catch', stuff2) });
        
            expect(true).toBe(true)
    })
})