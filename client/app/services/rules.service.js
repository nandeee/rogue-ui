// /* global config */
// 'use strict';

// angular.module('mystiqueApp')
//   .service('RuleService', function($http, $log, $q) {


//     var self = this;
//     this.update = function(data) {

//       return $http.post(config.backend + 'api/rules/getSelections', {
//         selectionJson: data.selectionJson,
//         modificationJson: data.modificationJson,
//         fabricJson: data.fabricJson,
//         history: self.getHistory(),
//         baseJson: data.baseJson,
//         styleJson: data.styleJson
//       });
//     };
//     this.getHistory = function() {
//       return localStorage.getItem('history');
//     };

//     this.saveRule = function(component, rule) {
//       var history = {};

//       if (localStorage.getItem('history')) {
//         try {
//           history = JSON.parse(localStorage.getItem('history'));
//         } catch (e) {
//           history = {};
//         }
//       }
//       history[component] = rule;
//       localStorage.setItem('history', JSON.stringify(history));
//       return true;
//     };

//   });
