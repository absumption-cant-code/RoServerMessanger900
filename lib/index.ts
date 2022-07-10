import { setConfig } from './util/config';
import getEntry from './datastore/getEntry';

setConfig({apiKey: 'secret'});

getEntry({
    universeId: 'stuff',
    datastoreName: 'stuff2',
    entryKey: 'stuff3'
}).then((res) => {
    //console.log(res)
}).catch((err) => { console.log(err) })
