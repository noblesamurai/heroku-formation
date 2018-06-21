const express = require('express');
const Heroku = require('heroku-client');
const app = express();
const heroku = new Heroku({ token: process.env.HEROKU_TOKEN });
const appName = process.env.HEROKU_APP_NAME;
const path = require('path');
const promisePoller = require('promise-poller').default;

function startApp (appName) {
  const p = path.join('/apps', appName, 'formation', 'web');
  return heroku.patch(p, {
    body: {
      quantity: 1
    }
  });
}

async function checkApp (appName) {
  const _path = path.join('/apps', appName, 'dynos', 'web.1');
  const info = await heroku.get(_path);
  if (info.state === 'up') return;
  throw (new Error('App not up.'));
}

app.get('/start', async function (req, res) {
  try {
    await startApp(appName);
    await promisePoller({
      taskFn: checkApp.bind(null, appName),
      strategy: 'linear-backoff'
    });
    return res.redirect(301, process.env.PROXY_URL);
  } catch (err) {
    console.error(err);
    res.status(500).send('There was a problem.  Check your logs.');
  }
});

app.listen(process.env.PORT || 3000);
