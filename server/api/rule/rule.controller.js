'use strict';

var _ = require('lodash');
var pcm = require('../../pcm');
var rogue = require('../rogue/rogue.controller');


// Get list of rules
exports.index = function(req, res) {
  res.json([]);
};

exports.getSelections = function(req, res) {
  var history = req.body.history;
  var baseJson = req.body.baseJson;
  var styleJson = req.body.styleJson;
  var selectionJson = req.body.selectionJson;
  var modificationJson = req.body.modificationJson;
  var fabricJson = req.body.fabricJson;

  if (!baseJson || !styleJson || !selectionJson || !modificationJson) {
    res.send('500', 'Mandatory fields not specified');
  }

  var body = '';
  //var key = data.modificationJson[Object.keys(data.modificationJson)[1]].split(',')[2];
  var data = {
    selectionJson: selectionJson,
    modificationJson: modificationJson,
    fabricJson: fabricJson
  }
  var result = '';
  rogue.getSelection(data, function(response) {
    response.on('data', function(chunk) {
      result += chunk;
    });
    response.on('end', function() {
      //console.log(res);

      //var rules = aggregate({}, selectionJson);
      var rules = {
        cuff_components_include: []
      };
      var result = applyRule(rules, baseJson, styleJson, selectionJson);
      return res.json(200, result);
    });
    response.on('error', function(err) {
      var rules = {
        cuff_components_include: []
      };
      var result = applyRule(rules, baseJson, styleJson, selectionJson);
      return res.json(200, result);
      //return res.json(500, err);
    })
  });
};


var applyRule = function(rule, baseJson, styleJson, selectionJson) {
  try {
    var rc = 'recommended_components',
      ac = 'all_components',
      rcfp = 'recommended_cf_placements',
      acfp = 'all_cf_placements',
      rctp = 'recommended_tape_placements',
      actp = 'all_tape_placements';

    styleJson = _.extend(styleJson);
    var component = {};
    var baseComponent = {};

    _.forEach(rule, function(value, key) {
      //get component
      var componentType = key.split('_')[0];
      component = styleJson[componentType];
      baseComponent = baseJson[componentType];

      if (key.indexOf('cf_placements_include') > -1) {
        if (!component || !component.hasOwnProperty(rcfp) || !component.hasOwnProperty(acfp) ||
          !baseComponent.hasOwnProperty(rcfp) || !baseComponent.hasOwnProperty(acfp)) {
          ////$log.error('RULE : One of the placement key not present in style json');
          //throw "key is missing in styleJson";
          return true;
        }
        //if include is empty remove entire component from styleJson
        if (value.length === 0) {
          ////$log.debug('RULE : Removed component from styleJson :' + componentType);

          delete styleJson[componentType];
          return true;
        }
        _.forEach(value, function(componentId) {
          //if base have and style doesn't have add it
          if (baseComponent[rcfp].indexOf(componentId) > -1 && component[rcfp].indexOf(componentId) === -1) {
            component[rcfp] = component[rcfp].concat(componentId);
          }
          if (baseComponent[acfp].indexOf(componentId) > -1 && component[acfp].indexOf(componentId) === -1) {
            component[acfp] = component[acfp].concat(componentId);
          }
        });
        styleJson[componentType] = component;
      } else if (key.indexOf('cf_placements_exclude') > -1) {
        if (!component || !component.hasOwnProperty(rcfp) || !component.hasOwnProperty(acfp) ||
          !baseComponent.hasOwnProperty(rcfp) || !baseComponent.hasOwnProperty(acfp)) {
          //$log.error('RULE : One of the placement key not present in style json');
          //throw new Error('key is missing in styleJson')
          return true;
        }
        if (!component) {
          return true;
        }
        _.forEach(value, function(componentId) {
          if (component[rcfp].indexOf(componentId) > -1) {
            component[rcfp].splice(component[rcfp].indexOf(componentId), 1);
          }
          if (component[acfp].indexOf(componentId) > -1) {
            component[acfp].splice(component[acfp].indexOf(componentId), 1);
          }
          //remove cf from selection
          if (selectionJson.subComponents.hasOwnProperty(componentId) &&
            selectionJson.subComponents[componentId].hasOwnProperty('fabric')) {
            delete selectionJson.subComponents[componentId].fabric;
          }
        });

        styleJson[componentType] = component;
      } else if (key.indexOf('tape_placements_include') > -1) {
        if (!component || !component.hasOwnProperty(rctp) || !component.hasOwnProperty(actp) ||
          !baseComponent.hasOwnProperty(rctp) || !baseComponent.hasOwnProperty(actp)) {
          //$log.error('RULE : One of the placement key not present in style json');
          //throw new Error('key is missing in styleJson')
          return true;
        }
        if (!component || !component.hasOwnProperty(rctp) || !component.hasOwnProperty(actp) ||
          !baseComponent.hasOwnProperty(rctp) || !baseComponent.hasOwnProperty(actp)) {
          return true;
        }

        _.forEach(value, function(componentId) {
          //if base have and style doesn't have add it
          if (baseComponent[rctp].indexOf(componentId) > -1 && component[rctp].indexOf(componentId) === -1) {
            component[rctp] = component[rctp].concat(componentId);
          }
          if (baseComponent[actp].indexOf(componentId) > -1 && component[actp].indexOf(componentId) === -1) {
            component[actp] = component[actp].concat(componentId);
          }
        });
        styleJson[componentType] = component;

      } else if (key.indexOf('tape_placements_exclude') > -1) {
        if (!component || !component.hasOwnProperty(rctp) || !component.hasOwnProperty(actp) ||
          !baseComponent.hasOwnProperty(rctp) || !baseComponent.hasOwnProperty(actp)) {
          //throw new Error('key is missing in styleJson')
          //$log.error('RULE : One of the placement key not present in style json');
          return true;
        }
        if (!component) {
          return true;
        }
        _.forEach(value, function(componentId) {
          if (component[rctp].indexOf(componentId) > -1) {
            component[rctp].splice(component[rctp].indexOf(componentId), 1);
          }
          if (component[actp].indexOf(componentId) > -1) {
            component[actp].splice(component[actp].indexOf(componentId), 1);
          }
        });
        //remove cf from selection
        if (selectionJson.subComponents.hasOwnProperty(componentId) &&
          selectionJson.subComponents[componentId].hasOwnProperty('tape')) {
          delete selectionJson.subComponents[componentId].tape;
        }
        styleJson[componentType] = component;

      } else if (key.indexOf('components_include') > -1) {
        if (!component || !component.hasOwnProperty(rc) || !component.hasOwnProperty(ac) ||
          !baseComponent.hasOwnProperty(rc) || !baseComponent.hasOwnProperty(ac)) {
          //throw new Error('key is missing in styleJson')
          //$log.error('RULE : One of the placement key not present in style json');
          return true;
        }

        //if include is empty remove entire component from styleJson
        if (value.length === 0) {

          //remove all placements from selection too beacuse if we delete component
          //cf remains in selection
          _.forEach(styleJson[componentType][acfp], function(value) {
            delete selectionJson.subComponents[value];
          });
          delete selectionJson.components[componentType];
          delete styleJson[componentType];
          return true;
        }
        _.forEach(value, function(componentId) {
          //if base have and style doesn't have add it
          if (baseComponent[rc].indexOf(componentId) > -1 && component[rc].indexOf(componentId) === -1) {
            component[rc] = component[rc].concat(componentId);
          }
          if (baseComponent[ac].indexOf(componentId) > -1 && component[ac].indexOf(componentId) === -1) {
            component[ac] = component[ac].concat(componentId);
          }
        });
        styleJson[componentType] = component;
      } else if (key.indexOf('components_exclude') > -1) {
        if (!component || !component.hasOwnProperty(rc) || !component.hasOwnProperty(ac) ||
          !baseComponent.hasOwnProperty(rc) || !baseComponent.hasOwnProperty(ac)) {
          //throw new Error('key is missing in styleJson')
          //$log.error('RULE : One of the placement key not present in style json');
          return true;
        }
        if (!component) {
          return true;
        }
        _.forEach(value, function(componentId) {
          if (component[rc].indexOf(componentId) > -1) {
            component[rc].splice(component[rc].indexOf(componentId), 1);
          }
          if (component[ac].indexOf(componentId) > -1) {
            component[ac].splice(component[ac].indexOf(componentId), 1);
          }
        });
        //remove cf from selection
        if (selectionJson.components.hasOwnProperty(componentType) &&
          components[ac].indexOf(selectionJson.components[componentType]) === -1) {
          selectionJson.components[componentType] = component[ac][0];
        }
        styleJson[componentType] = component;
      }
    });
    return {
      styleJson: styleJson,
      selectionJson: selectionJson
    };
  } catch (err) {
    throw err;
  } finally {
    return {
      styleJson: styleJson,
      selectionJson: selectionJson
    };
  }
};
var aggregate = function(rules, selectionJson) {

  var availableComponents = [];

  //get only rules that are applicable to curren selection from history
  _.forEach(selectionJson.components, function(value, key) {
    availableComponents.push(value);
  });

  var rule = {};
  //go through each componentRule and concat with existing rule & unique them
  _.forEach(availableComponents, function(value) {
    var oneRule = rules[value];
    _.forEach(oneRule, function(value, key) {
      //concat rules
      if (rule.hasOwnProperty(key)) {
        rule[key] = rule[key].concat(value);
      } else {
        rule[key] = [].concat(value);
      }
    });
  });

  //remove includes if excludes exists
  var excludes = [];
  _.forEach(rule, function(value, key) {
    if (key.indexOf('exclude') > -1) {
      excludes = excludes.concat(value);
    }
  });

  //go through include remove if any exists in exclude
  _.forEach(rule, function(value, key) {
    if (key.indexOf('include') > -1) {
      _.forEach(value, function(component) {
        if (excludes.indexOf(component) > -1) {
          value.splice(value.indexOf(component), 1);
        }
      });
    }
  });
  return rule;
};
