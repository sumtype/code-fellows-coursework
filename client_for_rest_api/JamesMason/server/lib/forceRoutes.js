'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const Jedi = require(__dirname + '/jedi');

var forceRouter = module.exports = exports = new express.Router();

forceRouter.get('/balance', (req, res) => {
  Jedi.find({ force: 'Light' }, (lightError, lightData) => {
    if (lightError) console.log(lightError);
    Jedi.find({ force: 'Dark' }, (darkError, darkData) => {
      if (darkError) console.log(darkError);
      Jedi.find({ force: 'Neutral' }, (neutralError, neutralData) => {
        if (neutralError) console.log(neutralError);
        var data = { LIGHT_SIDE: lightData, DARK_SIDE: darkData, CIVILIANS: neutralData };
        res.status(200).json(data);
      });
    });
  });
});
forceRouter.get('/balance/:battles', (req, res) => {
  Jedi.find({ force: 'Light' }, (lightError, lightData) => {
    if (lightError) console.log(lightError);
    Jedi.find({ force: 'Dark' }, (darkError, darkData) => {
      if (darkError) console.log(darkError);
      Jedi.find({ force: 'Neutral' }, (neutralError, neutralData) => {
        if (neutralError) console.log(neutralError);
        var numberOfBattles = parseInt(req.params.battles, 10) >= 0 ? parseInt(req.params.battles, 10) : 0;
        var lightWins = 0, darkWins = 0, lightIndex = 0, darkIndex = 0, lightHealth = 0, darkHealth = 0;
        if (lightData.length && darkData.length) {
          while (lightWins + darkWins < numberOfBattles) {
            lightIndex = 0;
            darkIndex = 0;
            lightHealth = lightData[lightIndex].health;
            darkHealth = darkData[darkIndex].health;
            while (lightIndex < lightData.length && darkIndex < darkData.length) {
              if (Math.random(0, 100) <= darkData[darkIndex].accuracy) {
                lightHealth -= Math.random(darkData[darkIndex].damage.min, darkData[darkIndex].damage.max);
              }
              if (Math.random(0, 100) <= lightData[lightIndex].accuracy) {
                darkHealth -= Math.random(lightData[lightIndex].damage.min, lightData[lightIndex].damage.max);
              }
              if (lightHealth <= 0) {
                lightIndex += 1;
                if (lightIndex < lightData.length) lightHealth = lightData[lightIndex].health;
              }
              if (darkHealth <= 0) {
                darkIndex += 1;
                if (darkIndex < darkData.length) darkHealth = darkData[darkIndex].health;
              }
            }
            if (lightIndex < lightData.length) lightWins += 1;
            if (darkIndex < darkData.length) darkWins += 1;
          }
        }
        if (lightData.length && darkData.length === 0) lightWins += 1;
        if (darkData.length && lightData.length === 0) darkWins += 1;
        res.status(200).send(battleResults(numberOfBattles, lightWins, darkWins, neutralData));
      });
    });
  });
});

forceRouter.get('/light', (req, res) => {
  Jedi.find({ force: 'Light' }, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});
forceRouter.post('/light', jsonParser, (req, res) => {
  var newJedi = new Jedi(req.body);
  newJedi.save((err, data) => {
    if (err) {
      console.log(err);
      newJedi.health = 50;
      newJedi.damage.min = 5;
      newJedi.damage.max = 10;
      newJedi.accuracy = 50;
      newJedi.save((err2, data2) => {
        res.status(200).json(data2);
      });
    } else {
      res.status(200).json(data);
    }
  });
});
forceRouter.put('/light/:id', jsonParser, (req, res) => {
  var JediData = req.body;
  delete JediData._id;
  Jedi.update({ _id: req.params.id }, JediData, (err) => {
    if (err) console.log(err);
    res.status(200).send('Successfully updated the Jedi with an id equal to ' + req.params.id);
  });
});
forceRouter.delete('/light/:id', (req, res) => {
  Jedi.remove({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    res.status(200).send('Successfully deleted the Jedi with an id equal to ' + req.params.id);
  });
});

forceRouter.get('/dark', (req, res) => {
  Jedi.find({ force: 'Dark' }, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data);
  });
});
forceRouter.post('/dark', jsonParser, (req, res) => {
  var newJedi = new Jedi(req.body);
  newJedi.save((err, data) => {
    if (err) {
      console.log(err);
      newJedi.health = 50;
      newJedi.damage.min = 5;
      newJedi.damage.max = 10;
      newJedi.accuracy = 50;
      newJedi.save((err2, data2) => {
        res.status(200).json(data2);
      });
    } else {
      res.status(200).json(data);
    }
  });
});
forceRouter.put('/dark/:id', jsonParser, (req, res) => {
  var JediData = req.body;
  delete JediData._id;
  Jedi.update({ _id: req.params.id }, JediData, (err) => {
    if (err) console.log(err);
    res.status(200).send('Successfully updated the Jedi with an id equal to ' + req.params.id);
  });
});
forceRouter.delete('/dark/:id', (req, res) => {
  Jedi.remove({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    res.status(200).send('Successfully deleted the Jedi with an id equal to ' + req.params.id);
  });
});

function battleResults(numberOfBattles, lightWins, darkWins, neutralData) {
  var results = '';
  if (numberOfBattles === 0) {
    results += '<div>The universe is at peace.</div>';
  } else if (lightWins === darkWins) {
    results += '<div>The force is in perfect balance.</div>';
  } else if (lightWins > darkWins) {
    results += '<div>The balance of the force is in favor of the light side.</div>';
  } else if (darkWins > lightWins) {
    results += '<div>The balance of the force is in favor of the dark side.</div>';
  }
  if (numberOfBattles > 0) {
    results += '<div>After ' + numberOfBattles + ' battles the light side won ' + lightWins.toString() + ' times and the dark side won ' + darkWins.toString() + ' times.</div>'; // eslint-disable-line
    if (neutralData.length === 1 && numberOfBattles === 1) {
      results += '<div>There was ' + neutralData.length.toString() + ' civilian who observed this battle.</div>';
    } else if (neutralData.length > 1 && numberOfBattles === 1) {
      results += '<div>There were ' + neutralData.length.toString() + ' civilians who observed this battle.</div>';
    } else if (neutralData.length === 1 && numberOfBattles > 1) {
      results += '<div>There was ' + neutralData.length.toString() + ' civilian who observed these battles.</div>';
    } else if (neutralData.length > 1 && numberOfBattles > 1) {
      results += '<div>There were ' + neutralData.length.toString() + ' civilians who observed these battles.</div>';
    }
  }
  return results;
}
