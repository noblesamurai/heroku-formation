const express = require('express');
const app = express();

const { HEROKU_TOKEN: token } = process.env;

const Heroku = require('heroku-client');
const heroku = new Heroku({ token });
const applyFormation = require('./apply-formation');

app.get('/start', async function (req, res) {
  try {
    if (!req.query.formation || !req.query.redirect_to) return res.sendStatus(422);
    const formation = JSON.parse(req.query.formation);
    const apps = Object.keys(formation);
    await Promise.all(apps.map(app => applyFormation(heroku, app, formation[app])));
    return res.redirect(301, req.query.redirect_to);
  } catch (err) {
    console.error(err);
    res.status(500).send('There was a problem.  Check your logs.');
  }
});

if (require.main === module) {
  app.listen(process.env.PORT || 3000);
} else {
  module.exports = app;
}
