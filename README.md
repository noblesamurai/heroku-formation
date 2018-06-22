# Heroku-transparent-up [![Build Status](https://secure.travis-ci.org/noblesamurai/heroku-transparent-up.png?branch=master)](http://travis-ci.org/noblesamurai/heroku-transparent-up) [![NPM version](https://badge-me.herokuapp.com/api/npm/heroku-transparent-up.png)](http://badges.enytc.com/for/npm/heroku-transparent-up)

> Enacts a requested dyno formation on heroku across multiple apps.

## Purpose
Allows you to request a dyno formation across multiple micro-services and wait
until it is effective.

## Installation
```bash
$ npm install heroku-formation
```

## Usage
```js
const Heroku = require('heroku-client');
const heroku = new Heroku({ token: 'mytoken' });
const { applyFormation, checkFormation } = require('heroku-formation');

async function main () {
  await applyFormation(heroku, 'appName', [{ type: 'web', quantity: 1 }]);
  // We get here after formation is enacted.
  const result = await checkFormation(heroku, 'appName', [{ type: 'web', quantity: 2 }]);
  // result is false
}
```

The formation should be of the format:
{
    web: formation1,
    worker: formation2,
        /*...*/
}
where the formation is compatible with [this doco](https://devcenter.heroku.com/articles/platform-api-reference#formation).

## API

## applyFormation(app, object) ⇒ <code>Promise</code>
**Kind**: global function  
**Returns**: <code>Promise</code> - fulfilled when scale complete.  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>string</code> | app name |
| object | <code>formation</code> |  |

<a name="checkFormation
Check whether app is in requested formation."></a>

## checkFormation
Check whether app is in requested formation.(heroku, app, formation) ⇒ <code>Boolean</code>
**Kind**: global function  
| Param | Type | | --- | --- |
| heroku | <code>Heroku</code> | 
| app | <code>string</code> | 
| formation | <code>object</code> | 


## License

The BSD License

Copyright (c) 2018, Tim Allen

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Tim Allen nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
