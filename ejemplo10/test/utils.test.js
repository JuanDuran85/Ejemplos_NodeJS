const { merge } = require('../lib/utils');
const assert = require('assert');

describe('test merge',()=>{
    it('prevents proto pollutions ', () => {
        const malicious = JSON.parse('{"__proto__":{"injected":0}}');
        merge({},malicious);

        const o = {};
        assert.strictEqual(o.injected, undefined);

    });
})

//  ./node_modules/.bin/mocha test/utils.test.js 