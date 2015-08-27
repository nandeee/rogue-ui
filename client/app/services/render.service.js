// /*global config */
// 'use strict';
// angular.module('mystiqueApp')
//   .service('RenderService', function(FabricService, ComponentService, $log, $q) {
//     // AngularJS will instantiate a singleton by calling "new" on this function
//     /* sort images based on view order*/
//     function sortViewImages(imageObject) {
//       var sortedImages = Object.keys(imageObject).sort(function(a, b) {
//         return imageObject[a] - imageObject[b];
//       });
//       return sortedImages;
//     }

//     this.generateImages = function(category, view, dataLoaded, selection) {
//       var defered = $q.defer();
//       var components = [],
//         componentIds = [];

//       $log.debug('Render Starting');

//       var mainFabric = '';
//       var size = '610';
//       var pathString = '';
//       var contrastFabric = '';
//       var liningFabric = '';
//       var liningFabricId = '';
//       var liningType = '';
//       var viewOrderImage = {};
//       var placementData = config.placementJson.editPlacements;
//       var editPlacements = '';
//       if (placementData[view] !== undefined && placementData[view][category] !== undefined) {
//         editPlacements = placementData[view][category];
//       }
//       var buttonsubComponent = '';
//       var fabricList = [];
//       // config.path = config.URLpath[category];
//       var objViewOrder = config.viewOrder[category];
//       switch (category) {
//         case 'mens-suits':
//           buttonsubComponent = '/suit_body/';
//           break;
//         case 'mens-shirt':
//           buttonsubComponent = '/ms_frontbody_dummy/';
//           break;
//         case 'mens-blazer':
//           buttonsubComponent = '/suit_body/';
//           break;
//         case 'mens-chinos':
//           buttonsubComponent = '/front_loop/';
//           break;
//         case 'mens-trouser':
//           buttonsubComponent = '/belt_dummy/';
//           break;

//       }

//       dataLoaded.then(function() {
//         fabricList.push(selection.fabric); //mf
//         //cf(s)
//         if (selection.cfFabric) {
//           fabricList.push(selection.cfFabric);
//         }
//         //lf for suits
//         if (selection.productSpecificAttributes &&
//           selection.productSpecificAttributes.hasOwnProperty('body_lining')) {
//           liningFabricId = selection.productSpecificAttributes.body_lining.fabric;
//           liningType = selection.productSpecificAttributes.body_lining.type;
//           fabricList.push(liningFabricId);
//         }

//         return FabricService.getByIds(fabricList, category);
//       }).then(function(response) {
//         mainFabric = response.data.data[selection.fabric];
//         contrastFabric = response.data.data[selection.cfFabric];
//         if (liningFabric !== undefined) {
//           liningFabric = response.data.data[liningFabricId];
//         }
//         componentIds = [];
//         angular.forEach(selection.components, function(value) {
//           componentIds.push(value);
//         });
//         return ComponentService.getByIds(componentIds);
//       }).then(function(response) {
//         /*for suits lining if it's a lining view*/
//         if ((category === 'mens-suits' && view === 'lining') || (category === 'mens-blazer' && view === 'lining')) {
//           pathString = liningType + '/interlining/nonlining/fabric/' + mainFabric.fabricId + '_' + mainFabric.version + '.png';
//           var nonlining = config.renderPath(category, pathString) + size + '/' + pathString;
//           viewOrderImage[nonlining] = objViewOrder[view].nonlining;
//           if (selection.productSpecificAttributes.hasOwnProperty('body_lining')) {
//             pathString = liningType + '/interlining/lining/fabric/' + liningFabric.fabricId + '_' + liningFabric.version + '.png';
//             var lining = config.renderPath(category, pathString) + size + '/' + pathString;
//             viewOrderImage[lining] = objViewOrder[view].lining;
//           }
//         } else if (category === 'mens-jeans') {

//           var current_fabricId = selection.fabric.toUpperCase();
//           var jeanFrontVersion = selection.components.jeans_front.slice(-1);
//           var jeanBackVersion = selection.components.jeans_back.slice(-1);
//           pathString = current_fabricId + '/JF0' + jeanFrontVersion + '-JB0' + jeanBackVersion + '/' + view + '/dummy/fabric/' + current_fabricId + '-JF0' + jeanFrontVersion + '-JB0' + jeanBackVersion + '.png';
//           var fabric = config.renderPath(category, pathString) + size + '/' + pathString;
//           var cfFabric = '';
//           if (selection.cfFabric === 'PCKT000') {
//             pathString = current_fabricId + '/JF01-JB01/' + view + '/dummy/waistband/' + selection.cfFabric + 'TP00.png';
//             cfFabric = config.renderPath(category, pathString) + size + '/' + pathString;
//           } else {
//             pathString = current_fabricId + '/JF01-JB01/' + view + '/dummy/waistband/PCKT000TP00.png';
//             cfFabric = config.renderPath(category, pathString) + size + '/' + pathString;
//           }
//           viewOrderImage[cfFabric] = objViewOrder[view].contrastFabric;
//           viewOrderImage[fabric] = objViewOrder[view].fabric;

//           if (selection.button && view === 'front') {
//             pathString = current_fabricId + '/JF0' + jeanFrontVersion + '-JB0' + jeanBackVersion + '/' + view + '/dummy/button/' + selection.button + '.png';
//             var jeanButton = config.renderPath(category, pathString) + size + '/' + pathString;
//             viewOrderImage[jeanButton] = objViewOrder[view].button;
//           }
//           if (selection.productSpecificAttributes.leather_patch && view === 'back') {
//             pathString = current_fabricId + '/JF0' + jeanFrontVersion + '-JB0' + jeanBackVersion + '/' + view + '/dummy/patch/' + selection.productSpecificAttributes.leather_patch + '.png';
//             var patch = config.renderPath(category, pathString) + size + '/' + pathString;
//             viewOrderImage[patch] = objViewOrder[view].patch;
//           }

//         } else if (category === 'womens-jeans') {
//           var jeans_type = ["fabric/W", "thread/t_W", "button/"];
//           components = response.data.data;

//           angular.forEach(components, function(component) {
//             if (component.hasOwnProperty('subComponents')) {
//               var version = '';
//             }
//             angular.forEach(component.subComponents, function(value, subComponent) {
//               angular.forEach(jeans_type, function(jeans_type) {
//                 if (subComponent && ((value && value.zindex[view]) || ((objViewOrder.hasOwnProperty(view)) && (objViewOrder[view].hasOwnProperty(subComponent))))) {
//                   var subComponentImage = '';
//                   pathString = component.id + version + '/' + view + '/' + subComponent + '/' + jeans_type + selection.fabric + '.png';
//                   subComponentImage = config.renderPath(category, pathString) + size + '/' + pathString;
//                   if (jeans_type === 'button/' && selection.hasOwnProperty('button') && selection.button.value) {
//                     pathString = component.id + version + '/' + view + '/' + subComponent + '/' + jeans_type + selection.button.value + '.png';
//                     subComponentImage = config.renderPath(category, pathString) + size + '/' + pathString;
//                   }
//                   if (value.zindex) {
//                     viewOrderImage[subComponentImage] = value.zindex[view];
//                   } else {
//                     viewOrderImage[subComponentImage] = objViewOrder[view][subComponent];
//                   }
//                 }
//               });

//             });
//           });
//         } else { //front,back view
//           /*for shoes*/
//           if (category === 'mens-suits' && view === 'front') {
//             viewOrderImage['http://img12.creyate.org/suits_4/610/shoe.png'] = 4;
//           }
//           components = response.data.data;
//           /*for subcomponents*/
//           angular.forEach(components, function(component) {
//             if (component.hasOwnProperty('subComponents')) {
//               var version = '';
//               if (component.version && component.version > 0) {
//                 version = '_' + component.version;
//               } else if (category === 'mens-chinos' || category === 'mens-shirt') {
//                 version = '_0';
//               }
//               angular.forEach(component.subComponents, function(value, subComponent) {
//                 if (subComponent && ((value && value.hasOwnProperty('zindex') && value.zindex !== null && value.zindex[view]) || ((objViewOrder.hasOwnProperty(view)) && (objViewOrder[view].hasOwnProperty(subComponent))))) {
//                   var subComponentImage = '';
//                   if (selection.cfPlacements && selection.cfPlacements.indexOf(subComponent) > -1 && contrastFabric) {
//                     pathString = component.id + version + '/' + view + '/' + subComponent + '/fabric/' + selection.cfFabric + '_' + contrastFabric.version + '.png';
//                     subComponentImage = config.renderPath(category, pathString) + size + '/' + pathString;
//                   } else {
//                     pathString = component.id + version + '/' + view + '/' + subComponent + '/fabric/' + selection.fabric + '_' + mainFabric.version + '.png';
//                     subComponentImage = config.renderPath(category, pathString) + size + '/' + pathString;
//                   }
//                   if (value.zindex) {
//                     viewOrderImage[subComponentImage] = value.zindex[view];
//                   } else {
//                     viewOrderImage[subComponentImage] = objViewOrder[view][subComponent];
//                   }
//                 }
//                 var button = '';
//                 if (selection.subComponents && selection.subComponents.hasOwnProperty(subComponent) && value && value.hasOwnProperty('zindex') && value.zindex !== null && value.zindex[view]) {
//                   if (selection.hasOwnProperty('button') && selection.button.value) {
//                     pathString = component.id + version + '/' + view + buttonsubComponent + 'button/' + selection.button.value + '.png';
//                     button = config.renderPath(category, pathString) + size + '/' + pathString;
//                   } else {
//                     angular.forEach(selection.subComponents, function(value, key) {
//                       if (value.button && objViewOrder.hasOwnProperty(view)) {
//                         pathString = component.id + version + '/' + view + buttonsubComponent + 'button/' + value.button + '.png';
//                         button = config.renderPath(category, pathString) + size + '/' + pathString;
//                       }
//                     });
//                   }
//                 }
//                 if (category === 'mens-trouser') {
//                   if (selection.hasOwnProperty('button') && selection.button.value) {
//                     pathString = component.id + version + '/' + view + buttonsubComponent + 'button/' + selection.button.value + '.png';
//                     button = config.renderPath(category, pathString) + size + '/' + pathString;
//                   }
//                 }
//                 // viewOrderImage[button] = objViewOrder[view].button.order;
//               });
//             }
//           });
//           /* for chinos leatherpatch*/
//           if (selection.hasOwnProperty('productSpecificAttributes') && selection.productSpecificAttributes.leather_patch && view === 'back') {
//             var leatherPatch = 'http://img1.creyate.org/mens-chinos-1/610/LeatherPatch/' + selection.productSpecificAttributes.leather_patch.slice(6) + '.png';
//             viewOrderImage[leatherPatch] = objViewOrder[view].leatherPatch;
//           }
//         }
//         var sendData = {};
//         sendData.image = sortViewImages(viewOrderImage);
//         sendData.editPlacements = editPlacements;
//         defered.resolve(sendData);
//       });
//       return defered.promise;
//     };

//   });
