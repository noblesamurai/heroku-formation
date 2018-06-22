# Heroku-transparent-up [![Build Status](https://secure.travis-ci.org/noblesamurai/heroku-transparent-up.png?branch=master)](http://travis-ci.org/noblesamurai/heroku-transparent-up) [![NPM version](https://badge-me.herokuapp.com/api/npm/heroku-transparent-up.png)](http://badges.enytc.com/for/npm/heroku-transparent-up)

> Enacts a requested dyno formation on heroku across multiple apps before 301 redirecting.

## Purpose
Hit the `/start` route and it'll scale your heroku dyno(s), 301 redirecting you
when it's done.

## Usage

- Push the app to heroku.
- Set the env var:
  - `HEROKU_TOKEN` - heroku api token

```
GET /start?redirect_to=mylocation&formation=<URIencodedFormationAsJSON>
```
- The `formation` query string param should be  a json stringified, uri encoded string of the format:
```js
{
  app1: formation1,
  app2: formation2,
  /*...*/
}
```
where the formation is [compatible with this doco](https://devcenter.heroku.com/articles/platform-api-reference#formation).

Valid example:
```js
{
  my-heroku-app: [{ type: 'web', quantity: 1 }],
  my-heroku-api: [{ type: 'web', quantity: 1 }, { type: 'worker', quantity: 3 }]
}
```

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
