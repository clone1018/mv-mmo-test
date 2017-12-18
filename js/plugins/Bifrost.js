/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Types = {
  Messages: {
    CONNECT: 0,
    MAP_ENTER: 1,
    SPAWN: 2,
    DESPAWN: 3,
    MOVE: 4
  },

  Orientations: {
    UP: 8,
    DOWN: 2,
    LEFT: 4,
    RIGHT: 6
  }
};

exports.default = Types;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _types = __webpack_require__(0);

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(id) {
    _classCallCheck(this, Player);

    this.id = id;
    this.eventId = null;
    this.event = null;

    this.x = 0;
    this.y = 0;

    this.characterIndex = 0;
    this.characterName = null;
    this.direction = 0;
    this.moveSpeed = 0;
    this.moveFrequency = 0;
  }

  _createClass(Player, [{
    key: 'registerGameHooks',
    value: function registerGameHooks(socket) {
      this.socket = socket;

      var player = this;
      window.addEventListener('Game_Player.refresh', function (e) {
        console.info('Game_Player.refresh', e.detail);
        player.characterIndex = e.detail.characterIndex;
        player.characterName = e.detail.characterName;
      });
      window.addEventListener('Game_Player.moveByInput.beforeMove', function (e) {
        console.info('Game_Player.moveByInput.beforeMove', e.detail);
      });
      window.addEventListener('Game_Player.moveByInput.afterMove', function (e) {
        console.info('Game_Player.moveByInput.afterMove', e.detail);
        player.handleMove(e.detail);
      });
      window.addEventListener('Scene_Map.create', function (e) {
        console.info('Scene_Map.create', e.detail);
        player.handleMapChange(e.detail.map_id);
      });
      window.addEventListener('Scene_Map.stop', function (e) {
        console.info('Scene_Map.stop', e.detail);
        //player.handleMapChange(e.detail.map_id)
      });
    }
  }, {
    key: 'handleMapChange',
    value: function handleMapChange(map_id) {
      this.socket.send(JSON.stringify([_types2.default.Messages.SPAWN, map_id, this.x, this.y, this.characterIndex, this.characterName, this.direction, this.moveSpeed, this.moveFrequency]));
    }
  }, {
    key: 'handleMove',
    value: function handleMove(detail) {
      this.x = detail.x;
      this.y = detail.y;
      this.characterIndex = detail.characterIndex;
      this.characterName = detail.characterName;
      this.direction = detail.direction;
      this.moveSpeed = detail.moveSpeed;
      this.moveFrequency = detail.moveFrequency;

      this.socket.send(JSON.stringify([_types2.default.Messages.MOVE, this.x, this.y, this.characterIndex, this.characterName, this.direction, this.moveSpeed, this.moveFrequency]));
    }
  }, {
    key: 'data',
    value: function data() {
      return {
        id: this.id,
        x: this.x,
        y: this.y,
        direction: this.direction,
        moveSpeed: this.moveSpeed,
        moveFrequency: this.moveFrequency,
        characterName: this.characterName,
        characterIndex: this.characterIndex
      };
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _Player = __webpack_require__(1);

var _Player2 = _interopRequireDefault(_Player);

var _PlayerManager = __webpack_require__(4);

var _PlayerManager2 = _interopRequireDefault(_PlayerManager);

var _types = __webpack_require__(0);

var _types2 = _interopRequireDefault(_types);

__webpack_require__(6);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:
 * @plugindesc Bifrost - Connects with Heimdall to provide MMO features to MV games
 * @author clone1018       
 */
var GAME_ID = Math.floor(Math.random() * 1000000000);
window.GAME_ID = GAME_ID;

(function () {
  var parameters = PluginManager.parameters('Bifrost');

  var socket = new WebSocket("ws://127.0.0.1:8101");
  socket.onopen = function (event) {
    socket.send(JSON.stringify([_types2.default.Messages.CONNECT, GAME_ID]));
  };

  var playerManager = new _PlayerManager2.default(socket);
  playerManager.registerServerHooks();

  var player = new _Player2.default(GAME_ID);
  player.registerGameHooks(socket);
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Imported = Imported || {};

if (Imported.MVCommons === undefined) {
  var MVCommons = {};

  (function ($) {
    $.ajaxLoadFileAsync = function (filePath, mimeType, onLoad, onError) {
      mimeType = mimeType || "application/json";var xhr = new XMLHttpRequest();var name = '$' + filePath.replace(/^.*(\\|\/|\:)/, '').replace(/\..*/, '');xhr.open('GET', filePath);if (mimeType && xhr.overrideMimeType) {
        xhr.overrideMimeType(mimeType);
      }if (onLoad === undefined) {
        onLoad = function onLoad(xhr, filePath, name) {
          if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);DataManager.onLoad(window[name]);
          }
        };
      }if (onError === undefined) {
        onError = function onError() {
          DataManager._errorUrl = DataManager._errorUrl || filePath;
        };
      }xhr.onload = function () {
        onLoad.call(this, xhr, filePath, name);
      };xhr.onerror = onError;window[name] = null;xhr.send();
    };
  })(MVCommons);
}

var OrangeCustomEvents = OrangeCustomEvents || {};

function Game_Custom_Event() {
  this.initialize.apply(this, arguments);
}
Game_Custom_Event.prototype = Object.create(Game_Event.prototype);
Game_Custom_Event.prototype.constructor = Game_Custom_Event;

(function ($) {
  "use strict";

  //----------------------------------------------.
  //----------------------------------------------|
  // PROTECTED METHODS                            |
  //----------------------------------------------|
  //----------------------------------------------|

  $.getAnotherMapData = function (mapId, callback) {
    var variableName = '$Map%1'.format(mapId.padZero(3));
    var filename = 'data/Map%1.json'.format(mapId.padZero(3));

    var onLoad = function onLoad(xhr, filePath, name) {
      if (xhr.status < 400) {
        window[name] = JSON.parse(xhr.responseText);
        DataManager.onLoad(window[name]);

        callback();
      }
    };

    if (window[variableName] === undefined || window[variableName] === null) {
      MVCommons.ajaxLoadFileAsync(filename, undefined, onLoad);
    } else {
      callback();
    }
  };

  //----------------------------------------------.
  //----------------------------------------------|
  // PUBLIC METHODS                               |
  //----------------------------------------------|
  //----------------------------------------------|

  //----------------------------------------------
  // Game_Custom_Event
  //----------------------------------------------
  Game_Custom_Event.prototype.initialize = function (mapId, eventId, eventData) {
    this._eventData = eventData;
    Game_Event.prototype.initialize.call(this, mapId, eventId);
  };

  Game_Custom_Event.prototype.event = function () {
    return this._eventData;
  };

  Game_Custom_Event.prototype.revive = function (data) {
    return new Game_Custom_Event(data.mapId, data.id, data.eventData);
  };

  //----------------------------------------------
  // Game_System
  //----------------------------------------------
  Game_System.prototype.clearSelfSwitches = function (mapId, eventId) {
    var switches = ["A", "B", "C", "D"];

    switches.forEach(function (switchId) {
      var key = [mapId, eventId, switchId];
      $gameSelfSwitches.setValue(key, false);
    });
  };

  Game_System.prototype.initCustomEvents = function (mapId) {
    if (this._customEvents === undefined) {
      this._customEvents = {};
    }

    if (this._customEvents[mapId] === undefined) {
      this._customEvents[mapId] = {};
    }
  };

  Game_System.prototype.addCustomEvent = function (mapId, event) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, event.id);
    this._customEvents[mapId][event.id] = event;

    return event;
  };

  Game_System.prototype.removeCustomEvent = function (mapId, eventId) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, eventId);
    delete this._customEvents[mapId][eventId];
  };

  Game_System.prototype.clearCustomEvents = function (mapId) {
    this.initCustomEvents();
    this._customEvents[mapId] = {};
  };

  Game_System.prototype.getCustomEvents = function (mapId) {
    this.initCustomEvents();
    return this._customEvents[mapId];
  };

  //----------------------------------------------
  // Game_Map
  //----------------------------------------------
  Game_Map.prototype.getIndexForNewEvent = function () {
    var index = 1;
    while (index < this._events.length && !!this._events[index]) {
      index++;
    }

    return index;
  };

  Game_Map.prototype.addEvent = function (eventData, temporary, index) {
    if (temporary === undefined) {
      temporary = false;
    }

    if (index === undefined) {
      index = this.getIndexForNewEvent();
    }

    eventData.id = index;
    var gameEvent = new Game_Custom_Event(this._mapId, index, eventData);
    $gameSystem.clearSelfSwitches(this._mapId, index);

    this._events[index] = gameEvent;

    if (SceneManager._scene instanceof Scene_Map) {
      var sprite = new Sprite_Character(gameEvent);
      SceneManager._scene._spriteset._characterSprites.push(sprite);
      SceneManager._scene._spriteset._tilemap.addChild(sprite);
    }

    if (temporary === false) {
      $gameSystem.addCustomEvent(this._mapId, eventData);
    }

    return gameEvent;
  };

  var oldGameMap_setupEvents = Game_Map.prototype.setupEvents;
  Game_Map.prototype.setupEvents = function () {
    oldGameMap_setupEvents.call(this);

    var customEvents = $gameSystem.getCustomEvents(this._mapId);
    for (var eventId in customEvents) {
      if (customEvents[eventId] === undefined) continue;
      var newEventId = this.getIndexForNewEvent();

      customEvents[eventId].eventId = newEventId;
      this._events[newEventId] = new Game_Custom_Event(this._mapId, newEventId, customEvents[eventId]);
    }
  };

  Game_Map.prototype.addEventAt = function (eventData, x, y, temporary, index) {
    eventData.x = x;
    eventData.y = y;
    return this.addEvent(eventData, temporary, index);
  };

  Game_Map.prototype.spawnEvent = function (eventData, tileList, temporary) {
    for (var i = 0; i < tileList.length; i++) {
      var newEventData = JsonEx.makeDeepCopy(eventData);
      newEventData.x = tileList[i].x;
      newEventData.y = tileList[i].y;
      this.addEvent(newEventData, temporary);
    }
  };

  Game_Map.prototype.getEventData = function (eventIdOrigin) {
    var event = $dataMap.events[eventIdOrigin];
    if (event === undefined) return undefined;

    return JsonEx.makeDeepCopy(event);
  };

  Game_Map.prototype.getEventDataFrom = function (mapIdOrigin, eventIdOrigin, callback) {
    $.getAnotherMapData(mapIdOrigin, function () {
      var variableName = '$Map%1'.format(mapIdOrigin.padZero(3));

      if (window[variableName] === undefined || window[variableName] === null) return;

      var event = window[variableName].events[eventIdOrigin];
      if (event === undefined) return;

      var eventData = JsonEx.makeDeepCopy(event);
      if (eventData.note) {
        DataManager.extractMetadata(eventData);
      }
      callback.call(this, eventData);
    });
  };

  Game_Map.prototype.copyEvent = function (eventIdOrigin, x, y, temporary, newIndex) {
    var eventData = this.getEventData(eventIdOrigin);
    if (eventData) {
      $gameMap.addEventAt(eventData, x, y, temporary, newIndex);
    }
  };

  Game_Map.prototype.getRegionTileList = function (regionId) {
    var tileList = [];

    for (var x = 0; x < $gameMap.width(); x++) {
      for (var y = 0; y < $gameMap.height(); y++) {
        if ($gameMap.eventsXy(x, y).length === 0) {
          if ($gameMap.regionId(x, y) == regionId) {
            tileList.push({ x: x, y: y });
          }
        }
      }
    }

    return tileList;
  };

  Game_Map.prototype.getRandomRegionTile = function (regionId) {
    var tileList = this.getRegionTileList(regionId);

    if (tileList.length > 0) {
      var index = Math.randomInt(tileList.length);
      return tileList[index];
    }

    return undefined;
  };

  Game_Map.prototype.copyEventToRegion = function (eventIdOrigin, regionId, temporary, newIndex) {
    var tile = this.getRandomRegionTile(regionId);
    if (tile !== undefined) {
      this.copyEvent(eventIdOrigin, tile.x, tile.y, temporary, newIndex);
    }
  };

  Game_Map.prototype.copyEventFrom = function (mapIdOrigin, eventIdOrigin, x, y, temporary, newIndex, callback) {
    this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function (eventData) {
      var event = $gameMap.addEventAt(eventData, x, y, temporary, newIndex);

      if (!!callback) {
        callback.call(this, event);
      }
    });
  };

  Game_Map.prototype.copyEventFromMapToRegion = function (mapIdOrigin, eventIdOrigin, regionId, temporary, newIndex, callback) {
    var tile = this.getRandomRegionTile(regionId);
    if (tile !== undefined) {
      this.copyEventFrom(mapIdOrigin, eventIdOrigin, tile.x, tile.y, temporary, newIndex, callback);
    }
  };

  Game_Map.prototype.spawnMapEvent = function (eventIdOrigin, regionId, temporary) {
    var eventData = this.getEventData(eventIdOrigin);
    var tileList = this.getRegionTileList(regionId);

    if (eventData && tileList) {
      this.spawnEvent(eventData, tileList, temporary);
    }
  };

  Game_Map.prototype.spawnMapEventFrom = function (mapIdOrigin, eventIdOrigin, regionId, temporary) {
    var tileList = this.getRegionTileList(regionId);

    if (tileList.length > 0) {
      this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function (eventData) {
        $gameMap.spawnEvent(eventData, tileList, temporary);
      });
    }
  };

  Game_Interpreter.prototype.getNumericValue = function (stringValue) {
    if (stringValue.substr(0, 1) == '[' && stringValue.substr(-1) == ']') {
      var variableId = parseInt(stringValue.substr(1, stringValue.length - 2), 10);

      if (variableId > 0) {
        return $gameVariables.value(variableId);
      }

      return 0;
    } else {
      return parseInt(stringValue, 10);
    }
  };

  Game_Interpreter.prototype.checkCopyCommands = function (command, args) {
    if (args.length < 2) return;

    if (command.toUpperCase() !== 'COPY' && command.toUpperCase() !== 'SPAWN') return;
    if (args[0].toUpperCase() !== "EVENT") return;

    var eventIdOrigin = this.getNumericValue(args[1]);
    var mapIdOrigin = $gameMap.mapId();
    var isPosition = true;
    var x = 0;
    var y = 0;
    var regionId = 0;
    var temporary = true;
    var hasPosition = false;
    var userIndex;

    if (eventIdOrigin <= 0) return;

    var nextIndex = 2;

    if (args.length >= nextIndex + 3) {
      if (args[nextIndex].toUpperCase() == 'FROM' && args[nextIndex + 1].toUpperCase() == 'MAP') {
        mapIdOrigin = this.getNumericValue(args[nextIndex + 2]);
        nextIndex += 3;
      }
    }

    if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'HERE') {
      isPosition = true;
      hasPosition = true;
      x = this.character(0).x;
      y = this.character(0).y;
      nextIndex++;
    } else if (args.length > nextIndex) {
      if (args[nextIndex].toUpperCase() !== 'TO' && args[nextIndex].toUpperCase() !== 'ON') {
        console.error('OrangeCustomEvents', 'Invalid destination', command, args);
        return;
      }

      nextIndex++;

      if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'REGION') {
        isPosition = false;
        nextIndex++;
      } else if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'POSITION') {
        isPosition = true;
        nextIndex++;
      }
    } else {
      console.error('OrangeCustomEvents', 'Incomplete command', command, args);
      return;
    }

    if (isPosition) {
      if (!hasPosition) {
        if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'PLAYER') {
          x = $gamePlayer.x;
          y = $gamePlayer.y;
          nextIndex++;
        } else if (args.length >= nextIndex + 2) {
          x = this.getNumericValue(args[nextIndex]);
          y = this.getNumericValue(args[nextIndex + 1]);

          nextIndex += 2;
        } else {
          console.error('OrangeCustomEvents', 'What position?', command, args);
        }
      }
    } else {
      if (args.length > nextIndex) {
        regionId = this.getNumericValue(args[nextIndex]);
        nextIndex++;
      } else {
        console.error('OrangeCustomEvents', 'What region?', command, args);
      }
    }

    if (args.length > nextIndex + 2) {
      if (args[nextIndex].toUpperCase().startsWith('WITH') && args[nextIndex + 1].toUpperCase().startsWith('ID')) {
        userIndex = this.getNumericValue(args[nextIndex + 2]);
        nextIndex += 3;
      }
    }

    if (args.length > nextIndex) {
      if (args[nextIndex].toUpperCase().startsWith('TEMP')) {
        temporary = true;
        nextIndex++;
      } else if (args[nextIndex].toUpperCase() == 'SAVE') {
        temporary = false;
        nextIndex++;
      }
    }

    if (isPosition) {
      if (mapIdOrigin == $gameMap.mapId()) {
        $gameMap.copyEvent(eventIdOrigin, x, y, temporary, userIndex);
      } else {
        $gameMap.copyEventFrom(mapIdOrigin, eventIdOrigin, x, y, temporary, userIndex);
      }
    } else {
      if (command.toUpperCase() === 'COPY') {
        if (mapIdOrigin == $gameMap.mapId()) {
          $gameMap.copyEventToRegion(eventIdOrigin, regionId, temporary, userIndex);
        } else {
          $gameMap.copyEventFromMapToRegion(mapIdOrigin, eventIdOrigin, regionId, temporary, userIndex);
        }
      } else if (command.toUpperCase() === 'SPAWN') {
        if (mapIdOrigin == $gameMap.mapId()) {
          $gameMap.spawnMapEvent(eventIdOrigin, regionId, temporary);
        } else {
          $gameMap.spawnMapEventFrom(mapIdOrigin, eventIdOrigin, regionId, temporary);
        }
      }
    }
  };

  Game_Interpreter.prototype.checkDeleteCommand = function (command, args) {
    if (args.length != 2) return;

    if (command.toUpperCase() !== 'DELETE') return;
    if (args[0].toUpperCase() !== "THIS") return;
    if (args[1].toUpperCase() !== "EVENT") return;

    $gameSystem.removeCustomEvent(this._mapId, this._eventId);
    this.command214();
  };

  var oldGameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    oldGameInterpreter_pluginCommand.call(this, command, args);

    this.checkCopyCommands(command, args);
    this.checkDeleteCommand(command, args);
  };
})(OrangeCustomEvents);

Imported.OrangeCustomEvents = 1.9;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NetworkPlayer = __webpack_require__(5);

var _NetworkPlayer2 = _interopRequireDefault(_NetworkPlayer);

var _types = __webpack_require__(0);

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerManager = function () {
  function PlayerManager(socket) {
    _classCallCheck(this, PlayerManager);

    this.socket = socket;
    this.players = {};
  }

  _createClass(PlayerManager, [{
    key: "registerServerHooks",
    value: function registerServerHooks() {
      var manager = this;

      this.socket.onmessage = function (incoming) {
        if (!SceneManager._sceneStarted || !SceneManager._scene._spriteset) return;

        var json = incoming.data;
        var message = JSON.parse(json);
        console.log('received: %s', json);

        var action = parseInt(message[0]);
        var playerId = parseInt(message[1]);

        if (playerId === window.GAME_ID) {
          return;
        }

        if (!(playerId in manager.players)) {
          manager.players[playerId] = new _NetworkPlayer2.default(playerId);
        }
        var player = manager.players[playerId];

        if (action === _types2.default.Messages.SPAWN) {} else if (action === _types2.default.Messages.DESPAWN) {
          console.log("Removing player from map");
          player.deleteEvent();
        } else if (action === _types2.default.Messages.MOVE) {
          // Needs to be moved to spawn after I figure that out...
          if (player.eventId === null || player.event !== $gameMap._events[player.eventId]) {
            console.log("Creating player on map");
            player.createEvent({
              x: message[2],
              y: message[3],
              characterIndex: message[4],
              characterName: message[5],
              direction: message[6],
              moveSpeed: message[7],
              moveFrequency: message[8]
            });
          }

          player.handleMove({
            x: message[2],
            y: message[3],
            characterIndex: message[4],
            characterName: message[5],
            direction: message[6],
            moveSpeed: message[7],
            moveFrequency: message[8]
          });
        }
      };

      /*
      this.socket.onmessage = function (incoming) {
        console.log('received: %s', incoming.data);
        let msg = JSON.parse(incoming.data);
        let event = msg.event;
        let data = msg.data;
          if (!(data.id in manager.players)) {
          manager.players[data.id] = new NetworkPlayer(data.id);
        }
        let player = manager.players[data.id];
          if (player.eventId === null) {
          player.createEvent(data);
        }
          if (event == "PLAYER_MOVE") {
          if (window.GAME_ID !== player.id) {
            if (!SceneManager._sceneStarted || !SceneManager._scene._spriteset) return;
              player.handleMove(data);
          }
        }
      }
      */
    }
  }]);

  return PlayerManager;
}();

exports.default = PlayerManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player2 = __webpack_require__(1);

var _Player3 = _interopRequireDefault(_Player2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NetworkPlayer = function (_Player) {
  _inherits(NetworkPlayer, _Player);

  function NetworkPlayer(id) {
    _classCallCheck(this, NetworkPlayer);

    return _possibleConstructorReturn(this, (NetworkPlayer.__proto__ || Object.getPrototypeOf(NetworkPlayer)).call(this, id));
  }

  _createClass(NetworkPlayer, [{
    key: "createEvent",
    value: function createEvent(detail) {
      this.x = detail.x;
      this.y = detail.y;
      this.characterIndex = detail.characterIndex;
      this.characterName = detail.characterName;
      this.direction = detail.direction;
      this.moveSpeed = detail.moveSpeed;
      this.moveFrequency = detail.moveFrequency;

      var index = $gameMap._events.length;

      var eventObject = {
        "id": this.id,
        "name": "NetworkPlayer1",
        "note": "",
        "pages": [{
          "conditions": {
            "actorId": 1,
            "actorValid": false,
            "itemId": 1,
            "itemValid": false,
            "selfSwitchCh": "A",
            "selfSwitchValid": false,
            "switch1Id": 1,
            "switch1Valid": false,
            "switch2Id": 1,
            "switch2Valid": false,
            "variableId": 1,
            "variableValid": false,
            "variableValue": 0
          },
          "directionFix": false,
          "image": {
            "tileId": 0,
            "characterName": this.characterName,
            "direction": this.direction,
            "pattern": 0,
            "characterIndex": this.characterIndex
          },
          "list": [{
            "code": 0,
            "indent": 0,
            "parameters": []
          }],
          "moveFrequency": this.moveFrequency,
          "moveRoute": {
            "list": [{
              "code": 0,
              "parameters": []
            }],
            "repeat": true,
            "skippable": false,
            "wait": false
          },
          "moveSpeed": this.moveSpeed,
          "moveType": 0,
          "priorityType": 1,
          "stepAnime": false,
          "through": true,
          "trigger": 0,
          "walkAnime": true
        }],
        "x": this.x,
        "y": this.y
      };

      var created = $gameMap.addEvent(eventObject, true, index);

      this.eventId = index;
      this.event = created;
    }
  }, {
    key: "deleteEvent",
    value: function deleteEvent() {
      $gameSystem.removeCustomEvent($gameMap._mapId, this.eventId);

      if (this.eventId in $gameMap._events) {
        $gameMap.eraseEvent(this.eventId);
      }

      this.eventId = null;
      this.event = null;
    }
  }, {
    key: "handleMove",
    value: function handleMove(detail) {
      this.x = detail.x;
      this.y = detail.y;
      this.characterIndex = detail.characterIndex;
      this.characterName = detail.characterName;
      this.direction = detail.direction;
      this.moveSpeed = detail.moveSpeed;
      this.moveFrequency = detail.moveFrequency;

      this.event.setMoveFrequency(this.moveFrequency);
      this.event.setMoveSpeed(this.moveSpeed);
      this.event.moveStraight(this.direction);
      this.event.setPosition(this.x, this.y);
      this.event.setImage(this.characterName, this.characterIndex);
    }
  }]);

  return NetworkPlayer;
}(_Player3.default);

exports.default = NetworkPlayer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Available Events:
 * Game_Player.moveByInput.beforeMove
 * Game_Player.moveByInput.afterMove
 */

Game_Player.prototype.moveByInput = function () {
  if (!this.isMoving() && this.canMove()) {
    var direction = this.getInputDirection();
    if (direction > 0) {
      $gameTemp.clearDestination();
    } else if ($gameTemp.isDestinationValid()) {
      var x = $gameTemp.destinationX();
      var y = $gameTemp.destinationY();
      direction = this.findDirectionTo(x, y);
    }
    if (direction > 0) {
      window.dispatchEvent(new CustomEvent('Game_Player.moveByInput.beforeMove', {
        detail: {
          x: this.x,
          y: this.y,
          direction: direction,
          moveSpeed: this.realMoveSpeed(),
          moveFrequency: this.moveFrequency(),
          characterName: this._characterName,
          characterIndex: this._characterIndex
        }
      }));

      this.executeMove(direction);

      window.dispatchEvent(new CustomEvent('Game_Player.moveByInput.afterMove', {
        detail: {
          x: this.x,
          y: this.y,
          direction: direction,
          moveSpeed: this.realMoveSpeed(),
          moveFrequency: this.moveFrequency(),
          characterName: this._characterName,
          characterIndex: this._characterIndex
        }
      }));
    }
  }
};

Game_Player.prototype.refresh = function () {
  var actor = $gameParty.leader();
  var characterName = actor ? actor.characterName() : '';
  var characterIndex = actor ? actor.characterIndex() : 0;
  this.setImage(characterName, characterIndex);
  this._followers.refresh();

  window.dispatchEvent(new CustomEvent('Game_Player.refresh', {
    detail: {
      characterName: characterName,
      characterIndex: characterIndex
    }
  }));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Scene_Map.prototype.updateTransferPlayer = function () {
  if ($gamePlayer.isTransferring()) {
    SceneManager.goto(Scene_Map);
  }
};

Scene_Map.prototype.create = function () {
  Scene_Base.prototype.create.call(this);
  this._transfer = $gamePlayer.isTransferring();
  var mapId = this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId();
  DataManager.loadMapData(mapId);

  window.dispatchEvent(new CustomEvent('Scene_Map.create', {
    detail: {
      map_id: mapId
    }
  }));
};

Scene_Map.prototype.stop = function () {
  window.dispatchEvent(new CustomEvent('Scene_Map.stop', {
    detail: {
      map_id: $gameMap.mapId()
    }
  }));

  Scene_Base.prototype.stop.call(this);
  $gamePlayer.straighten();
  this._mapNameWindow.close();
  if (this.needsSlowFadeOut()) {
    this.startFadeOut(this.slowFadeSpeed(), false);
  } else if (SceneManager.isNextScene(Scene_Map)) {
    this.fadeOutForTransfer();
  } else if (SceneManager.isNextScene(Scene_Battle)) {
    this.launchBattle();
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2RkYzA0NmEzYmQyZDY4N2NhMDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R5cGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9HYW1lL1BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTGliL09yYW5nZUN1c3RvbUV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS9QbGF5ZXJNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9HYW1lL05ldHdvcmtQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0V2ZW50cy9HYW1lX1BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXZlbnRzL1NjZW5lX01hcC5qcyJdLCJuYW1lcyI6WyJUeXBlcyIsIk1lc3NhZ2VzIiwiQ09OTkVDVCIsIk1BUF9FTlRFUiIsIlNQQVdOIiwiREVTUEFXTiIsIk1PVkUiLCJPcmllbnRhdGlvbnMiLCJVUCIsIkRPV04iLCJMRUZUIiwiUklHSFQiLCJQbGF5ZXIiLCJpZCIsImV2ZW50SWQiLCJldmVudCIsIngiLCJ5IiwiY2hhcmFjdGVySW5kZXgiLCJjaGFyYWN0ZXJOYW1lIiwiZGlyZWN0aW9uIiwibW92ZVNwZWVkIiwibW92ZUZyZXF1ZW5jeSIsInNvY2tldCIsInBsYXllciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY29uc29sZSIsImluZm8iLCJkZXRhaWwiLCJoYW5kbGVNb3ZlIiwiaGFuZGxlTWFwQ2hhbmdlIiwibWFwX2lkIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJHQU1FX0lEIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicGFyYW1ldGVycyIsIlBsdWdpbk1hbmFnZXIiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJwbGF5ZXJNYW5hZ2VyIiwicmVnaXN0ZXJTZXJ2ZXJIb29rcyIsInJlZ2lzdGVyR2FtZUhvb2tzIiwiSW1wb3J0ZWQiLCJNVkNvbW1vbnMiLCJ1bmRlZmluZWQiLCIkIiwiYWpheExvYWRGaWxlQXN5bmMiLCJmaWxlUGF0aCIsIm1pbWVUeXBlIiwib25Mb2FkIiwib25FcnJvciIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwibmFtZSIsInJlcGxhY2UiLCJvcGVuIiwib3ZlcnJpZGVNaW1lVHlwZSIsInN0YXR1cyIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiRGF0YU1hbmFnZXIiLCJfZXJyb3JVcmwiLCJvbmxvYWQiLCJjYWxsIiwib25lcnJvciIsIk9yYW5nZUN1c3RvbUV2ZW50cyIsIkdhbWVfQ3VzdG9tX0V2ZW50IiwiaW5pdGlhbGl6ZSIsImFwcGx5IiwiYXJndW1lbnRzIiwicHJvdG90eXBlIiwiT2JqZWN0IiwiY3JlYXRlIiwiR2FtZV9FdmVudCIsImNvbnN0cnVjdG9yIiwiZ2V0QW5vdGhlck1hcERhdGEiLCJtYXBJZCIsImNhbGxiYWNrIiwidmFyaWFibGVOYW1lIiwiZm9ybWF0IiwicGFkWmVybyIsImZpbGVuYW1lIiwiZXZlbnREYXRhIiwiX2V2ZW50RGF0YSIsInJldml2ZSIsImRhdGEiLCJHYW1lX1N5c3RlbSIsImNsZWFyU2VsZlN3aXRjaGVzIiwic3dpdGNoZXMiLCJmb3JFYWNoIiwic3dpdGNoSWQiLCJrZXkiLCIkZ2FtZVNlbGZTd2l0Y2hlcyIsInNldFZhbHVlIiwiaW5pdEN1c3RvbUV2ZW50cyIsIl9jdXN0b21FdmVudHMiLCJhZGRDdXN0b21FdmVudCIsInJlbW92ZUN1c3RvbUV2ZW50IiwiY2xlYXJDdXN0b21FdmVudHMiLCJnZXRDdXN0b21FdmVudHMiLCJHYW1lX01hcCIsImdldEluZGV4Rm9yTmV3RXZlbnQiLCJpbmRleCIsIl9ldmVudHMiLCJsZW5ndGgiLCJhZGRFdmVudCIsInRlbXBvcmFyeSIsImdhbWVFdmVudCIsIl9tYXBJZCIsIiRnYW1lU3lzdGVtIiwiU2NlbmVNYW5hZ2VyIiwiX3NjZW5lIiwiU2NlbmVfTWFwIiwic3ByaXRlIiwiU3ByaXRlX0NoYXJhY3RlciIsIl9zcHJpdGVzZXQiLCJfY2hhcmFjdGVyU3ByaXRlcyIsInB1c2giLCJfdGlsZW1hcCIsImFkZENoaWxkIiwib2xkR2FtZU1hcF9zZXR1cEV2ZW50cyIsInNldHVwRXZlbnRzIiwiY3VzdG9tRXZlbnRzIiwibmV3RXZlbnRJZCIsImFkZEV2ZW50QXQiLCJzcGF3bkV2ZW50IiwidGlsZUxpc3QiLCJpIiwibmV3RXZlbnREYXRhIiwiSnNvbkV4IiwibWFrZURlZXBDb3B5IiwiZ2V0RXZlbnREYXRhIiwiZXZlbnRJZE9yaWdpbiIsIiRkYXRhTWFwIiwiZXZlbnRzIiwiZ2V0RXZlbnREYXRhRnJvbSIsIm1hcElkT3JpZ2luIiwibm90ZSIsImV4dHJhY3RNZXRhZGF0YSIsImNvcHlFdmVudCIsIm5ld0luZGV4IiwiJGdhbWVNYXAiLCJnZXRSZWdpb25UaWxlTGlzdCIsInJlZ2lvbklkIiwid2lkdGgiLCJoZWlnaHQiLCJldmVudHNYeSIsImdldFJhbmRvbVJlZ2lvblRpbGUiLCJyYW5kb21JbnQiLCJjb3B5RXZlbnRUb1JlZ2lvbiIsInRpbGUiLCJjb3B5RXZlbnRGcm9tIiwiY29weUV2ZW50RnJvbU1hcFRvUmVnaW9uIiwic3Bhd25NYXBFdmVudCIsInNwYXduTWFwRXZlbnRGcm9tIiwiR2FtZV9JbnRlcnByZXRlciIsImdldE51bWVyaWNWYWx1ZSIsInN0cmluZ1ZhbHVlIiwic3Vic3RyIiwidmFyaWFibGVJZCIsInBhcnNlSW50IiwiJGdhbWVWYXJpYWJsZXMiLCJ2YWx1ZSIsImNoZWNrQ29weUNvbW1hbmRzIiwiY29tbWFuZCIsImFyZ3MiLCJ0b1VwcGVyQ2FzZSIsImlzUG9zaXRpb24iLCJoYXNQb3NpdGlvbiIsInVzZXJJbmRleCIsIm5leHRJbmRleCIsImNoYXJhY3RlciIsImVycm9yIiwiJGdhbWVQbGF5ZXIiLCJzdGFydHNXaXRoIiwiY2hlY2tEZWxldGVDb21tYW5kIiwiX2V2ZW50SWQiLCJjb21tYW5kMjE0Iiwib2xkR2FtZUludGVycHJldGVyX3BsdWdpbkNvbW1hbmQiLCJwbHVnaW5Db21tYW5kIiwiUGxheWVyTWFuYWdlciIsInBsYXllcnMiLCJtYW5hZ2VyIiwib25tZXNzYWdlIiwiaW5jb21pbmciLCJfc2NlbmVTdGFydGVkIiwianNvbiIsIm1lc3NhZ2UiLCJsb2ciLCJhY3Rpb24iLCJwbGF5ZXJJZCIsImRlbGV0ZUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJOZXR3b3JrUGxheWVyIiwiZXZlbnRPYmplY3QiLCJjcmVhdGVkIiwiZXJhc2VFdmVudCIsInNldE1vdmVGcmVxdWVuY3kiLCJzZXRNb3ZlU3BlZWQiLCJtb3ZlU3RyYWlnaHQiLCJzZXRQb3NpdGlvbiIsInNldEltYWdlIiwiR2FtZV9QbGF5ZXIiLCJtb3ZlQnlJbnB1dCIsImlzTW92aW5nIiwiY2FuTW92ZSIsImdldElucHV0RGlyZWN0aW9uIiwiJGdhbWVUZW1wIiwiY2xlYXJEZXN0aW5hdGlvbiIsImlzRGVzdGluYXRpb25WYWxpZCIsImRlc3RpbmF0aW9uWCIsImRlc3RpbmF0aW9uWSIsImZpbmREaXJlY3Rpb25UbyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsInJlYWxNb3ZlU3BlZWQiLCJfY2hhcmFjdGVyTmFtZSIsIl9jaGFyYWN0ZXJJbmRleCIsImV4ZWN1dGVNb3ZlIiwicmVmcmVzaCIsImFjdG9yIiwiJGdhbWVQYXJ0eSIsImxlYWRlciIsIl9mb2xsb3dlcnMiLCJ1cGRhdGVUcmFuc2ZlclBsYXllciIsImlzVHJhbnNmZXJyaW5nIiwiZ290byIsIlNjZW5lX0Jhc2UiLCJfdHJhbnNmZXIiLCJuZXdNYXBJZCIsImxvYWRNYXBEYXRhIiwic3RvcCIsInN0cmFpZ2h0ZW4iLCJfbWFwTmFtZVdpbmRvdyIsImNsb3NlIiwibmVlZHNTbG93RmFkZU91dCIsInN0YXJ0RmFkZU91dCIsInNsb3dGYWRlU3BlZWQiLCJpc05leHRTY2VuZSIsImZhZGVPdXRGb3JUcmFuc2ZlciIsIlNjZW5lX0JhdHRsZSIsImxhdW5jaEJhdHRsZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLFFBQVE7QUFDVkMsWUFBVTtBQUNSQyxhQUFTLENBREQ7QUFFUkMsZUFBVyxDQUZIO0FBR1JDLFdBQU8sQ0FIQztBQUlSQyxhQUFTLENBSkQ7QUFLUkMsVUFBTTtBQUxFLEdBREE7O0FBU1ZDLGdCQUFjO0FBQ1pDLFFBQUksQ0FEUTtBQUVaQyxVQUFNLENBRk07QUFHWkMsVUFBTSxDQUhNO0FBSVpDLFdBQU87QUFKSztBQVRKLENBQVo7O2tCQWlCZVgsSzs7Ozs7Ozs7Ozs7Ozs7O0FDakJmOzs7Ozs7OztJQUVxQlksTTtBQUVuQixrQkFBWUMsRUFBWixFQUFnQjtBQUFBOztBQUNkLFNBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQWI7O0FBRUEsU0FBS0MsQ0FBTCxHQUFTLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVMsQ0FBVDs7QUFFQSxTQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNEOzs7O3NDQUVpQkMsTSxFQUFRO0FBQ3hCLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxVQUFJQyxTQUFTLElBQWI7QUFDQUMsYUFBT0MsZ0JBQVAsQ0FBd0IscUJBQXhCLEVBQStDLFVBQVVDLENBQVYsRUFBYTtBQUMxREMsZ0JBQVFDLElBQVIsQ0FBYSxxQkFBYixFQUFvQ0YsRUFBRUcsTUFBdEM7QUFDQU4sZUFBT04sY0FBUCxHQUF3QlMsRUFBRUcsTUFBRixDQUFTWixjQUFqQztBQUNBTSxlQUFPTCxhQUFQLEdBQXVCUSxFQUFFRyxNQUFGLENBQVNYLGFBQWhDO0FBQ0QsT0FKRDtBQUtBTSxhQUFPQyxnQkFBUCxDQUF3QixvQ0FBeEIsRUFBOEQsVUFBVUMsQ0FBVixFQUFhO0FBQ3pFQyxnQkFBUUMsSUFBUixDQUFhLG9DQUFiLEVBQW1ERixFQUFFRyxNQUFyRDtBQUNELE9BRkQ7QUFHQUwsYUFBT0MsZ0JBQVAsQ0FBd0IsbUNBQXhCLEVBQTZELFVBQVVDLENBQVYsRUFBYTtBQUN4RUMsZ0JBQVFDLElBQVIsQ0FBYSxtQ0FBYixFQUFrREYsRUFBRUcsTUFBcEQ7QUFDQU4sZUFBT08sVUFBUCxDQUFrQkosRUFBRUcsTUFBcEI7QUFDRCxPQUhEO0FBSUFMLGFBQU9DLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxVQUFVQyxDQUFWLEVBQWE7QUFDdkRDLGdCQUFRQyxJQUFSLENBQWEsa0JBQWIsRUFBaUNGLEVBQUVHLE1BQW5DO0FBQ0FOLGVBQU9RLGVBQVAsQ0FBdUJMLEVBQUVHLE1BQUYsQ0FBU0csTUFBaEM7QUFDRCxPQUhEO0FBSUFSLGFBQU9DLGdCQUFQLENBQXdCLGdCQUF4QixFQUEwQyxVQUFVQyxDQUFWLEVBQWE7QUFDckRDLGdCQUFRQyxJQUFSLENBQWEsZ0JBQWIsRUFBK0JGLEVBQUVHLE1BQWpDO0FBQ0E7QUFDRCxPQUhEO0FBSUQ7OztvQ0FFZUcsTSxFQUFRO0FBQ3RCLFdBQUtWLE1BQUwsQ0FBWVcsSUFBWixDQUFpQkMsS0FBS0MsU0FBTCxDQUFlLENBQzlCLGdCQUFNbkMsUUFBTixDQUFlRyxLQURlLEVBRTlCNkIsTUFGOEIsRUFHOUIsS0FBS2pCLENBSHlCLEVBSTlCLEtBQUtDLENBSnlCLEVBSzlCLEtBQUtDLGNBTHlCLEVBTTlCLEtBQUtDLGFBTnlCLEVBTzlCLEtBQUtDLFNBUHlCLEVBUTlCLEtBQUtDLFNBUnlCLEVBUzlCLEtBQUtDLGFBVHlCLENBQWYsQ0FBakI7QUFXRDs7OytCQUVVUSxNLEVBQVE7QUFDakIsV0FBS2QsQ0FBTCxHQUFTYyxPQUFPZCxDQUFoQjtBQUNBLFdBQUtDLENBQUwsR0FBU2EsT0FBT2IsQ0FBaEI7QUFDQSxXQUFLQyxjQUFMLEdBQXNCWSxPQUFPWixjQUE3QjtBQUNBLFdBQUtDLGFBQUwsR0FBcUJXLE9BQU9YLGFBQTVCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQlUsT0FBT1YsU0FBeEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCUyxPQUFPVCxTQUF4QjtBQUNBLFdBQUtDLGFBQUwsR0FBcUJRLE9BQU9SLGFBQTVCOztBQUVBLFdBQUtDLE1BQUwsQ0FBWVcsSUFBWixDQUFpQkMsS0FBS0MsU0FBTCxDQUFlLENBQzlCLGdCQUFNbkMsUUFBTixDQUFlSyxJQURlLEVBRTlCLEtBQUtVLENBRnlCLEVBRzlCLEtBQUtDLENBSHlCLEVBSTlCLEtBQUtDLGNBSnlCLEVBSzlCLEtBQUtDLGFBTHlCLEVBTTlCLEtBQUtDLFNBTnlCLEVBTzlCLEtBQUtDLFNBUHlCLEVBUTlCLEtBQUtDLGFBUnlCLENBQWYsQ0FBakI7QUFVRDs7OzJCQUVNO0FBQ0wsYUFBTztBQUNMVCxZQUFJLEtBQUtBLEVBREo7QUFFTEcsV0FBRyxLQUFLQSxDQUZIO0FBR0xDLFdBQUcsS0FBS0EsQ0FISDtBQUlMRyxtQkFBVyxLQUFLQSxTQUpYO0FBS0xDLG1CQUFXLEtBQUtBLFNBTFg7QUFNTEMsdUJBQWUsS0FBS0EsYUFOZjtBQU9MSCx1QkFBZSxLQUFLQSxhQVBmO0FBUUxELHdCQUFnQixLQUFLQTtBQVJoQixPQUFQO0FBVUQ7Ozs7OztrQkF6RmtCTixNOzs7Ozs7Ozs7QUNLckI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFkQTs7OztBQUlBLElBQUl5QixVQUFVQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0IsVUFBM0IsQ0FBZDtBQUNBZixPQUFPWSxPQUFQLEdBQWlCQSxPQUFqQjs7QUFXQSxDQUFDLFlBQVk7QUFDWCxNQUFJSSxhQUFhQyxjQUFjRCxVQUFkLENBQXlCLFNBQXpCLENBQWpCOztBQUVBLE1BQUlsQixTQUFTLElBQUlvQixTQUFKLENBQWMscUJBQWQsQ0FBYjtBQUNBcEIsU0FBT3FCLE1BQVAsR0FBZ0IsVUFBVTdCLEtBQVYsRUFBaUI7QUFDL0JRLFdBQU9XLElBQVAsQ0FBWUMsS0FBS0MsU0FBTCxDQUFlLENBQUMsZ0JBQU1uQyxRQUFOLENBQWVDLE9BQWhCLEVBQXlCbUMsT0FBekIsQ0FBZixDQUFaO0FBQ0QsR0FGRDs7QUFJQSxNQUFJUSxnQkFBZ0IsNEJBQWtCdEIsTUFBbEIsQ0FBcEI7QUFDQXNCLGdCQUFjQyxtQkFBZDs7QUFFQSxNQUFJdEIsU0FBUyxxQkFBV2EsT0FBWCxDQUFiO0FBQ0FiLFNBQU91QixpQkFBUCxDQUF5QnhCLE1BQXpCO0FBRUQsQ0FkRCxJOzs7Ozs7Ozs7QUNoQkEsSUFBSXlCLFdBQVdBLFlBQVksRUFBM0I7O0FBRUEsSUFBSUEsU0FBU0MsU0FBVCxLQUF1QkMsU0FBM0IsRUFBc0M7QUFDcEMsTUFBSUQsWUFBWSxFQUFoQjs7QUFFQSxHQUFDLFVBQVNFLENBQVQsRUFBVztBQUNWQSxNQUFFQyxpQkFBRixHQUFzQixVQUFTQyxRQUFULEVBQW1CQyxRQUFuQixFQUE2QkMsTUFBN0IsRUFBcUNDLE9BQXJDLEVBQTZDO0FBQUVGLGlCQUFXQSxZQUFZLGtCQUF2QixDQUEyQyxJQUFJRyxNQUFNLElBQUlDLGNBQUosRUFBVixDQUFnQyxJQUFJQyxPQUFPLE1BQU1OLFNBQVNPLE9BQVQsQ0FBaUIsZUFBakIsRUFBa0MsRUFBbEMsRUFBc0NBLE9BQXRDLENBQThDLE1BQTlDLEVBQXNELEVBQXRELENBQWpCLENBQTRFSCxJQUFJSSxJQUFKLENBQVMsS0FBVCxFQUFnQlIsUUFBaEIsRUFBMkIsSUFBSUMsWUFBWUcsSUFBSUssZ0JBQXBCLEVBQXNDO0FBQUVMLFlBQUlLLGdCQUFKLENBQXFCUixRQUFyQjtBQUFpQyxPQUFDLElBQUdDLFdBQVdMLFNBQWQsRUFBd0I7QUFBRUssaUJBQVMsZ0JBQVNFLEdBQVQsRUFBY0osUUFBZCxFQUF3Qk0sSUFBeEIsRUFBOEI7QUFBRSxjQUFJRixJQUFJTSxNQUFKLEdBQWEsR0FBakIsRUFBc0I7QUFBRXRDLG1CQUFPa0MsSUFBUCxJQUFleEIsS0FBSzZCLEtBQUwsQ0FBV1AsSUFBSVEsWUFBZixDQUFmLENBQTZDQyxZQUFZWCxNQUFaLENBQW1COUIsT0FBT2tDLElBQVAsQ0FBbkI7QUFBbUM7QUFBRSxTQUFuSjtBQUFzSixPQUFDLElBQUdILFlBQVlOLFNBQWYsRUFBMEI7QUFBRU0sa0JBQVUsbUJBQVc7QUFBRVUsc0JBQVlDLFNBQVosR0FBd0JELFlBQVlDLFNBQVosSUFBeUJkLFFBQWpEO0FBQTRELFNBQW5GO0FBQXNGLE9BQUNJLElBQUlXLE1BQUosR0FBYSxZQUFXO0FBQUViLGVBQU9jLElBQVAsQ0FBWSxJQUFaLEVBQWtCWixHQUFsQixFQUF1QkosUUFBdkIsRUFBaUNNLElBQWpDO0FBQXlDLE9BQW5FLENBQXFFRixJQUFJYSxPQUFKLEdBQWNkLE9BQWQsQ0FBdUIvQixPQUFPa0MsSUFBUCxJQUFlLElBQWYsQ0FBcUJGLElBQUl2QixJQUFKO0FBQWEsS0FBbnVCO0FBQ0QsR0FGRCxFQUVHZSxTQUZIO0FBR0Q7O0FBRUQsSUFBSXNCLHFCQUFxQkEsc0JBQXNCLEVBQS9DOztBQUVBLFNBQVNDLGlCQUFULEdBQTZCO0FBQzNCLE9BQUtDLFVBQUwsQ0FBZ0JDLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCQyxTQUE1QjtBQUNEO0FBQ0RILGtCQUFrQkksU0FBbEIsR0FBOEJDLE9BQU9DLE1BQVAsQ0FBY0MsV0FBV0gsU0FBekIsQ0FBOUI7QUFDQUosa0JBQWtCSSxTQUFsQixDQUE0QkksV0FBNUIsR0FBMENSLGlCQUExQzs7QUFFQSxDQUFDLFVBQVNyQixDQUFULEVBQVk7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxJQUFFOEIsaUJBQUYsR0FBc0IsVUFBU0MsS0FBVCxFQUFnQkMsUUFBaEIsRUFBMEI7QUFDOUMsUUFBSUMsZUFBZSxTQUFTQyxNQUFULENBQWdCSCxNQUFNSSxPQUFOLENBQWMsQ0FBZCxDQUFoQixDQUFuQjtBQUNBLFFBQUlDLFdBQVcsa0JBQWtCRixNQUFsQixDQUF5QkgsTUFBTUksT0FBTixDQUFjLENBQWQsQ0FBekIsQ0FBZjs7QUFFQSxRQUFJL0IsU0FBUyxTQUFUQSxNQUFTLENBQVNFLEdBQVQsRUFBY0osUUFBZCxFQUF3Qk0sSUFBeEIsRUFBOEI7QUFDekMsVUFBSUYsSUFBSU0sTUFBSixHQUFhLEdBQWpCLEVBQXNCO0FBQ3BCdEMsZUFBT2tDLElBQVAsSUFBZXhCLEtBQUs2QixLQUFMLENBQVdQLElBQUlRLFlBQWYsQ0FBZjtBQUNBQyxvQkFBWVgsTUFBWixDQUFtQjlCLE9BQU9rQyxJQUFQLENBQW5COztBQUVBd0I7QUFDRDtBQUNGLEtBUEQ7O0FBU0EsUUFBSTFELE9BQU8yRCxZQUFQLE1BQXlCbEMsU0FBekIsSUFBc0N6QixPQUFPMkQsWUFBUCxNQUF5QixJQUFuRSxFQUF5RTtBQUN2RW5DLGdCQUFVRyxpQkFBVixDQUE0Qm1DLFFBQTVCLEVBQXNDckMsU0FBdEMsRUFBaURLLE1BQWpEO0FBQ0QsS0FGRCxNQUVPO0FBQ0w0QjtBQUNEO0FBQ0YsR0FsQkQ7O0FBcUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0FYLG9CQUFrQkksU0FBbEIsQ0FBNEJILFVBQTVCLEdBQXlDLFVBQVNTLEtBQVQsRUFBZ0JwRSxPQUFoQixFQUF5QjBFLFNBQXpCLEVBQW9DO0FBQzNFLFNBQUtDLFVBQUwsR0FBa0JELFNBQWxCO0FBQ0FULGVBQVdILFNBQVgsQ0FBcUJILFVBQXJCLENBQWdDSixJQUFoQyxDQUFxQyxJQUFyQyxFQUEyQ2EsS0FBM0MsRUFBa0RwRSxPQUFsRDtBQUNELEdBSEQ7O0FBS0EwRCxvQkFBa0JJLFNBQWxCLENBQTRCN0QsS0FBNUIsR0FBb0MsWUFBVztBQUM3QyxXQUFPLEtBQUswRSxVQUFaO0FBQ0QsR0FGRDs7QUFJQWpCLG9CQUFrQkksU0FBbEIsQ0FBNEJjLE1BQTVCLEdBQXFDLFVBQVNDLElBQVQsRUFBZTtBQUNsRCxXQUFPLElBQUluQixpQkFBSixDQUFzQm1CLEtBQUtULEtBQTNCLEVBQWtDUyxLQUFLOUUsRUFBdkMsRUFBMkM4RSxLQUFLSCxTQUFoRCxDQUFQO0FBQ0QsR0FGRDs7QUFJQTtBQUNBO0FBQ0E7QUFDQUksY0FBWWhCLFNBQVosQ0FBc0JpQixpQkFBdEIsR0FBMEMsVUFBU1gsS0FBVCxFQUFnQnBFLE9BQWhCLEVBQXlCO0FBQ2pFLFFBQUlnRixXQUFXLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLENBQWY7O0FBRUFBLGFBQVNDLE9BQVQsQ0FBaUIsVUFBU0MsUUFBVCxFQUFtQjtBQUNsQyxVQUFJQyxNQUFNLENBQUNmLEtBQUQsRUFBUXBFLE9BQVIsRUFBaUJrRixRQUFqQixDQUFWO0FBQ0FFLHdCQUFrQkMsUUFBbEIsQ0FBMkJGLEdBQTNCLEVBQWdDLEtBQWhDO0FBQ0QsS0FIRDtBQUlELEdBUEQ7O0FBU0FMLGNBQVloQixTQUFaLENBQXNCd0IsZ0JBQXRCLEdBQXlDLFVBQVNsQixLQUFULEVBQWdCO0FBQ3ZELFFBQUksS0FBS21CLGFBQUwsS0FBdUJuRCxTQUEzQixFQUFzQztBQUNwQyxXQUFLbUQsYUFBTCxHQUFxQixFQUFyQjtBQUNEOztBQUVELFFBQUksS0FBS0EsYUFBTCxDQUFtQm5CLEtBQW5CLE1BQThCaEMsU0FBbEMsRUFBNkM7QUFDM0MsV0FBS21ELGFBQUwsQ0FBbUJuQixLQUFuQixJQUE0QixFQUE1QjtBQUNEO0FBQ0YsR0FSRDs7QUFVQVUsY0FBWWhCLFNBQVosQ0FBc0IwQixjQUF0QixHQUF1QyxVQUFTcEIsS0FBVCxFQUFnQm5FLEtBQWhCLEVBQXVCO0FBQzVELFNBQUtxRixnQkFBTCxDQUFzQmxCLEtBQXRCO0FBQ0EsU0FBS1csaUJBQUwsQ0FBdUJYLEtBQXZCLEVBQThCbkUsTUFBTUYsRUFBcEM7QUFDQSxTQUFLd0YsYUFBTCxDQUFtQm5CLEtBQW5CLEVBQTBCbkUsTUFBTUYsRUFBaEMsSUFBc0NFLEtBQXRDOztBQUVBLFdBQU9BLEtBQVA7QUFDRCxHQU5EOztBQVFBNkUsY0FBWWhCLFNBQVosQ0FBc0IyQixpQkFBdEIsR0FBMEMsVUFBU3JCLEtBQVQsRUFBZ0JwRSxPQUFoQixFQUF5QjtBQUNqRSxTQUFLc0YsZ0JBQUwsQ0FBc0JsQixLQUF0QjtBQUNBLFNBQUtXLGlCQUFMLENBQXVCWCxLQUF2QixFQUE4QnBFLE9BQTlCO0FBQ0EsV0FBTyxLQUFLdUYsYUFBTCxDQUFtQm5CLEtBQW5CLEVBQTBCcEUsT0FBMUIsQ0FBUDtBQUNELEdBSkQ7O0FBTUE4RSxjQUFZaEIsU0FBWixDQUFzQjRCLGlCQUF0QixHQUEwQyxVQUFTdEIsS0FBVCxFQUFnQjtBQUN4RCxTQUFLa0IsZ0JBQUw7QUFDQSxTQUFLQyxhQUFMLENBQW1CbkIsS0FBbkIsSUFBNEIsRUFBNUI7QUFDRCxHQUhEOztBQUtBVSxjQUFZaEIsU0FBWixDQUFzQjZCLGVBQXRCLEdBQXdDLFVBQVN2QixLQUFULEVBQWdCO0FBQ3RELFNBQUtrQixnQkFBTDtBQUNBLFdBQU8sS0FBS0MsYUFBTCxDQUFtQm5CLEtBQW5CLENBQVA7QUFDRCxHQUhEOztBQUtBO0FBQ0E7QUFDQTtBQUNBd0IsV0FBUzlCLFNBQVQsQ0FBbUIrQixtQkFBbkIsR0FBeUMsWUFBVztBQUNsRCxRQUFJQyxRQUFRLENBQVo7QUFDQSxXQUFPQSxRQUFRLEtBQUtDLE9BQUwsQ0FBYUMsTUFBckIsSUFBK0IsQ0FBQyxDQUFDLEtBQUtELE9BQUwsQ0FBYUQsS0FBYixDQUF4QyxFQUE2RDtBQUMzREE7QUFDRDs7QUFFRCxXQUFPQSxLQUFQO0FBQ0QsR0FQRDs7QUFTQUYsV0FBUzlCLFNBQVQsQ0FBbUJtQyxRQUFuQixHQUE4QixVQUFTdkIsU0FBVCxFQUFvQndCLFNBQXBCLEVBQStCSixLQUEvQixFQUFzQztBQUNsRSxRQUFJSSxjQUFjOUQsU0FBbEIsRUFBNkI7QUFDM0I4RCxrQkFBWSxLQUFaO0FBQ0Q7O0FBRUQsUUFBSUosVUFBVTFELFNBQWQsRUFBeUI7QUFDdkIwRCxjQUFRLEtBQUtELG1CQUFMLEVBQVI7QUFDRDs7QUFFRG5CLGNBQVUzRSxFQUFWLEdBQWUrRixLQUFmO0FBQ0EsUUFBSUssWUFBWSxJQUFJekMsaUJBQUosQ0FBc0IsS0FBSzBDLE1BQTNCLEVBQW1DTixLQUFuQyxFQUEwQ3BCLFNBQTFDLENBQWhCO0FBQ0EyQixnQkFBWXRCLGlCQUFaLENBQThCLEtBQUtxQixNQUFuQyxFQUEyQ04sS0FBM0M7O0FBRUEsU0FBS0MsT0FBTCxDQUFhRCxLQUFiLElBQXNCSyxTQUF0Qjs7QUFFQSxRQUFJRyxhQUFhQyxNQUFiLFlBQStCQyxTQUFuQyxFQUE4QztBQUM1QyxVQUFJQyxTQUFTLElBQUlDLGdCQUFKLENBQXFCUCxTQUFyQixDQUFiO0FBQ0FHLG1CQUFhQyxNQUFiLENBQW9CSSxVQUFwQixDQUErQkMsaUJBQS9CLENBQWlEQyxJQUFqRCxDQUFzREosTUFBdEQ7QUFDQUgsbUJBQWFDLE1BQWIsQ0FBb0JJLFVBQXBCLENBQStCRyxRQUEvQixDQUF3Q0MsUUFBeEMsQ0FBaUROLE1BQWpEO0FBQ0Q7O0FBRUQsUUFBSVAsY0FBYyxLQUFsQixFQUF5QjtBQUN2Qkcsa0JBQVliLGNBQVosQ0FBMkIsS0FBS1ksTUFBaEMsRUFBd0MxQixTQUF4QztBQUNEOztBQUVELFdBQU95QixTQUFQO0FBQ0QsR0ExQkQ7O0FBNEJBLE1BQUlhLHlCQUF5QnBCLFNBQVM5QixTQUFULENBQW1CbUQsV0FBaEQ7QUFDQXJCLFdBQVM5QixTQUFULENBQW1CbUQsV0FBbkIsR0FBaUMsWUFBVztBQUMxQ0QsMkJBQXVCekQsSUFBdkIsQ0FBNEIsSUFBNUI7O0FBRUEsUUFBSTJELGVBQWViLFlBQVlWLGVBQVosQ0FBNEIsS0FBS1MsTUFBakMsQ0FBbkI7QUFDQSxTQUFLLElBQUlwRyxPQUFULElBQW9Ca0gsWUFBcEIsRUFBa0M7QUFDaEMsVUFBSUEsYUFBYWxILE9BQWIsTUFBMEJvQyxTQUE5QixFQUF5QztBQUN6QyxVQUFJK0UsYUFBYSxLQUFLdEIsbUJBQUwsRUFBakI7O0FBRUFxQixtQkFBYWxILE9BQWIsRUFBc0JBLE9BQXRCLEdBQWdDbUgsVUFBaEM7QUFDQSxXQUFLcEIsT0FBTCxDQUFhb0IsVUFBYixJQUEyQixJQUFJekQsaUJBQUosQ0FBc0IsS0FBSzBDLE1BQTNCLEVBQW1DZSxVQUFuQyxFQUErQ0QsYUFBYWxILE9BQWIsQ0FBL0MsQ0FBM0I7QUFDRDtBQUNGLEdBWEQ7O0FBYUE0RixXQUFTOUIsU0FBVCxDQUFtQnNELFVBQW5CLEdBQWdDLFVBQVMxQyxTQUFULEVBQW9CeEUsQ0FBcEIsRUFBdUJDLENBQXZCLEVBQTBCK0YsU0FBMUIsRUFBcUNKLEtBQXJDLEVBQTRDO0FBQzFFcEIsY0FBVXhFLENBQVYsR0FBY0EsQ0FBZDtBQUNBd0UsY0FBVXZFLENBQVYsR0FBY0EsQ0FBZDtBQUNBLFdBQU8sS0FBSzhGLFFBQUwsQ0FBY3ZCLFNBQWQsRUFBeUJ3QixTQUF6QixFQUFvQ0osS0FBcEMsQ0FBUDtBQUNELEdBSkQ7O0FBTUFGLFdBQVM5QixTQUFULENBQW1CdUQsVUFBbkIsR0FBZ0MsVUFBUzNDLFNBQVQsRUFBb0I0QyxRQUFwQixFQUE4QnBCLFNBQTlCLEVBQXlDO0FBQ3ZFLFNBQUssSUFBSXFCLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsU0FBU3RCLE1BQTdCLEVBQXFDdUIsR0FBckMsRUFBMEM7QUFDeEMsVUFBSUMsZUFBZUMsT0FBT0MsWUFBUCxDQUFvQmhELFNBQXBCLENBQW5CO0FBQ0E4QyxtQkFBYXRILENBQWIsR0FBaUJvSCxTQUFTQyxDQUFULEVBQVlySCxDQUE3QjtBQUNBc0gsbUJBQWFySCxDQUFiLEdBQWlCbUgsU0FBU0MsQ0FBVCxFQUFZcEgsQ0FBN0I7QUFDQSxXQUFLOEYsUUFBTCxDQUFjdUIsWUFBZCxFQUE0QnRCLFNBQTVCO0FBQ0Q7QUFDRixHQVBEOztBQVNBTixXQUFTOUIsU0FBVCxDQUFtQjZELFlBQW5CLEdBQWtDLFVBQVNDLGFBQVQsRUFBd0I7QUFDeEQsUUFBSTNILFFBQVE0SCxTQUFTQyxNQUFULENBQWdCRixhQUFoQixDQUFaO0FBQ0EsUUFBSTNILFVBQVVtQyxTQUFkLEVBQXlCLE9BQU9BLFNBQVA7O0FBRXpCLFdBQU9xRixPQUFPQyxZQUFQLENBQW9CekgsS0FBcEIsQ0FBUDtBQUNELEdBTEQ7O0FBT0EyRixXQUFTOUIsU0FBVCxDQUFtQmlFLGdCQUFuQixHQUFzQyxVQUFTQyxXQUFULEVBQXNCSixhQUF0QixFQUFxQ3ZELFFBQXJDLEVBQStDO0FBQ25GaEMsTUFBRThCLGlCQUFGLENBQW9CNkQsV0FBcEIsRUFBaUMsWUFBVztBQUMxQyxVQUFJMUQsZUFBZSxTQUFTQyxNQUFULENBQWdCeUQsWUFBWXhELE9BQVosQ0FBb0IsQ0FBcEIsQ0FBaEIsQ0FBbkI7O0FBRUEsVUFBSTdELE9BQU8yRCxZQUFQLE1BQXlCbEMsU0FBekIsSUFBc0N6QixPQUFPMkQsWUFBUCxNQUF5QixJQUFuRSxFQUF5RTs7QUFFekUsVUFBSXJFLFFBQVFVLE9BQU8yRCxZQUFQLEVBQXFCd0QsTUFBckIsQ0FBNEJGLGFBQTVCLENBQVo7QUFDQSxVQUFJM0gsVUFBVW1DLFNBQWQsRUFBeUI7O0FBRXpCLFVBQUlzQyxZQUFZK0MsT0FBT0MsWUFBUCxDQUFvQnpILEtBQXBCLENBQWhCO0FBQ0EsVUFBSXlFLFVBQVV1RCxJQUFkLEVBQW9CO0FBQ2xCN0Usb0JBQVk4RSxlQUFaLENBQTRCeEQsU0FBNUI7QUFDRDtBQUNETCxlQUFTZCxJQUFULENBQWMsSUFBZCxFQUFvQm1CLFNBQXBCO0FBQ0QsS0FiRDtBQWNELEdBZkQ7O0FBaUJBa0IsV0FBUzlCLFNBQVQsQ0FBbUJxRSxTQUFuQixHQUErQixVQUFTUCxhQUFULEVBQXdCMUgsQ0FBeEIsRUFBMkJDLENBQTNCLEVBQThCK0YsU0FBOUIsRUFBeUNrQyxRQUF6QyxFQUFtRDtBQUNoRixRQUFJMUQsWUFBWSxLQUFLaUQsWUFBTCxDQUFrQkMsYUFBbEIsQ0FBaEI7QUFDQSxRQUFJbEQsU0FBSixFQUFlO0FBQ2IyRCxlQUFTakIsVUFBVCxDQUFvQjFDLFNBQXBCLEVBQStCeEUsQ0FBL0IsRUFBa0NDLENBQWxDLEVBQXFDK0YsU0FBckMsRUFBZ0RrQyxRQUFoRDtBQUNEO0FBQ0YsR0FMRDs7QUFPQXhDLFdBQVM5QixTQUFULENBQW1Cd0UsaUJBQW5CLEdBQXVDLFVBQVNDLFFBQVQsRUFBbUI7QUFDeEQsUUFBSWpCLFdBQVcsRUFBZjs7QUFFQSxTQUFLLElBQUlwSCxJQUFJLENBQWIsRUFBZ0JBLElBQUltSSxTQUFTRyxLQUFULEVBQXBCLEVBQXNDdEksR0FBdEMsRUFBMkM7QUFDekMsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlrSSxTQUFTSSxNQUFULEVBQXBCLEVBQXVDdEksR0FBdkMsRUFBNEM7QUFDMUMsWUFBSWtJLFNBQVNLLFFBQVQsQ0FBa0J4SSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0I2RixNQUF4QixLQUFtQyxDQUF2QyxFQUEwQztBQUN4QyxjQUFJcUMsU0FBU0UsUUFBVCxDQUFrQnJJLENBQWxCLEVBQXFCQyxDQUFyQixLQUEyQm9JLFFBQS9CLEVBQXlDO0FBQ3ZDakIscUJBQVNULElBQVQsQ0FBYyxFQUFDM0csR0FBSUEsQ0FBTCxFQUFRQyxHQUFJQSxDQUFaLEVBQWQ7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxXQUFPbUgsUUFBUDtBQUNELEdBZEQ7O0FBZ0JBMUIsV0FBUzlCLFNBQVQsQ0FBbUI2RSxtQkFBbkIsR0FBeUMsVUFBU0osUUFBVCxFQUFtQjtBQUMxRCxRQUFJakIsV0FBVyxLQUFLZ0IsaUJBQUwsQ0FBdUJDLFFBQXZCLENBQWY7O0FBRUEsUUFBSWpCLFNBQVN0QixNQUFULEdBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLFVBQUlGLFFBQVF0RSxLQUFLb0gsU0FBTCxDQUFldEIsU0FBU3RCLE1BQXhCLENBQVo7QUFDQSxhQUFPc0IsU0FBU3hCLEtBQVQsQ0FBUDtBQUNEOztBQUVELFdBQU8xRCxTQUFQO0FBQ0QsR0FURDs7QUFXQXdELFdBQVM5QixTQUFULENBQW1CK0UsaUJBQW5CLEdBQXVDLFVBQVNqQixhQUFULEVBQXdCVyxRQUF4QixFQUFrQ3JDLFNBQWxDLEVBQTZDa0MsUUFBN0MsRUFBdUQ7QUFDNUYsUUFBSVUsT0FBTyxLQUFLSCxtQkFBTCxDQUF5QkosUUFBekIsQ0FBWDtBQUNBLFFBQUlPLFNBQVMxRyxTQUFiLEVBQXdCO0FBQ3RCLFdBQUsrRixTQUFMLENBQWVQLGFBQWYsRUFBOEJrQixLQUFLNUksQ0FBbkMsRUFBc0M0SSxLQUFLM0ksQ0FBM0MsRUFBOEMrRixTQUE5QyxFQUF5RGtDLFFBQXpEO0FBQ0Q7QUFDRixHQUxEOztBQU9BeEMsV0FBUzlCLFNBQVQsQ0FBbUJpRixhQUFuQixHQUFtQyxVQUFTZixXQUFULEVBQXNCSixhQUF0QixFQUFxQzFILENBQXJDLEVBQXdDQyxDQUF4QyxFQUEyQytGLFNBQTNDLEVBQXNEa0MsUUFBdEQsRUFBZ0UvRCxRQUFoRSxFQUEwRTtBQUMzRyxTQUFLMEQsZ0JBQUwsQ0FBc0JDLFdBQXRCLEVBQW1DSixhQUFuQyxFQUFrRCxVQUFTbEQsU0FBVCxFQUFvQjtBQUNwRSxVQUFJekUsUUFBUW9JLFNBQVNqQixVQUFULENBQW9CMUMsU0FBcEIsRUFBK0J4RSxDQUEvQixFQUFrQ0MsQ0FBbEMsRUFBcUMrRixTQUFyQyxFQUFnRGtDLFFBQWhELENBQVo7O0FBRUEsVUFBSSxDQUFDLENBQUMvRCxRQUFOLEVBQWdCO0FBQ2RBLGlCQUFTZCxJQUFULENBQWMsSUFBZCxFQUFvQnRELEtBQXBCO0FBQ0Q7QUFDRixLQU5EO0FBT0QsR0FSRDs7QUFVQTJGLFdBQVM5QixTQUFULENBQW1Ca0Ysd0JBQW5CLEdBQThDLFVBQVNoQixXQUFULEVBQXNCSixhQUF0QixFQUFxQ1csUUFBckMsRUFBK0NyQyxTQUEvQyxFQUEwRGtDLFFBQTFELEVBQW9FL0QsUUFBcEUsRUFBOEU7QUFDMUgsUUFBSXlFLE9BQU8sS0FBS0gsbUJBQUwsQ0FBeUJKLFFBQXpCLENBQVg7QUFDQSxRQUFJTyxTQUFTMUcsU0FBYixFQUF3QjtBQUN0QixXQUFLMkcsYUFBTCxDQUFtQmYsV0FBbkIsRUFBZ0NKLGFBQWhDLEVBQStDa0IsS0FBSzVJLENBQXBELEVBQXVENEksS0FBSzNJLENBQTVELEVBQStEK0YsU0FBL0QsRUFBMEVrQyxRQUExRSxFQUFvRi9ELFFBQXBGO0FBQ0Q7QUFDRixHQUxEOztBQU9BdUIsV0FBUzlCLFNBQVQsQ0FBbUJtRixhQUFuQixHQUFtQyxVQUFTckIsYUFBVCxFQUF3QlcsUUFBeEIsRUFBa0NyQyxTQUFsQyxFQUE2QztBQUM5RSxRQUFJeEIsWUFBWSxLQUFLaUQsWUFBTCxDQUFrQkMsYUFBbEIsQ0FBaEI7QUFDQSxRQUFJTixXQUFXLEtBQUtnQixpQkFBTCxDQUF1QkMsUUFBdkIsQ0FBZjs7QUFFQSxRQUFJN0QsYUFBYTRDLFFBQWpCLEVBQTJCO0FBQ3pCLFdBQUtELFVBQUwsQ0FBZ0IzQyxTQUFoQixFQUEyQjRDLFFBQTNCLEVBQXFDcEIsU0FBckM7QUFDRDtBQUNGLEdBUEQ7O0FBU0FOLFdBQVM5QixTQUFULENBQW1Cb0YsaUJBQW5CLEdBQXVDLFVBQVNsQixXQUFULEVBQXNCSixhQUF0QixFQUFxQ1csUUFBckMsRUFBK0NyQyxTQUEvQyxFQUEwRDtBQUMvRixRQUFJb0IsV0FBVyxLQUFLZ0IsaUJBQUwsQ0FBdUJDLFFBQXZCLENBQWY7O0FBRUEsUUFBSWpCLFNBQVN0QixNQUFULEdBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLFdBQUsrQixnQkFBTCxDQUFzQkMsV0FBdEIsRUFBbUNKLGFBQW5DLEVBQWtELFVBQVNsRCxTQUFULEVBQW9CO0FBQ3BFMkQsaUJBQVNoQixVQUFULENBQW9CM0MsU0FBcEIsRUFBK0I0QyxRQUEvQixFQUF5Q3BCLFNBQXpDO0FBQ0QsT0FGRDtBQUdEO0FBQ0YsR0FSRDs7QUFVQWlELG1CQUFpQnJGLFNBQWpCLENBQTJCc0YsZUFBM0IsR0FBNkMsVUFBU0MsV0FBVCxFQUFzQjtBQUNqRSxRQUFJQSxZQUFZQyxNQUFaLENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEtBQTRCLEdBQTVCLElBQW1DRCxZQUFZQyxNQUFaLENBQW1CLENBQUMsQ0FBcEIsS0FBMEIsR0FBakUsRUFBc0U7QUFDcEUsVUFBSUMsYUFBYUMsU0FBU0gsWUFBWUMsTUFBWixDQUFtQixDQUFuQixFQUFzQkQsWUFBWXJELE1BQVosR0FBcUIsQ0FBM0MsQ0FBVCxFQUF3RCxFQUF4RCxDQUFqQjs7QUFFQSxVQUFJdUQsYUFBYSxDQUFqQixFQUFvQjtBQUNsQixlQUFPRSxlQUFlQyxLQUFmLENBQXFCSCxVQUFyQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxDQUFQO0FBQ0QsS0FSRCxNQVFPO0FBQ0wsYUFBT0MsU0FBU0gsV0FBVCxFQUFzQixFQUF0QixDQUFQO0FBQ0Q7QUFDRixHQVpEOztBQWNBRixtQkFBaUJyRixTQUFqQixDQUEyQjZGLGlCQUEzQixHQUErQyxVQUFTQyxPQUFULEVBQWtCQyxJQUFsQixFQUF3QjtBQUNyRSxRQUFJQSxLQUFLN0QsTUFBTCxHQUFjLENBQWxCLEVBQXFCOztBQUVyQixRQUFJNEQsUUFBUUUsV0FBUixPQUEwQixNQUExQixJQUFvQ0YsUUFBUUUsV0FBUixPQUEwQixPQUFsRSxFQUEyRTtBQUMzRSxRQUFJRCxLQUFLLENBQUwsRUFBUUMsV0FBUixPQUEwQixPQUE5QixFQUF1Qzs7QUFFdkMsUUFBSWxDLGdCQUFnQixLQUFLd0IsZUFBTCxDQUFxQlMsS0FBSyxDQUFMLENBQXJCLENBQXBCO0FBQ0EsUUFBSTdCLGNBQWNLLFNBQVNqRSxLQUFULEVBQWxCO0FBQ0EsUUFBSTJGLGFBQWEsSUFBakI7QUFDQSxRQUFJN0osSUFBSSxDQUFSO0FBQ0EsUUFBSUMsSUFBSSxDQUFSO0FBQ0EsUUFBSW9JLFdBQVcsQ0FBZjtBQUNBLFFBQUlyQyxZQUFZLElBQWhCO0FBQ0EsUUFBSThELGNBQWMsS0FBbEI7QUFDQSxRQUFJQyxTQUFKOztBQUVBLFFBQUlyQyxpQkFBaUIsQ0FBckIsRUFBd0I7O0FBRXhCLFFBQUlzQyxZQUFZLENBQWhCOztBQUVBLFFBQUlMLEtBQUs3RCxNQUFMLElBQWVrRSxZQUFZLENBQS9CLEVBQWtDO0FBQ2hDLFVBQUlMLEtBQUtLLFNBQUwsRUFBZ0JKLFdBQWhCLE1BQWlDLE1BQWpDLElBQTJDRCxLQUFLSyxZQUFZLENBQWpCLEVBQW9CSixXQUFwQixNQUFxQyxLQUFwRixFQUEyRjtBQUN6RjlCLHNCQUFjLEtBQUtvQixlQUFMLENBQXFCUyxLQUFLSyxZQUFZLENBQWpCLENBQXJCLENBQWQ7QUFDQUEscUJBQWEsQ0FBYjtBQUNEO0FBQ0Y7O0FBRUQsUUFBSUwsS0FBSzdELE1BQUwsR0FBY2tFLFNBQWQsSUFBMkJMLEtBQUtLLFNBQUwsRUFBZ0JKLFdBQWhCLE1BQWlDLE1BQWhFLEVBQXdFO0FBQ3RFQyxtQkFBYSxJQUFiO0FBQ0FDLG9CQUFjLElBQWQ7QUFDQTlKLFVBQUksS0FBS2lLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCakssQ0FBdEI7QUFDQUMsVUFBSSxLQUFLZ0ssU0FBTCxDQUFlLENBQWYsRUFBa0JoSyxDQUF0QjtBQUNBK0o7QUFFRCxLQVBELE1BT08sSUFBSUwsS0FBSzdELE1BQUwsR0FBY2tFLFNBQWxCLEVBQTZCO0FBQ2xDLFVBQUlMLEtBQUtLLFNBQUwsRUFBZ0JKLFdBQWhCLE9BQWtDLElBQWxDLElBQTBDRCxLQUFLSyxTQUFMLEVBQWdCSixXQUFoQixPQUFrQyxJQUFoRixFQUFzRjtBQUNwRmhKLGdCQUFRc0osS0FBUixDQUFjLG9CQUFkLEVBQW9DLHFCQUFwQyxFQUEyRFIsT0FBM0QsRUFBb0VDLElBQXBFO0FBQ0E7QUFDRDs7QUFFREs7O0FBRUEsVUFBSUwsS0FBSzdELE1BQUwsR0FBY2tFLFNBQWQsSUFBMkJMLEtBQUtLLFNBQUwsRUFBZ0JKLFdBQWhCLE1BQWlDLFFBQWhFLEVBQTBFO0FBQ3hFQyxxQkFBYSxLQUFiO0FBQ0FHO0FBQ0QsT0FIRCxNQUdPLElBQUlMLEtBQUs3RCxNQUFMLEdBQWNrRSxTQUFkLElBQTJCTCxLQUFLSyxTQUFMLEVBQWdCSixXQUFoQixNQUFpQyxVQUFoRSxFQUE0RTtBQUNqRkMscUJBQWEsSUFBYjtBQUNBRztBQUNEO0FBQ0YsS0FmTSxNQWdCRjtBQUNIcEosY0FBUXNKLEtBQVIsQ0FBYyxvQkFBZCxFQUFvQyxvQkFBcEMsRUFBMERSLE9BQTFELEVBQW1FQyxJQUFuRTtBQUNBO0FBQ0Q7O0FBRUQsUUFBSUUsVUFBSixFQUFnQjtBQUNkLFVBQUksQ0FBQ0MsV0FBTCxFQUFrQjtBQUNoQixZQUFJSCxLQUFLN0QsTUFBTCxHQUFja0UsU0FBZCxJQUEyQkwsS0FBS0ssU0FBTCxFQUFnQkosV0FBaEIsTUFBaUMsUUFBaEUsRUFBMEU7QUFDeEU1SixjQUFJbUssWUFBWW5LLENBQWhCO0FBQ0FDLGNBQUlrSyxZQUFZbEssQ0FBaEI7QUFDQStKO0FBQ0QsU0FKRCxNQUlPLElBQUlMLEtBQUs3RCxNQUFMLElBQWVrRSxZQUFZLENBQS9CLEVBQWtDO0FBQ3ZDaEssY0FBSSxLQUFLa0osZUFBTCxDQUFxQlMsS0FBS0ssU0FBTCxDQUFyQixDQUFKO0FBQ0EvSixjQUFJLEtBQUtpSixlQUFMLENBQXFCUyxLQUFLSyxZQUFZLENBQWpCLENBQXJCLENBQUo7O0FBRUFBLHVCQUFhLENBQWI7QUFDRCxTQUxNLE1BTUY7QUFDSHBKLGtCQUFRc0osS0FBUixDQUFjLG9CQUFkLEVBQW9DLGdCQUFwQyxFQUFzRFIsT0FBdEQsRUFBK0RDLElBQS9EO0FBQ0Q7QUFDRjtBQUNGLEtBaEJELE1BaUJLO0FBQ0gsVUFBSUEsS0FBSzdELE1BQUwsR0FBY2tFLFNBQWxCLEVBQTZCO0FBQzNCM0IsbUJBQVcsS0FBS2EsZUFBTCxDQUFxQlMsS0FBS0ssU0FBTCxDQUFyQixDQUFYO0FBQ0FBO0FBQ0QsT0FIRCxNQUlLO0FBQ0hwSixnQkFBUXNKLEtBQVIsQ0FBYyxvQkFBZCxFQUFvQyxjQUFwQyxFQUFvRFIsT0FBcEQsRUFBNkRDLElBQTdEO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJQSxLQUFLN0QsTUFBTCxHQUFja0UsWUFBWSxDQUE5QixFQUFpQztBQUMvQixVQUFJTCxLQUFLSyxTQUFMLEVBQWdCSixXQUFoQixHQUE4QlEsVUFBOUIsQ0FBeUMsTUFBekMsS0FBb0RULEtBQUtLLFlBQVksQ0FBakIsRUFBb0JKLFdBQXBCLEdBQWtDUSxVQUFsQyxDQUE2QyxJQUE3QyxDQUF4RCxFQUE0RztBQUMxR0wsb0JBQVksS0FBS2IsZUFBTCxDQUFxQlMsS0FBS0ssWUFBWSxDQUFqQixDQUFyQixDQUFaO0FBQ0FBLHFCQUFhLENBQWI7QUFDRDtBQUNGOztBQUVELFFBQUlMLEtBQUs3RCxNQUFMLEdBQWNrRSxTQUFsQixFQUE2QjtBQUMzQixVQUFJTCxLQUFLSyxTQUFMLEVBQWdCSixXQUFoQixHQUE4QlEsVUFBOUIsQ0FBeUMsTUFBekMsQ0FBSixFQUFzRDtBQUNwRHBFLG9CQUFZLElBQVo7QUFDQWdFO0FBQ0QsT0FIRCxNQUdPLElBQUlMLEtBQUtLLFNBQUwsRUFBZ0JKLFdBQWhCLE1BQWlDLE1BQXJDLEVBQTZDO0FBQ2xENUQsb0JBQVksS0FBWjtBQUNBZ0U7QUFDRDtBQUNGOztBQUVELFFBQUlILFVBQUosRUFBZ0I7QUFDZCxVQUFJL0IsZUFBZUssU0FBU2pFLEtBQVQsRUFBbkIsRUFBcUM7QUFDbkNpRSxpQkFBU0YsU0FBVCxDQUFtQlAsYUFBbkIsRUFBa0MxSCxDQUFsQyxFQUFxQ0MsQ0FBckMsRUFBd0MrRixTQUF4QyxFQUFtRCtELFNBQW5EO0FBQ0QsT0FGRCxNQUVPO0FBQ0w1QixpQkFBU1UsYUFBVCxDQUF1QmYsV0FBdkIsRUFBb0NKLGFBQXBDLEVBQW1EMUgsQ0FBbkQsRUFBc0RDLENBQXRELEVBQXlEK0YsU0FBekQsRUFBb0UrRCxTQUFwRTtBQUNEO0FBQ0YsS0FORCxNQU9LO0FBQ0gsVUFBSUwsUUFBUUUsV0FBUixPQUEwQixNQUE5QixFQUFzQztBQUNwQyxZQUFJOUIsZUFBZUssU0FBU2pFLEtBQVQsRUFBbkIsRUFBcUM7QUFDbkNpRSxtQkFBU1EsaUJBQVQsQ0FBMkJqQixhQUEzQixFQUEwQ1csUUFBMUMsRUFBb0RyQyxTQUFwRCxFQUErRCtELFNBQS9EO0FBQ0QsU0FGRCxNQUVPO0FBQ0w1QixtQkFBU1csd0JBQVQsQ0FBa0NoQixXQUFsQyxFQUErQ0osYUFBL0MsRUFBOERXLFFBQTlELEVBQXdFckMsU0FBeEUsRUFBbUYrRCxTQUFuRjtBQUNEO0FBQ0YsT0FORCxNQU1PLElBQUlMLFFBQVFFLFdBQVIsT0FBMEIsT0FBOUIsRUFBdUM7QUFDNUMsWUFBSTlCLGVBQWVLLFNBQVNqRSxLQUFULEVBQW5CLEVBQXFDO0FBQ25DaUUsbUJBQVNZLGFBQVQsQ0FBdUJyQixhQUF2QixFQUFzQ1csUUFBdEMsRUFBZ0RyQyxTQUFoRDtBQUNELFNBRkQsTUFFTztBQUNMbUMsbUJBQVNhLGlCQUFULENBQTJCbEIsV0FBM0IsRUFBd0NKLGFBQXhDLEVBQXVEVyxRQUF2RCxFQUFpRXJDLFNBQWpFO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsR0F6SEQ7O0FBMkhBaUQsbUJBQWlCckYsU0FBakIsQ0FBMkJ5RyxrQkFBM0IsR0FBZ0QsVUFBU1gsT0FBVCxFQUFrQkMsSUFBbEIsRUFBd0I7QUFDdEUsUUFBSUEsS0FBSzdELE1BQUwsSUFBZSxDQUFuQixFQUFzQjs7QUFFdEIsUUFBSTRELFFBQVFFLFdBQVIsT0FBMEIsUUFBOUIsRUFBd0M7QUFDeEMsUUFBSUQsS0FBSyxDQUFMLEVBQVFDLFdBQVIsT0FBMEIsTUFBOUIsRUFBc0M7QUFDdEMsUUFBSUQsS0FBSyxDQUFMLEVBQVFDLFdBQVIsT0FBMEIsT0FBOUIsRUFBdUM7O0FBRXZDekQsZ0JBQVlaLGlCQUFaLENBQThCLEtBQUtXLE1BQW5DLEVBQTJDLEtBQUtvRSxRQUFoRDtBQUNBLFNBQUtDLFVBQUw7QUFDRCxHQVREOztBQVdBLE1BQUlDLG1DQUFtQ3ZCLGlCQUFpQnJGLFNBQWpCLENBQTJCNkcsYUFBbEU7QUFDQXhCLG1CQUFpQnJGLFNBQWpCLENBQTJCNkcsYUFBM0IsR0FBMkMsVUFBU2YsT0FBVCxFQUFrQkMsSUFBbEIsRUFBd0I7QUFDakVhLHFDQUFpQ25ILElBQWpDLENBQXNDLElBQXRDLEVBQTRDcUcsT0FBNUMsRUFBcURDLElBQXJEOztBQUVBLFNBQUtGLGlCQUFMLENBQXVCQyxPQUF2QixFQUFnQ0MsSUFBaEM7QUFDQSxTQUFLVSxrQkFBTCxDQUF3QlgsT0FBeEIsRUFBaUNDLElBQWpDO0FBQ0QsR0FMRDtBQU1ELENBdmFELEVBdWFHcEcsa0JBdmFIOztBQXlhQXZCLFNBQVN1QixrQkFBVCxHQUE4QixHQUE5QixDOzs7Ozs7Ozs7Ozs7Ozs7QUMzYkE7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJtSCxhO0FBRW5CLHlCQUFZbkssTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLb0ssT0FBTCxHQUFlLEVBQWY7QUFDRDs7OzswQ0FFcUI7QUFDcEIsVUFBSUMsVUFBVSxJQUFkOztBQUdBLFdBQUtySyxNQUFMLENBQVlzSyxTQUFaLEdBQXdCLFVBQVVDLFFBQVYsRUFBb0I7QUFDMUMsWUFBSSxDQUFDMUUsYUFBYTJFLGFBQWQsSUFBK0IsQ0FBQzNFLGFBQWFDLE1BQWIsQ0FBb0JJLFVBQXhELEVBQW9FOztBQUVwRSxZQUFNdUUsT0FBT0YsU0FBU25HLElBQXRCO0FBQ0EsWUFBTXNHLFVBQVU5SixLQUFLNkIsS0FBTCxDQUFXZ0ksSUFBWCxDQUFoQjtBQUNBcEssZ0JBQVFzSyxHQUFSLENBQVksY0FBWixFQUE0QkYsSUFBNUI7O0FBRUEsWUFBSUcsU0FBUzdCLFNBQVMyQixRQUFRLENBQVIsQ0FBVCxDQUFiO0FBQ0EsWUFBSUcsV0FBVzlCLFNBQVMyQixRQUFRLENBQVIsQ0FBVCxDQUFmOztBQUVBLFlBQUdHLGFBQWEzSyxPQUFPWSxPQUF2QixFQUFnQztBQUM5QjtBQUNEOztBQUVELFlBQUksRUFBRStKLFlBQVlSLFFBQVFELE9BQXRCLENBQUosRUFBb0M7QUFDbENDLGtCQUFRRCxPQUFSLENBQWdCUyxRQUFoQixJQUE0Qiw0QkFBa0JBLFFBQWxCLENBQTVCO0FBQ0Q7QUFDRCxZQUFJNUssU0FBU29LLFFBQVFELE9BQVIsQ0FBZ0JTLFFBQWhCLENBQWI7O0FBRUEsWUFBSUQsV0FBVyxnQkFBTWxNLFFBQU4sQ0FBZUcsS0FBOUIsRUFBcUMsQ0FHcEMsQ0FIRCxNQUdPLElBQUcrTCxXQUFXLGdCQUFNbE0sUUFBTixDQUFlSSxPQUE3QixFQUFzQztBQUMzQ3VCLGtCQUFRc0ssR0FBUixDQUFZLDBCQUFaO0FBQ0ExSyxpQkFBTzZLLFdBQVA7QUFDRCxTQUhNLE1BR0EsSUFBSUYsV0FBVyxnQkFBTWxNLFFBQU4sQ0FBZUssSUFBOUIsRUFBb0M7QUFDekM7QUFDQSxjQUFJa0IsT0FBT1YsT0FBUCxLQUFtQixJQUFuQixJQUEyQlUsT0FBT1QsS0FBUCxLQUFpQm9JLFNBQVN0QyxPQUFULENBQWlCckYsT0FBT1YsT0FBeEIsQ0FBaEQsRUFBa0Y7QUFDaEZjLG9CQUFRc0ssR0FBUixDQUFZLHdCQUFaO0FBQ0ExSyxtQkFBTzhLLFdBQVAsQ0FBbUI7QUFDakJ0TCxpQkFBR2lMLFFBQVEsQ0FBUixDQURjO0FBRWpCaEwsaUJBQUdnTCxRQUFRLENBQVIsQ0FGYztBQUdqQi9LLDhCQUFnQitLLFFBQVEsQ0FBUixDQUhDO0FBSWpCOUssNkJBQWU4SyxRQUFRLENBQVIsQ0FKRTtBQUtqQjdLLHlCQUFXNkssUUFBUSxDQUFSLENBTE07QUFNakI1Syx5QkFBVzRLLFFBQVEsQ0FBUixDQU5NO0FBT2pCM0ssNkJBQWUySyxRQUFRLENBQVI7QUFQRSxhQUFuQjtBQVNEOztBQUVEekssaUJBQU9PLFVBQVAsQ0FBa0I7QUFDaEJmLGVBQUdpTCxRQUFRLENBQVIsQ0FEYTtBQUVoQmhMLGVBQUdnTCxRQUFRLENBQVIsQ0FGYTtBQUdoQi9LLDRCQUFnQitLLFFBQVEsQ0FBUixDQUhBO0FBSWhCOUssMkJBQWU4SyxRQUFRLENBQVIsQ0FKQztBQUtoQjdLLHVCQUFXNkssUUFBUSxDQUFSLENBTEs7QUFNaEI1Syx1QkFBVzRLLFFBQVEsQ0FBUixDQU5LO0FBT2hCM0ssMkJBQWUySyxRQUFRLENBQVI7QUFQQyxXQUFsQjtBQVNEO0FBQ0YsT0FsREQ7O0FBcURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkQ7Ozs7OztrQkF6RmtCUCxhOzs7Ozs7Ozs7Ozs7Ozs7QUNIckI7Ozs7Ozs7Ozs7OztJQUVxQmEsYTs7O0FBRW5CLHlCQUFZMUwsRUFBWixFQUFnQjtBQUFBOztBQUFBLHlIQUNSQSxFQURRO0FBRWY7Ozs7Z0NBRVdpQixNLEVBQVE7QUFDbEIsV0FBS2QsQ0FBTCxHQUFTYyxPQUFPZCxDQUFoQjtBQUNBLFdBQUtDLENBQUwsR0FBU2EsT0FBT2IsQ0FBaEI7QUFDQSxXQUFLQyxjQUFMLEdBQXNCWSxPQUFPWixjQUE3QjtBQUNBLFdBQUtDLGFBQUwsR0FBcUJXLE9BQU9YLGFBQTVCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQlUsT0FBT1YsU0FBeEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCUyxPQUFPVCxTQUF4QjtBQUNBLFdBQUtDLGFBQUwsR0FBcUJRLE9BQU9SLGFBQTVCOztBQUVBLFVBQUlzRixRQUFRdUMsU0FBU3RDLE9BQVQsQ0FBaUJDLE1BQTdCOztBQUVBLFVBQUkwRixjQUFjO0FBQ2hCLGNBQU0sS0FBSzNMLEVBREs7QUFFaEIsZ0JBQVEsZ0JBRlE7QUFHaEIsZ0JBQVEsRUFIUTtBQUloQixpQkFBUyxDQUNQO0FBQ0Usd0JBQWM7QUFDWix1QkFBVyxDQURDO0FBRVosMEJBQWMsS0FGRjtBQUdaLHNCQUFVLENBSEU7QUFJWix5QkFBYSxLQUpEO0FBS1osNEJBQWdCLEdBTEo7QUFNWiwrQkFBbUIsS0FOUDtBQU9aLHlCQUFhLENBUEQ7QUFRWiw0QkFBZ0IsS0FSSjtBQVNaLHlCQUFhLENBVEQ7QUFVWiw0QkFBZ0IsS0FWSjtBQVdaLDBCQUFjLENBWEY7QUFZWiw2QkFBaUIsS0FaTDtBQWFaLDZCQUFpQjtBQWJMLFdBRGhCO0FBZ0JFLDBCQUFnQixLQWhCbEI7QUFpQkUsbUJBQVM7QUFDUCxzQkFBVSxDQURIO0FBRVAsNkJBQWlCLEtBQUtNLGFBRmY7QUFHUCx5QkFBYSxLQUFLQyxTQUhYO0FBSVAsdUJBQVcsQ0FKSjtBQUtQLDhCQUFrQixLQUFLRjtBQUxoQixXQWpCWDtBQXdCRSxrQkFBUSxDQUNOO0FBQ0Usb0JBQVEsQ0FEVjtBQUVFLHNCQUFVLENBRlo7QUFHRSwwQkFBYztBQUhoQixXQURNLENBeEJWO0FBK0JFLDJCQUFpQixLQUFLSSxhQS9CeEI7QUFnQ0UsdUJBQWE7QUFDWCxvQkFBUSxDQUNOO0FBQ0Usc0JBQVEsQ0FEVjtBQUVFLDRCQUFjO0FBRmhCLGFBRE0sQ0FERztBQU9YLHNCQUFVLElBUEM7QUFRWCx5QkFBYSxLQVJGO0FBU1gsb0JBQVE7QUFURyxXQWhDZjtBQTJDRSx1QkFBYSxLQUFLRCxTQTNDcEI7QUE0Q0Usc0JBQVksQ0E1Q2Q7QUE2Q0UsMEJBQWdCLENBN0NsQjtBQThDRSx1QkFBYSxLQTlDZjtBQStDRSxxQkFBVyxJQS9DYjtBQWdERSxxQkFBVyxDQWhEYjtBQWlERSx1QkFBYTtBQWpEZixTQURPLENBSk87QUF5RGhCLGFBQUssS0FBS0wsQ0F6RE07QUEwRGhCLGFBQUssS0FBS0M7QUExRE0sT0FBbEI7O0FBNkRBLFVBQUl3TCxVQUFVdEQsU0FBU3BDLFFBQVQsQ0FBa0J5RixXQUFsQixFQUErQixJQUEvQixFQUFxQzVGLEtBQXJDLENBQWQ7O0FBRUEsV0FBSzlGLE9BQUwsR0FBZThGLEtBQWY7QUFDQSxXQUFLN0YsS0FBTCxHQUFhMEwsT0FBYjtBQUNEOzs7a0NBRWE7QUFDWnRGLGtCQUFZWixpQkFBWixDQUE4QjRDLFNBQVNqQyxNQUF2QyxFQUErQyxLQUFLcEcsT0FBcEQ7O0FBRUEsVUFBRyxLQUFLQSxPQUFMLElBQWdCcUksU0FBU3RDLE9BQTVCLEVBQXFDO0FBQ25Dc0MsaUJBQVN1RCxVQUFULENBQW9CLEtBQUs1TCxPQUF6QjtBQUNEOztBQUVELFdBQUtBLE9BQUwsR0FBZSxJQUFmO0FBQ0EsV0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDRDs7OytCQUVVZSxNLEVBQVE7QUFDakIsV0FBS2QsQ0FBTCxHQUFTYyxPQUFPZCxDQUFoQjtBQUNBLFdBQUtDLENBQUwsR0FBU2EsT0FBT2IsQ0FBaEI7QUFDQSxXQUFLQyxjQUFMLEdBQXNCWSxPQUFPWixjQUE3QjtBQUNBLFdBQUtDLGFBQUwsR0FBcUJXLE9BQU9YLGFBQTVCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQlUsT0FBT1YsU0FBeEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCUyxPQUFPVCxTQUF4QjtBQUNBLFdBQUtDLGFBQUwsR0FBcUJRLE9BQU9SLGFBQTVCOztBQUVBLFdBQUtQLEtBQUwsQ0FBVzRMLGdCQUFYLENBQTRCLEtBQUtyTCxhQUFqQztBQUNBLFdBQUtQLEtBQUwsQ0FBVzZMLFlBQVgsQ0FBd0IsS0FBS3ZMLFNBQTdCO0FBQ0EsV0FBS04sS0FBTCxDQUFXOEwsWUFBWCxDQUF3QixLQUFLekwsU0FBN0I7QUFDQSxXQUFLTCxLQUFMLENBQVcrTCxXQUFYLENBQXVCLEtBQUs5TCxDQUE1QixFQUErQixLQUFLQyxDQUFwQztBQUNBLFdBQUtGLEtBQUwsQ0FBV2dNLFFBQVgsQ0FBb0IsS0FBSzVMLGFBQXpCLEVBQXdDLEtBQUtELGNBQTdDO0FBQ0Q7Ozs7OztrQkE3R2tCcUwsYTs7Ozs7Ozs7O0FDRnJCOzs7Ozs7QUFNQVMsWUFBWXBJLFNBQVosQ0FBc0JxSSxXQUF0QixHQUFvQyxZQUFZO0FBQzlDLE1BQUksQ0FBQyxLQUFLQyxRQUFMLEVBQUQsSUFBb0IsS0FBS0MsT0FBTCxFQUF4QixFQUF3QztBQUN0QyxRQUFJL0wsWUFBWSxLQUFLZ00saUJBQUwsRUFBaEI7QUFDQSxRQUFJaE0sWUFBWSxDQUFoQixFQUFtQjtBQUNqQmlNLGdCQUFVQyxnQkFBVjtBQUNELEtBRkQsTUFFTyxJQUFJRCxVQUFVRSxrQkFBVixFQUFKLEVBQW9DO0FBQ3pDLFVBQUl2TSxJQUFJcU0sVUFBVUcsWUFBVixFQUFSO0FBQ0EsVUFBSXZNLElBQUlvTSxVQUFVSSxZQUFWLEVBQVI7QUFDQXJNLGtCQUFZLEtBQUtzTSxlQUFMLENBQXFCMU0sQ0FBckIsRUFBd0JDLENBQXhCLENBQVo7QUFDRDtBQUNELFFBQUlHLFlBQVksQ0FBaEIsRUFBbUI7QUFDakJLLGFBQU9rTSxhQUFQLENBQXFCLElBQUlDLFdBQUosQ0FBZ0Isb0NBQWhCLEVBQXNEO0FBQ3pFOUwsZ0JBQVE7QUFDTmQsYUFBRyxLQUFLQSxDQURGO0FBRU5DLGFBQUcsS0FBS0EsQ0FGRjtBQUdORyxxQkFBV0EsU0FITDtBQUlOQyxxQkFBVyxLQUFLd00sYUFBTCxFQUpMO0FBS052TSx5QkFBZSxLQUFLQSxhQUFMLEVBTFQ7QUFNTkgseUJBQWUsS0FBSzJNLGNBTmQ7QUFPTjVNLDBCQUFnQixLQUFLNk07QUFQZjtBQURpRSxPQUF0RCxDQUFyQjs7QUFZQSxXQUFLQyxXQUFMLENBQWlCNU0sU0FBakI7O0FBRUFLLGFBQU9rTSxhQUFQLENBQXFCLElBQUlDLFdBQUosQ0FBZ0IsbUNBQWhCLEVBQXFEO0FBQ3hFOUwsZ0JBQVE7QUFDTmQsYUFBRyxLQUFLQSxDQURGO0FBRU5DLGFBQUcsS0FBS0EsQ0FGRjtBQUdORyxxQkFBV0EsU0FITDtBQUlOQyxxQkFBVyxLQUFLd00sYUFBTCxFQUpMO0FBS052TSx5QkFBZSxLQUFLQSxhQUFMLEVBTFQ7QUFNTkgseUJBQWUsS0FBSzJNLGNBTmQ7QUFPTjVNLDBCQUFnQixLQUFLNk07QUFQZjtBQURnRSxPQUFyRCxDQUFyQjtBQVdEO0FBQ0Y7QUFDRixDQXRDRDs7QUF3Q0FmLFlBQVlwSSxTQUFaLENBQXNCcUosT0FBdEIsR0FBZ0MsWUFBVztBQUN6QyxNQUFJQyxRQUFRQyxXQUFXQyxNQUFYLEVBQVo7QUFDQSxNQUFJak4sZ0JBQWdCK00sUUFBUUEsTUFBTS9NLGFBQU4sRUFBUixHQUFnQyxFQUFwRDtBQUNBLE1BQUlELGlCQUFpQmdOLFFBQVFBLE1BQU1oTixjQUFOLEVBQVIsR0FBaUMsQ0FBdEQ7QUFDQSxPQUFLNkwsUUFBTCxDQUFjNUwsYUFBZCxFQUE2QkQsY0FBN0I7QUFDQSxPQUFLbU4sVUFBTCxDQUFnQkosT0FBaEI7O0FBRUF4TSxTQUFPa00sYUFBUCxDQUFxQixJQUFJQyxXQUFKLENBQWdCLHFCQUFoQixFQUF1QztBQUMxRDlMLFlBQVE7QUFDTlgscUJBQWVBLGFBRFQ7QUFFTkQsc0JBQWdCQTtBQUZWO0FBRGtELEdBQXZDLENBQXJCO0FBTUQsQ0FiRCxDOzs7Ozs7Ozs7QUM5Q0FvRyxVQUFVMUMsU0FBVixDQUFvQjBKLG9CQUFwQixHQUEyQyxZQUFXO0FBQ3BELE1BQUluRCxZQUFZb0QsY0FBWixFQUFKLEVBQWtDO0FBQ2hDbkgsaUJBQWFvSCxJQUFiLENBQWtCbEgsU0FBbEI7QUFHRDtBQUNGLENBTkQ7O0FBUUFBLFVBQVUxQyxTQUFWLENBQW9CRSxNQUFwQixHQUE2QixZQUFXO0FBQ3RDMkosYUFBVzdKLFNBQVgsQ0FBcUJFLE1BQXJCLENBQTRCVCxJQUE1QixDQUFpQyxJQUFqQztBQUNBLE9BQUtxSyxTQUFMLEdBQWlCdkQsWUFBWW9ELGNBQVosRUFBakI7QUFDQSxNQUFJckosUUFBUSxLQUFLd0osU0FBTCxHQUFpQnZELFlBQVl3RCxRQUFaLEVBQWpCLEdBQTBDeEYsU0FBU2pFLEtBQVQsRUFBdEQ7QUFDQWhCLGNBQVkwSyxXQUFaLENBQXdCMUosS0FBeEI7O0FBRUF6RCxTQUFPa00sYUFBUCxDQUFxQixJQUFJQyxXQUFKLENBQWdCLGtCQUFoQixFQUFvQztBQUN2RDlMLFlBQVE7QUFDTkcsY0FBUWlEO0FBREY7QUFEK0MsR0FBcEMsQ0FBckI7QUFLRCxDQVhEOztBQWFBb0MsVUFBVTFDLFNBQVYsQ0FBb0JpSyxJQUFwQixHQUEyQixZQUFXO0FBQ3BDcE4sU0FBT2tNLGFBQVAsQ0FBcUIsSUFBSUMsV0FBSixDQUFnQixnQkFBaEIsRUFBa0M7QUFDckQ5TCxZQUFRO0FBQ05HLGNBQVFrSCxTQUFTakUsS0FBVDtBQURGO0FBRDZDLEdBQWxDLENBQXJCOztBQU1BdUosYUFBVzdKLFNBQVgsQ0FBcUJpSyxJQUFyQixDQUEwQnhLLElBQTFCLENBQStCLElBQS9CO0FBQ0E4RyxjQUFZMkQsVUFBWjtBQUNBLE9BQUtDLGNBQUwsQ0FBb0JDLEtBQXBCO0FBQ0EsTUFBSSxLQUFLQyxnQkFBTCxFQUFKLEVBQTZCO0FBQzNCLFNBQUtDLFlBQUwsQ0FBa0IsS0FBS0MsYUFBTCxFQUFsQixFQUF3QyxLQUF4QztBQUNELEdBRkQsTUFFTyxJQUFJL0gsYUFBYWdJLFdBQWIsQ0FBeUI5SCxTQUF6QixDQUFKLEVBQXlDO0FBQzlDLFNBQUsrSCxrQkFBTDtBQUNELEdBRk0sTUFFQSxJQUFJakksYUFBYWdJLFdBQWIsQ0FBeUJFLFlBQXpCLENBQUosRUFBNEM7QUFDakQsU0FBS0MsWUFBTDtBQUNEO0FBQ0YsQ0FqQkQsQyIsImZpbGUiOiJCaWZyb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2RkYzA0NmEzYmQyZDY4N2NhMDQiLCJsZXQgVHlwZXMgPSB7XHJcbiAgTWVzc2FnZXM6IHtcclxuICAgIENPTk5FQ1Q6IDAsXHJcbiAgICBNQVBfRU5URVI6IDEsXHJcbiAgICBTUEFXTjogMixcclxuICAgIERFU1BBV046IDMsXHJcbiAgICBNT1ZFOiA0LFxyXG4gIH0sXHJcblxyXG4gIE9yaWVudGF0aW9uczoge1xyXG4gICAgVVA6IDgsXHJcbiAgICBET1dOOiAyLFxyXG4gICAgTEVGVDogNCxcclxuICAgIFJJR0hUOiA2XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHlwZXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3R5cGVzLmpzIiwiaW1wb3J0IFR5cGVzIGZyb20gXCIuLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoaWQpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuZXZlbnRJZCA9IG51bGw7XHJcbiAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuXHJcbiAgICB0aGlzLmNoYXJhY3RlckluZGV4ID0gMDtcclxuICAgIHRoaXMuY2hhcmFjdGVyTmFtZSA9IG51bGw7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IDA7XHJcbiAgICB0aGlzLm1vdmVTcGVlZCA9IDA7XHJcbiAgICB0aGlzLm1vdmVGcmVxdWVuY3kgPSAwO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJHYW1lSG9va3Moc29ja2V0KSB7XHJcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcclxuXHJcbiAgICBsZXQgcGxheWVyID0gdGhpcztcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdHYW1lX1BsYXllci5yZWZyZXNoJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgY29uc29sZS5pbmZvKCdHYW1lX1BsYXllci5yZWZyZXNoJywgZS5kZXRhaWwpO1xyXG4gICAgICBwbGF5ZXIuY2hhcmFjdGVySW5kZXggPSBlLmRldGFpbC5jaGFyYWN0ZXJJbmRleDtcclxuICAgICAgcGxheWVyLmNoYXJhY3Rlck5hbWUgPSBlLmRldGFpbC5jaGFyYWN0ZXJOYW1lO1xyXG4gICAgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignR2FtZV9QbGF5ZXIubW92ZUJ5SW5wdXQuYmVmb3JlTW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbygnR2FtZV9QbGF5ZXIubW92ZUJ5SW5wdXQuYmVmb3JlTW92ZScsIGUuZGV0YWlsKTtcclxuICAgIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0dhbWVfUGxheWVyLm1vdmVCeUlucHV0LmFmdGVyTW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbygnR2FtZV9QbGF5ZXIubW92ZUJ5SW5wdXQuYWZ0ZXJNb3ZlJywgZS5kZXRhaWwpO1xyXG4gICAgICBwbGF5ZXIuaGFuZGxlTW92ZShlLmRldGFpbCk7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdTY2VuZV9NYXAuY3JlYXRlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgY29uc29sZS5pbmZvKCdTY2VuZV9NYXAuY3JlYXRlJywgZS5kZXRhaWwpO1xyXG4gICAgICBwbGF5ZXIuaGFuZGxlTWFwQ2hhbmdlKGUuZGV0YWlsLm1hcF9pZCk7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdTY2VuZV9NYXAuc3RvcCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbygnU2NlbmVfTWFwLnN0b3AnLCBlLmRldGFpbCk7XHJcbiAgICAgIC8vcGxheWVyLmhhbmRsZU1hcENoYW5nZShlLmRldGFpbC5tYXBfaWQpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZU1hcENoYW5nZShtYXBfaWQpIHtcclxuICAgIHRoaXMuc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICBUeXBlcy5NZXNzYWdlcy5TUEFXTixcclxuICAgICAgbWFwX2lkLFxyXG4gICAgICB0aGlzLngsXHJcbiAgICAgIHRoaXMueSxcclxuICAgICAgdGhpcy5jaGFyYWN0ZXJJbmRleCxcclxuICAgICAgdGhpcy5jaGFyYWN0ZXJOYW1lLFxyXG4gICAgICB0aGlzLmRpcmVjdGlvbixcclxuICAgICAgdGhpcy5tb3ZlU3BlZWQsXHJcbiAgICAgIHRoaXMubW92ZUZyZXF1ZW5jeVxyXG4gICAgXSkpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlTW92ZShkZXRhaWwpIHtcclxuICAgIHRoaXMueCA9IGRldGFpbC54O1xyXG4gICAgdGhpcy55ID0gZGV0YWlsLnk7XHJcbiAgICB0aGlzLmNoYXJhY3RlckluZGV4ID0gZGV0YWlsLmNoYXJhY3RlckluZGV4O1xyXG4gICAgdGhpcy5jaGFyYWN0ZXJOYW1lID0gZGV0YWlsLmNoYXJhY3Rlck5hbWU7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRldGFpbC5kaXJlY3Rpb247XHJcbiAgICB0aGlzLm1vdmVTcGVlZCA9IGRldGFpbC5tb3ZlU3BlZWQ7XHJcbiAgICB0aGlzLm1vdmVGcmVxdWVuY3kgPSBkZXRhaWwubW92ZUZyZXF1ZW5jeTtcclxuXHJcbiAgICB0aGlzLnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgVHlwZXMuTWVzc2FnZXMuTU9WRSxcclxuICAgICAgdGhpcy54LFxyXG4gICAgICB0aGlzLnksXHJcbiAgICAgIHRoaXMuY2hhcmFjdGVySW5kZXgsXHJcbiAgICAgIHRoaXMuY2hhcmFjdGVyTmFtZSxcclxuICAgICAgdGhpcy5kaXJlY3Rpb24sXHJcbiAgICAgIHRoaXMubW92ZVNwZWVkLFxyXG4gICAgICB0aGlzLm1vdmVGcmVxdWVuY3ksXHJcbiAgICBdKSk7XHJcbiAgfVxyXG5cclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgIHg6IHRoaXMueCxcclxuICAgICAgeTogdGhpcy55LFxyXG4gICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxyXG4gICAgICBtb3ZlU3BlZWQ6IHRoaXMubW92ZVNwZWVkLFxyXG4gICAgICBtb3ZlRnJlcXVlbmN5OiB0aGlzLm1vdmVGcmVxdWVuY3ksXHJcbiAgICAgIGNoYXJhY3Rlck5hbWU6IHRoaXMuY2hhcmFjdGVyTmFtZSxcclxuICAgICAgY2hhcmFjdGVySW5kZXg6IHRoaXMuY2hhcmFjdGVySW5kZXhcclxuICAgIH1cclxuICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dhbWUvUGxheWVyLmpzIiwiLyo6XHJcbiAqIEBwbHVnaW5kZXNjIEJpZnJvc3QgLSBDb25uZWN0cyB3aXRoIEhlaW1kYWxsIHRvIHByb3ZpZGUgTU1PIGZlYXR1cmVzIHRvIE1WIGdhbWVzXHJcbiAqIEBhdXRob3IgY2xvbmUxMDE4ICAgICAgIFxyXG4gKi9cclxudmFyIEdBTUVfSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwKTtcclxud2luZG93LkdBTUVfSUQgPSBHQU1FX0lEO1xyXG5cclxuaW1wb3J0IFwiLi9MaWIvT3JhbmdlQ3VzdG9tRXZlbnRzXCI7XHJcblxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL0dhbWUvUGxheWVyXCI7XHJcbmltcG9ydCBQbGF5ZXJNYW5hZ2VyIGZyb20gXCIuL0dhbWUvUGxheWVyTWFuYWdlclwiO1xyXG5pbXBvcnQgVHlwZXMgZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCBcIi4vRXZlbnRzL0dhbWVfUGxheWVyXCI7XHJcbmltcG9ydCBcIi4vRXZlbnRzL1NjZW5lX01hcFwiO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgcGFyYW1ldGVycyA9IFBsdWdpbk1hbmFnZXIucGFyYW1ldGVycygnQmlmcm9zdCcpO1xyXG5cclxuICB2YXIgc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzOi8vMTI3LjAuMC4xOjgxMDFcIik7XHJcbiAgc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoW1R5cGVzLk1lc3NhZ2VzLkNPTk5FQ1QsIEdBTUVfSURdKSk7XHJcbiAgfTtcclxuXHJcbiAgbGV0IHBsYXllck1hbmFnZXIgPSBuZXcgUGxheWVyTWFuYWdlcihzb2NrZXQpO1xyXG4gIHBsYXllck1hbmFnZXIucmVnaXN0ZXJTZXJ2ZXJIb29rcygpO1xyXG5cclxuICBsZXQgcGxheWVyID0gbmV3IFBsYXllcihHQU1FX0lEKTtcclxuICBwbGF5ZXIucmVnaXN0ZXJHYW1lSG9va3Moc29ja2V0KTtcclxuXHJcbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJ2YXIgSW1wb3J0ZWQgPSBJbXBvcnRlZCB8fCB7fTtcblxuaWYgKEltcG9ydGVkLk1WQ29tbW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gIHZhciBNVkNvbW1vbnMgPSB7fTtcblxuICAoZnVuY3Rpb24oJCl7IFxuICAgICQuYWpheExvYWRGaWxlQXN5bmMgPSBmdW5jdGlvbihmaWxlUGF0aCwgbWltZVR5cGUsIG9uTG9hZCwgb25FcnJvcil7IG1pbWVUeXBlID0gbWltZVR5cGUgfHwgXCJhcHBsaWNhdGlvbi9qc29uXCI7IHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgdmFyIG5hbWUgPSAnJCcgKyBmaWxlUGF0aC5yZXBsYWNlKC9eLiooXFxcXHxcXC98XFw6KS8sICcnKS5yZXBsYWNlKC9cXC4uKi8sICcnKTsgeGhyLm9wZW4oJ0dFVCcsIGZpbGVQYXRoKTsgaWYgKG1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlKSB7IHhoci5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlKTsgfSBpZihvbkxvYWQgPT09IHVuZGVmaW5lZCl7IG9uTG9hZCA9IGZ1bmN0aW9uKHhociwgZmlsZVBhdGgsIG5hbWUpIHsgaWYgKHhoci5zdGF0dXMgPCA0MDApIHsgd2luZG93W25hbWVdID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTsgRGF0YU1hbmFnZXIub25Mb2FkKHdpbmRvd1tuYW1lXSk7IH0gfTsgfSBpZihvbkVycm9yID09PSB1bmRlZmluZWQpIHsgb25FcnJvciA9IGZ1bmN0aW9uKCkgeyBEYXRhTWFuYWdlci5fZXJyb3JVcmwgPSBEYXRhTWFuYWdlci5fZXJyb3JVcmwgfHwgZmlsZVBhdGg7IH07IH0geGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyBvbkxvYWQuY2FsbCh0aGlzLCB4aHIsIGZpbGVQYXRoLCBuYW1lKTsgfTsgeGhyLm9uZXJyb3IgPSBvbkVycm9yOyB3aW5kb3dbbmFtZV0gPSBudWxsOyB4aHIuc2VuZCgpOyB9O1xuICB9KShNVkNvbW1vbnMpO1xufVxuXG52YXIgT3JhbmdlQ3VzdG9tRXZlbnRzID0gT3JhbmdlQ3VzdG9tRXZlbnRzIHx8IHt9O1xuXG5mdW5jdGlvbiBHYW1lX0N1c3RvbV9FdmVudCgpIHtcbiAgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5HYW1lX0N1c3RvbV9FdmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdhbWVfRXZlbnQucHJvdG90eXBlKTtcbkdhbWVfQ3VzdG9tX0V2ZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdhbWVfQ3VzdG9tX0V2ZW50O1xuXG4oZnVuY3Rpb24oJCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0uXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAgLy8gUFJPVEVDVEVEIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcblxuICAkLmdldEFub3RoZXJNYXBEYXRhID0gZnVuY3Rpb24obWFwSWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHZhcmlhYmxlTmFtZSA9ICckTWFwJTEnLmZvcm1hdChtYXBJZC5wYWRaZXJvKDMpKTtcbiAgICB2YXIgZmlsZW5hbWUgPSAnZGF0YS9NYXAlMS5qc29uJy5mb3JtYXQobWFwSWQucGFkWmVybygzKSk7XG5cbiAgICB2YXIgb25Mb2FkID0gZnVuY3Rpb24oeGhyLCBmaWxlUGF0aCwgbmFtZSkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgd2luZG93W25hbWVdID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgRGF0YU1hbmFnZXIub25Mb2FkKHdpbmRvd1tuYW1lXSk7XG5cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHdpbmRvd1t2YXJpYWJsZU5hbWVdID09PSB1bmRlZmluZWQgfHwgd2luZG93W3ZhcmlhYmxlTmFtZV0gPT09IG51bGwpIHtcbiAgICAgIE1WQ29tbW9ucy5hamF4TG9hZEZpbGVBc3luYyhmaWxlbmFtZSwgdW5kZWZpbmVkLCBvbkxvYWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfTtcblxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICAvLyBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHYW1lX0N1c3RvbV9FdmVudFxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgR2FtZV9DdXN0b21fRXZlbnQucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbihtYXBJZCwgZXZlbnRJZCwgZXZlbnREYXRhKSB7XG4gICAgdGhpcy5fZXZlbnREYXRhID0gZXZlbnREYXRhO1xuICAgIEdhbWVfRXZlbnQucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBtYXBJZCwgZXZlbnRJZCk7XG4gIH07XG5cbiAgR2FtZV9DdXN0b21fRXZlbnQucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50RGF0YTtcbiAgfTtcblxuICBHYW1lX0N1c3RvbV9FdmVudC5wcm90b3R5cGUucmV2aXZlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHJldHVybiBuZXcgR2FtZV9DdXN0b21fRXZlbnQoZGF0YS5tYXBJZCwgZGF0YS5pZCwgZGF0YS5ldmVudERhdGEpO1xuICB9O1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHYW1lX1N5c3RlbVxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgR2FtZV9TeXN0ZW0ucHJvdG90eXBlLmNsZWFyU2VsZlN3aXRjaGVzID0gZnVuY3Rpb24obWFwSWQsIGV2ZW50SWQpIHtcbiAgICB2YXIgc3dpdGNoZXMgPSBbXCJBXCIsIFwiQlwiLCBcIkNcIiwgXCJEXCJdO1xuXG4gICAgc3dpdGNoZXMuZm9yRWFjaChmdW5jdGlvbihzd2l0Y2hJZCkge1xuICAgICAgdmFyIGtleSA9IFttYXBJZCwgZXZlbnRJZCwgc3dpdGNoSWRdO1xuICAgICAgJGdhbWVTZWxmU3dpdGNoZXMuc2V0VmFsdWUoa2V5LCBmYWxzZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgR2FtZV9TeXN0ZW0ucHJvdG90eXBlLmluaXRDdXN0b21FdmVudHMgPSBmdW5jdGlvbihtYXBJZCkge1xuICAgIGlmICh0aGlzLl9jdXN0b21FdmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fY3VzdG9tRXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2N1c3RvbUV2ZW50c1ttYXBJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fY3VzdG9tRXZlbnRzW21hcElkXSA9IHt9O1xuICAgIH1cbiAgfTtcblxuICBHYW1lX1N5c3RlbS5wcm90b3R5cGUuYWRkQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbihtYXBJZCwgZXZlbnQpIHtcbiAgICB0aGlzLmluaXRDdXN0b21FdmVudHMobWFwSWQpO1xuICAgIHRoaXMuY2xlYXJTZWxmU3dpdGNoZXMobWFwSWQsIGV2ZW50LmlkKTtcbiAgICB0aGlzLl9jdXN0b21FdmVudHNbbWFwSWRdW2V2ZW50LmlkXSA9IGV2ZW50O1xuXG4gICAgcmV0dXJuIGV2ZW50O1xuICB9O1xuXG4gIEdhbWVfU3lzdGVtLnByb3RvdHlwZS5yZW1vdmVDdXN0b21FdmVudCA9IGZ1bmN0aW9uKG1hcElkLCBldmVudElkKSB7XG4gICAgdGhpcy5pbml0Q3VzdG9tRXZlbnRzKG1hcElkKTtcbiAgICB0aGlzLmNsZWFyU2VsZlN3aXRjaGVzKG1hcElkLCBldmVudElkKTtcbiAgICBkZWxldGUgdGhpcy5fY3VzdG9tRXZlbnRzW21hcElkXVtldmVudElkXTtcbiAgfTtcblxuICBHYW1lX1N5c3RlbS5wcm90b3R5cGUuY2xlYXJDdXN0b21FdmVudHMgPSBmdW5jdGlvbihtYXBJZCkge1xuICAgIHRoaXMuaW5pdEN1c3RvbUV2ZW50cygpO1xuICAgIHRoaXMuX2N1c3RvbUV2ZW50c1ttYXBJZF0gPSB7fTtcbiAgfTtcblxuICBHYW1lX1N5c3RlbS5wcm90b3R5cGUuZ2V0Q3VzdG9tRXZlbnRzID0gZnVuY3Rpb24obWFwSWQpIHtcbiAgICB0aGlzLmluaXRDdXN0b21FdmVudHMoKTtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tRXZlbnRzW21hcElkXTtcbiAgfTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2FtZV9NYXBcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIEdhbWVfTWFwLnByb3RvdHlwZS5nZXRJbmRleEZvck5ld0V2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluZGV4ID0gMTtcbiAgICB3aGlsZSAoaW5kZXggPCB0aGlzLl9ldmVudHMubGVuZ3RoICYmICEhdGhpcy5fZXZlbnRzW2luZGV4XSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH07XG5cbiAgR2FtZV9NYXAucHJvdG90eXBlLmFkZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnREYXRhLCB0ZW1wb3JhcnksIGluZGV4KSB7XG4gICAgaWYgKHRlbXBvcmFyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0ZW1wb3JhcnkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5kZXggPSB0aGlzLmdldEluZGV4Rm9yTmV3RXZlbnQoKTtcbiAgICB9XG5cbiAgICBldmVudERhdGEuaWQgPSBpbmRleDtcbiAgICB2YXIgZ2FtZUV2ZW50ID0gbmV3IEdhbWVfQ3VzdG9tX0V2ZW50KHRoaXMuX21hcElkLCBpbmRleCwgZXZlbnREYXRhKTtcbiAgICAkZ2FtZVN5c3RlbS5jbGVhclNlbGZTd2l0Y2hlcyh0aGlzLl9tYXBJZCwgaW5kZXgpO1xuXG4gICAgdGhpcy5fZXZlbnRzW2luZGV4XSA9IGdhbWVFdmVudDtcblxuICAgIGlmIChTY2VuZU1hbmFnZXIuX3NjZW5lIGluc3RhbmNlb2YgU2NlbmVfTWFwKSB7XG4gICAgICB2YXIgc3ByaXRlID0gbmV3IFNwcml0ZV9DaGFyYWN0ZXIoZ2FtZUV2ZW50KTtcbiAgICAgIFNjZW5lTWFuYWdlci5fc2NlbmUuX3Nwcml0ZXNldC5fY2hhcmFjdGVyU3ByaXRlcy5wdXNoKHNwcml0ZSk7XG4gICAgICBTY2VuZU1hbmFnZXIuX3NjZW5lLl9zcHJpdGVzZXQuX3RpbGVtYXAuYWRkQ2hpbGQoc3ByaXRlKTtcbiAgICB9XG5cbiAgICBpZiAodGVtcG9yYXJ5ID09PSBmYWxzZSkge1xuICAgICAgJGdhbWVTeXN0ZW0uYWRkQ3VzdG9tRXZlbnQodGhpcy5fbWFwSWQsIGV2ZW50RGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdhbWVFdmVudDtcbiAgfTtcblxuICB2YXIgb2xkR2FtZU1hcF9zZXR1cEV2ZW50cyA9IEdhbWVfTWFwLnByb3RvdHlwZS5zZXR1cEV2ZW50cztcbiAgR2FtZV9NYXAucHJvdG90eXBlLnNldHVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgb2xkR2FtZU1hcF9zZXR1cEV2ZW50cy5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIGN1c3RvbUV2ZW50cyA9ICRnYW1lU3lzdGVtLmdldEN1c3RvbUV2ZW50cyh0aGlzLl9tYXBJZCk7XG4gICAgZm9yICh2YXIgZXZlbnRJZCBpbiBjdXN0b21FdmVudHMpIHtcbiAgICAgIGlmIChjdXN0b21FdmVudHNbZXZlbnRJZF0gPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICB2YXIgbmV3RXZlbnRJZCA9IHRoaXMuZ2V0SW5kZXhGb3JOZXdFdmVudCgpO1xuXG4gICAgICBjdXN0b21FdmVudHNbZXZlbnRJZF0uZXZlbnRJZCA9IG5ld0V2ZW50SWQ7XG4gICAgICB0aGlzLl9ldmVudHNbbmV3RXZlbnRJZF0gPSBuZXcgR2FtZV9DdXN0b21fRXZlbnQodGhpcy5fbWFwSWQsIG5ld0V2ZW50SWQsIGN1c3RvbUV2ZW50c1tldmVudElkXSk7XG4gICAgfVxuICB9O1xuXG4gIEdhbWVfTWFwLnByb3RvdHlwZS5hZGRFdmVudEF0ID0gZnVuY3Rpb24oZXZlbnREYXRhLCB4LCB5LCB0ZW1wb3JhcnksIGluZGV4KSB7XG4gICAgZXZlbnREYXRhLnggPSB4O1xuICAgIGV2ZW50RGF0YS55ID0geTtcbiAgICByZXR1cm4gdGhpcy5hZGRFdmVudChldmVudERhdGEsIHRlbXBvcmFyeSwgaW5kZXgpO1xuICB9O1xuXG4gIEdhbWVfTWFwLnByb3RvdHlwZS5zcGF3bkV2ZW50ID0gZnVuY3Rpb24oZXZlbnREYXRhLCB0aWxlTGlzdCwgdGVtcG9yYXJ5KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5ld0V2ZW50RGF0YSA9IEpzb25FeC5tYWtlRGVlcENvcHkoZXZlbnREYXRhKTtcbiAgICAgIG5ld0V2ZW50RGF0YS54ID0gdGlsZUxpc3RbaV0ueDtcbiAgICAgIG5ld0V2ZW50RGF0YS55ID0gdGlsZUxpc3RbaV0ueTtcbiAgICAgIHRoaXMuYWRkRXZlbnQobmV3RXZlbnREYXRhLCB0ZW1wb3JhcnkpO1xuICAgIH1cbiAgfTtcblxuICBHYW1lX01hcC5wcm90b3R5cGUuZ2V0RXZlbnREYXRhID0gZnVuY3Rpb24oZXZlbnRJZE9yaWdpbikge1xuICAgIHZhciBldmVudCA9ICRkYXRhTWFwLmV2ZW50c1tldmVudElkT3JpZ2luXTtcbiAgICBpZiAoZXZlbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBKc29uRXgubWFrZURlZXBDb3B5KGV2ZW50KTtcbiAgfTtcblxuICBHYW1lX01hcC5wcm90b3R5cGUuZ2V0RXZlbnREYXRhRnJvbSA9IGZ1bmN0aW9uKG1hcElkT3JpZ2luLCBldmVudElkT3JpZ2luLCBjYWxsYmFjaykge1xuICAgICQuZ2V0QW5vdGhlck1hcERhdGEobWFwSWRPcmlnaW4sIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9ICckTWFwJTEnLmZvcm1hdChtYXBJZE9yaWdpbi5wYWRaZXJvKDMpKTtcblxuICAgICAgaWYgKHdpbmRvd1t2YXJpYWJsZU5hbWVdID09PSB1bmRlZmluZWQgfHwgd2luZG93W3ZhcmlhYmxlTmFtZV0gPT09IG51bGwpIHJldHVybjtcblxuICAgICAgdmFyIGV2ZW50ID0gd2luZG93W3ZhcmlhYmxlTmFtZV0uZXZlbnRzW2V2ZW50SWRPcmlnaW5dO1xuICAgICAgaWYgKGV2ZW50ID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgdmFyIGV2ZW50RGF0YSA9IEpzb25FeC5tYWtlRGVlcENvcHkoZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50RGF0YS5ub3RlKSB7XG4gICAgICAgIERhdGFNYW5hZ2VyLmV4dHJhY3RNZXRhZGF0YShldmVudERhdGEpO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH0pOyAgICBcbiAgfTtcblxuICBHYW1lX01hcC5wcm90b3R5cGUuY29weUV2ZW50ID0gZnVuY3Rpb24oZXZlbnRJZE9yaWdpbiwgeCwgeSwgdGVtcG9yYXJ5LCBuZXdJbmRleCkge1xuICAgIHZhciBldmVudERhdGEgPSB0aGlzLmdldEV2ZW50RGF0YShldmVudElkT3JpZ2luKTtcbiAgICBpZiAoZXZlbnREYXRhKSB7XG4gICAgICAkZ2FtZU1hcC5hZGRFdmVudEF0KGV2ZW50RGF0YSwgeCwgeSwgdGVtcG9yYXJ5LCBuZXdJbmRleCk7XG4gICAgfVxuICB9O1xuXG4gIEdhbWVfTWFwLnByb3RvdHlwZS5nZXRSZWdpb25UaWxlTGlzdCA9IGZ1bmN0aW9uKHJlZ2lvbklkKSB7XG4gICAgdmFyIHRpbGVMaXN0ID0gW107XG5cbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8ICRnYW1lTWFwLndpZHRoKCk7IHgrKykge1xuICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCAkZ2FtZU1hcC5oZWlnaHQoKTsgeSsrKSB7XG4gICAgICAgIGlmICgkZ2FtZU1hcC5ldmVudHNYeSh4LCB5KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAoJGdhbWVNYXAucmVnaW9uSWQoeCwgeSkgPT0gcmVnaW9uSWQpIHtcbiAgICAgICAgICAgIHRpbGVMaXN0LnB1c2goe3ggOiB4LCB5IDogeX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aWxlTGlzdDtcbiAgfTtcblxuICBHYW1lX01hcC5wcm90b3R5cGUuZ2V0UmFuZG9tUmVnaW9uVGlsZSA9IGZ1bmN0aW9uKHJlZ2lvbklkKSB7XG4gICAgdmFyIHRpbGVMaXN0ID0gdGhpcy5nZXRSZWdpb25UaWxlTGlzdChyZWdpb25JZCk7XG5cbiAgICBpZiAodGlsZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGluZGV4ID0gTWF0aC5yYW5kb21JbnQodGlsZUxpc3QubGVuZ3RoKTtcbiAgICAgIHJldHVybiB0aWxlTGlzdFtpbmRleF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICBHYW1lX01hcC5wcm90b3R5cGUuY29weUV2ZW50VG9SZWdpb24gPSBmdW5jdGlvbihldmVudElkT3JpZ2luLCByZWdpb25JZCwgdGVtcG9yYXJ5LCBuZXdJbmRleCkge1xuICAgIHZhciB0aWxlID0gdGhpcy5nZXRSYW5kb21SZWdpb25UaWxlKHJlZ2lvbklkKTtcbiAgICBpZiAodGlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvcHlFdmVudChldmVudElkT3JpZ2luLCB0aWxlLngsIHRpbGUueSwgdGVtcG9yYXJ5LCBuZXdJbmRleCk7XG4gICAgfVxuICB9O1xuXG4gIEdhbWVfTWFwLnByb3RvdHlwZS5jb3B5RXZlbnRGcm9tID0gZnVuY3Rpb24obWFwSWRPcmlnaW4sIGV2ZW50SWRPcmlnaW4sIHgsIHksIHRlbXBvcmFyeSwgbmV3SW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5nZXRFdmVudERhdGFGcm9tKG1hcElkT3JpZ2luLCBldmVudElkT3JpZ2luLCBmdW5jdGlvbihldmVudERhdGEpIHtcbiAgICAgIHZhciBldmVudCA9ICRnYW1lTWFwLmFkZEV2ZW50QXQoZXZlbnREYXRhLCB4LCB5LCB0ZW1wb3JhcnksIG5ld0luZGV4KTtcblxuICAgICAgaWYgKCEhY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgR2FtZV9NYXAucHJvdG90eXBlLmNvcHlFdmVudEZyb21NYXBUb1JlZ2lvbiA9IGZ1bmN0aW9uKG1hcElkT3JpZ2luLCBldmVudElkT3JpZ2luLCByZWdpb25JZCwgdGVtcG9yYXJ5LCBuZXdJbmRleCwgY2FsbGJhY2spIHtcbiAgICB2YXIgdGlsZSA9IHRoaXMuZ2V0UmFuZG9tUmVnaW9uVGlsZShyZWdpb25JZCk7XG4gICAgaWYgKHRpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb3B5RXZlbnRGcm9tKG1hcElkT3JpZ2luLCBldmVudElkT3JpZ2luLCB0aWxlLngsIHRpbGUueSwgdGVtcG9yYXJ5LCBuZXdJbmRleCwgY2FsbGJhY2spO1xuICAgIH0gICAgXG4gIH07XG5cbiAgR2FtZV9NYXAucHJvdG90eXBlLnNwYXduTWFwRXZlbnQgPSBmdW5jdGlvbihldmVudElkT3JpZ2luLCByZWdpb25JZCwgdGVtcG9yYXJ5KSB7XG4gICAgdmFyIGV2ZW50RGF0YSA9IHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50SWRPcmlnaW4pO1xuICAgIHZhciB0aWxlTGlzdCA9IHRoaXMuZ2V0UmVnaW9uVGlsZUxpc3QocmVnaW9uSWQpO1xuXG4gICAgaWYgKGV2ZW50RGF0YSAmJiB0aWxlTGlzdCkge1xuICAgICAgdGhpcy5zcGF3bkV2ZW50KGV2ZW50RGF0YSwgdGlsZUxpc3QsIHRlbXBvcmFyeSk7XG4gICAgfVxuICB9O1xuXG4gIEdhbWVfTWFwLnByb3RvdHlwZS5zcGF3bk1hcEV2ZW50RnJvbSA9IGZ1bmN0aW9uKG1hcElkT3JpZ2luLCBldmVudElkT3JpZ2luLCByZWdpb25JZCwgdGVtcG9yYXJ5KSB7XG4gICAgdmFyIHRpbGVMaXN0ID0gdGhpcy5nZXRSZWdpb25UaWxlTGlzdChyZWdpb25JZCk7XG5cbiAgICBpZiAodGlsZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5nZXRFdmVudERhdGFGcm9tKG1hcElkT3JpZ2luLCBldmVudElkT3JpZ2luLCBmdW5jdGlvbihldmVudERhdGEpIHtcbiAgICAgICAgJGdhbWVNYXAuc3Bhd25FdmVudChldmVudERhdGEsIHRpbGVMaXN0LCB0ZW1wb3JhcnkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEdhbWVfSW50ZXJwcmV0ZXIucHJvdG90eXBlLmdldE51bWVyaWNWYWx1ZSA9IGZ1bmN0aW9uKHN0cmluZ1ZhbHVlKSB7XG4gICAgaWYgKHN0cmluZ1ZhbHVlLnN1YnN0cigwLCAxKSA9PSAnWycgJiYgc3RyaW5nVmFsdWUuc3Vic3RyKC0xKSA9PSAnXScpIHtcbiAgICAgIHZhciB2YXJpYWJsZUlkID0gcGFyc2VJbnQoc3RyaW5nVmFsdWUuc3Vic3RyKDEsIHN0cmluZ1ZhbHVlLmxlbmd0aCAtIDIpLCAxMCk7XG5cbiAgICAgIGlmICh2YXJpYWJsZUlkID4gMCkge1xuICAgICAgICByZXR1cm4gJGdhbWVWYXJpYWJsZXMudmFsdWUodmFyaWFibGVJZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nVmFsdWUsIDEwKTtcbiAgICB9XG4gIH07XG5cbiAgR2FtZV9JbnRlcnByZXRlci5wcm90b3R5cGUuY2hlY2tDb3B5Q29tbWFuZHMgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoIDwgMikgcmV0dXJuO1xuXG4gICAgaWYgKGNvbW1hbmQudG9VcHBlckNhc2UoKSAhPT0gJ0NPUFknICYmIGNvbW1hbmQudG9VcHBlckNhc2UoKSAhPT0gJ1NQQVdOJykgcmV0dXJuO1xuICAgIGlmIChhcmdzWzBdLnRvVXBwZXJDYXNlKCkgIT09IFwiRVZFTlRcIikgcmV0dXJuO1xuXG4gICAgdmFyIGV2ZW50SWRPcmlnaW4gPSB0aGlzLmdldE51bWVyaWNWYWx1ZShhcmdzWzFdKTtcbiAgICB2YXIgbWFwSWRPcmlnaW4gPSAkZ2FtZU1hcC5tYXBJZCgpO1xuICAgIHZhciBpc1Bvc2l0aW9uID0gdHJ1ZTtcbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHkgPSAwO1xuICAgIHZhciByZWdpb25JZCA9IDA7XG4gICAgdmFyIHRlbXBvcmFyeSA9IHRydWU7XG4gICAgdmFyIGhhc1Bvc2l0aW9uID0gZmFsc2U7XG4gICAgdmFyIHVzZXJJbmRleDtcblxuICAgIGlmIChldmVudElkT3JpZ2luIDw9IDApIHJldHVybjtcblxuICAgIHZhciBuZXh0SW5kZXggPSAyO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IG5leHRJbmRleCArIDMpIHtcbiAgICAgIGlmIChhcmdzW25leHRJbmRleF0udG9VcHBlckNhc2UoKSA9PSAnRlJPTScgJiYgYXJnc1tuZXh0SW5kZXggKyAxXS50b1VwcGVyQ2FzZSgpID09ICdNQVAnKSB7XG4gICAgICAgIG1hcElkT3JpZ2luID0gdGhpcy5nZXROdW1lcmljVmFsdWUoYXJnc1tuZXh0SW5kZXggKyAyXSk7XG4gICAgICAgIG5leHRJbmRleCArPSAzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCA+IG5leHRJbmRleCAmJiBhcmdzW25leHRJbmRleF0udG9VcHBlckNhc2UoKSA9PSAnSEVSRScpIHtcbiAgICAgIGlzUG9zaXRpb24gPSB0cnVlO1xuICAgICAgaGFzUG9zaXRpb24gPSB0cnVlO1xuICAgICAgeCA9IHRoaXMuY2hhcmFjdGVyKDApLng7XG4gICAgICB5ID0gdGhpcy5jaGFyYWN0ZXIoMCkueTtcbiAgICAgIG5leHRJbmRleCsrO1xuXG4gICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA+IG5leHRJbmRleCkge1xuICAgICAgaWYgKGFyZ3NbbmV4dEluZGV4XS50b1VwcGVyQ2FzZSgpICE9PSAnVE8nICYmIGFyZ3NbbmV4dEluZGV4XS50b1VwcGVyQ2FzZSgpICE9PSAnT04nKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ09yYW5nZUN1c3RvbUV2ZW50cycsICdJbnZhbGlkIGRlc3RpbmF0aW9uJywgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbmV4dEluZGV4Kys7XG5cbiAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG5leHRJbmRleCAmJiBhcmdzW25leHRJbmRleF0udG9VcHBlckNhc2UoKSA9PSAnUkVHSU9OJykge1xuICAgICAgICBpc1Bvc2l0aW9uID0gZmFsc2U7XG4gICAgICAgIG5leHRJbmRleCsrO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA+IG5leHRJbmRleCAmJiBhcmdzW25leHRJbmRleF0udG9VcHBlckNhc2UoKSA9PSAnUE9TSVRJT04nKSB7XG4gICAgICAgIGlzUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICBuZXh0SW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdPcmFuZ2VDdXN0b21FdmVudHMnLCAnSW5jb21wbGV0ZSBjb21tYW5kJywgY29tbWFuZCwgYXJncyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzUG9zaXRpb24pIHtcbiAgICAgIGlmICghaGFzUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbmV4dEluZGV4ICYmIGFyZ3NbbmV4dEluZGV4XS50b1VwcGVyQ2FzZSgpID09ICdQTEFZRVInKSB7XG4gICAgICAgICAgeCA9ICRnYW1lUGxheWVyLng7XG4gICAgICAgICAgeSA9ICRnYW1lUGxheWVyLnk7XG4gICAgICAgICAgbmV4dEluZGV4Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPj0gbmV4dEluZGV4ICsgMikge1xuICAgICAgICAgIHggPSB0aGlzLmdldE51bWVyaWNWYWx1ZShhcmdzW25leHRJbmRleF0pO1xuICAgICAgICAgIHkgPSB0aGlzLmdldE51bWVyaWNWYWx1ZShhcmdzW25leHRJbmRleCArIDFdKTtcblxuICAgICAgICAgIG5leHRJbmRleCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ09yYW5nZUN1c3RvbUV2ZW50cycsICdXaGF0IHBvc2l0aW9uPycsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbmV4dEluZGV4KSB7XG4gICAgICAgIHJlZ2lvbklkID0gdGhpcy5nZXROdW1lcmljVmFsdWUoYXJnc1tuZXh0SW5kZXhdKTtcbiAgICAgICAgbmV4dEluZGV4Kys7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignT3JhbmdlQ3VzdG9tRXZlbnRzJywgJ1doYXQgcmVnaW9uPycsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCA+IG5leHRJbmRleCArIDIpIHtcbiAgICAgIGlmIChhcmdzW25leHRJbmRleF0udG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKCdXSVRIJykgJiYgYXJnc1tuZXh0SW5kZXggKyAxXS50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgoJ0lEJykpIHtcbiAgICAgICAgdXNlckluZGV4ID0gdGhpcy5nZXROdW1lcmljVmFsdWUoYXJnc1tuZXh0SW5kZXggKyAyXSk7XG4gICAgICAgIG5leHRJbmRleCArPSAzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCA+IG5leHRJbmRleCkge1xuICAgICAgaWYgKGFyZ3NbbmV4dEluZGV4XS50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgoJ1RFTVAnKSkge1xuICAgICAgICB0ZW1wb3JhcnkgPSB0cnVlO1xuICAgICAgICBuZXh0SW5kZXgrKztcbiAgICAgIH0gZWxzZSBpZiAoYXJnc1tuZXh0SW5kZXhdLnRvVXBwZXJDYXNlKCkgPT0gJ1NBVkUnKSB7XG4gICAgICAgIHRlbXBvcmFyeSA9IGZhbHNlO1xuICAgICAgICBuZXh0SW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNQb3NpdGlvbikge1xuICAgICAgaWYgKG1hcElkT3JpZ2luID09ICRnYW1lTWFwLm1hcElkKCkpIHtcbiAgICAgICAgJGdhbWVNYXAuY29weUV2ZW50KGV2ZW50SWRPcmlnaW4sIHgsIHksIHRlbXBvcmFyeSwgdXNlckluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRnYW1lTWFwLmNvcHlFdmVudEZyb20obWFwSWRPcmlnaW4sIGV2ZW50SWRPcmlnaW4sIHgsIHksIHRlbXBvcmFyeSwgdXNlckluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoY29tbWFuZC50b1VwcGVyQ2FzZSgpID09PSAnQ09QWScpIHtcbiAgICAgICAgaWYgKG1hcElkT3JpZ2luID09ICRnYW1lTWFwLm1hcElkKCkpIHtcbiAgICAgICAgICAkZ2FtZU1hcC5jb3B5RXZlbnRUb1JlZ2lvbihldmVudElkT3JpZ2luLCByZWdpb25JZCwgdGVtcG9yYXJ5LCB1c2VySW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRnYW1lTWFwLmNvcHlFdmVudEZyb21NYXBUb1JlZ2lvbihtYXBJZE9yaWdpbiwgZXZlbnRJZE9yaWdpbiwgcmVnaW9uSWQsIHRlbXBvcmFyeSwgdXNlckluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLnRvVXBwZXJDYXNlKCkgPT09ICdTUEFXTicpIHtcbiAgICAgICAgaWYgKG1hcElkT3JpZ2luID09ICRnYW1lTWFwLm1hcElkKCkpIHtcbiAgICAgICAgICAkZ2FtZU1hcC5zcGF3bk1hcEV2ZW50KGV2ZW50SWRPcmlnaW4sIHJlZ2lvbklkLCB0ZW1wb3JhcnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRnYW1lTWFwLnNwYXduTWFwRXZlbnRGcm9tKG1hcElkT3JpZ2luLCBldmVudElkT3JpZ2luLCByZWdpb25JZCwgdGVtcG9yYXJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBHYW1lX0ludGVycHJldGVyLnByb3RvdHlwZS5jaGVja0RlbGV0ZUNvbW1hbmQgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9IDIpIHJldHVybjtcblxuICAgIGlmIChjb21tYW5kLnRvVXBwZXJDYXNlKCkgIT09ICdERUxFVEUnKSByZXR1cm47XG4gICAgaWYgKGFyZ3NbMF0udG9VcHBlckNhc2UoKSAhPT0gXCJUSElTXCIpIHJldHVybjtcbiAgICBpZiAoYXJnc1sxXS50b1VwcGVyQ2FzZSgpICE9PSBcIkVWRU5UXCIpIHJldHVybjtcblxuICAgICRnYW1lU3lzdGVtLnJlbW92ZUN1c3RvbUV2ZW50KHRoaXMuX21hcElkLCB0aGlzLl9ldmVudElkKTtcbiAgICB0aGlzLmNvbW1hbmQyMTQoKTtcbiAgfTtcblxuICB2YXIgb2xkR2FtZUludGVycHJldGVyX3BsdWdpbkNvbW1hbmQgPSBHYW1lX0ludGVycHJldGVyLnByb3RvdHlwZS5wbHVnaW5Db21tYW5kO1xuICBHYW1lX0ludGVycHJldGVyLnByb3RvdHlwZS5wbHVnaW5Db21tYW5kID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncykge1xuICAgIG9sZEdhbWVJbnRlcnByZXRlcl9wbHVnaW5Db21tYW5kLmNhbGwodGhpcywgY29tbWFuZCwgYXJncyk7XG5cbiAgICB0aGlzLmNoZWNrQ29weUNvbW1hbmRzKGNvbW1hbmQsIGFyZ3MpO1xuICAgIHRoaXMuY2hlY2tEZWxldGVDb21tYW5kKGNvbW1hbmQsIGFyZ3MpO1xuICB9O1xufSkoT3JhbmdlQ3VzdG9tRXZlbnRzKTtcblxuSW1wb3J0ZWQuT3JhbmdlQ3VzdG9tRXZlbnRzID0gMS45O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9MaWIvT3JhbmdlQ3VzdG9tRXZlbnRzLmpzIiwiaW1wb3J0IE5ldHdvcmtQbGF5ZXIgZnJvbSBcIi4vTmV0d29ya1BsYXllclwiO1xyXG5pbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJNYW5hZ2VyIHtcclxuXHJcbiAgY29uc3RydWN0b3Ioc29ja2V0KSB7XHJcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcclxuICAgIHRoaXMucGxheWVycyA9IHt9O1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJTZXJ2ZXJIb29rcygpIHtcclxuICAgIGxldCBtYW5hZ2VyID0gdGhpcztcclxuXHJcblxyXG4gICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGluY29taW5nKSB7XHJcbiAgICAgIGlmICghU2NlbmVNYW5hZ2VyLl9zY2VuZVN0YXJ0ZWQgfHwgIVNjZW5lTWFuYWdlci5fc2NlbmUuX3Nwcml0ZXNldCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QganNvbiA9IGluY29taW5nLmRhdGE7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGpzb24pO1xyXG4gICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQ6ICVzJywganNvbik7XHJcblxyXG4gICAgICBsZXQgYWN0aW9uID0gcGFyc2VJbnQobWVzc2FnZVswXSk7XHJcbiAgICAgIGxldCBwbGF5ZXJJZCA9IHBhcnNlSW50KG1lc3NhZ2VbMV0pO1xyXG5cclxuICAgICAgaWYocGxheWVySWQgPT09IHdpbmRvdy5HQU1FX0lEKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIShwbGF5ZXJJZCBpbiBtYW5hZ2VyLnBsYXllcnMpKSB7XHJcbiAgICAgICAgbWFuYWdlci5wbGF5ZXJzW3BsYXllcklkXSA9IG5ldyBOZXR3b3JrUGxheWVyKHBsYXllcklkKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgcGxheWVyID0gbWFuYWdlci5wbGF5ZXJzW3BsYXllcklkXTtcclxuXHJcbiAgICAgIGlmIChhY3Rpb24gPT09IFR5cGVzLk1lc3NhZ2VzLlNQQVdOKSB7XHJcblxyXG5cclxuICAgICAgfSBlbHNlIGlmKGFjdGlvbiA9PT0gVHlwZXMuTWVzc2FnZXMuREVTUEFXTikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVtb3ZpbmcgcGxheWVyIGZyb20gbWFwXCIpO1xyXG4gICAgICAgIHBsYXllci5kZWxldGVFdmVudCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gVHlwZXMuTWVzc2FnZXMuTU9WRSkge1xyXG4gICAgICAgIC8vIE5lZWRzIHRvIGJlIG1vdmVkIHRvIHNwYXduIGFmdGVyIEkgZmlndXJlIHRoYXQgb3V0Li4uXHJcbiAgICAgICAgaWYgKHBsYXllci5ldmVudElkID09PSBudWxsIHx8IHBsYXllci5ldmVudCAhPT0gJGdhbWVNYXAuX2V2ZW50c1twbGF5ZXIuZXZlbnRJZF0pIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgcGxheWVyIG9uIG1hcFwiKTtcclxuICAgICAgICAgIHBsYXllci5jcmVhdGVFdmVudCh7XHJcbiAgICAgICAgICAgIHg6IG1lc3NhZ2VbMl0sXHJcbiAgICAgICAgICAgIHk6IG1lc3NhZ2VbM10sXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckluZGV4OiBtZXNzYWdlWzRdLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lOiBtZXNzYWdlWzVdLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IG1lc3NhZ2VbNl0sXHJcbiAgICAgICAgICAgIG1vdmVTcGVlZDogbWVzc2FnZVs3XSxcclxuICAgICAgICAgICAgbW92ZUZyZXF1ZW5jeTogbWVzc2FnZVs4XSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGxheWVyLmhhbmRsZU1vdmUoe1xyXG4gICAgICAgICAgeDogbWVzc2FnZVsyXSxcclxuICAgICAgICAgIHk6IG1lc3NhZ2VbM10sXHJcbiAgICAgICAgICBjaGFyYWN0ZXJJbmRleDogbWVzc2FnZVs0XSxcclxuICAgICAgICAgIGNoYXJhY3Rlck5hbWU6IG1lc3NhZ2VbNV0sXHJcbiAgICAgICAgICBkaXJlY3Rpb246IG1lc3NhZ2VbNl0sXHJcbiAgICAgICAgICBtb3ZlU3BlZWQ6IG1lc3NhZ2VbN10sXHJcbiAgICAgICAgICBtb3ZlRnJlcXVlbmN5OiBtZXNzYWdlWzhdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGluY29taW5nKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZDogJXMnLCBpbmNvbWluZy5kYXRhKTtcclxuICAgICAgbGV0IG1zZyA9IEpTT04ucGFyc2UoaW5jb21pbmcuZGF0YSk7XHJcbiAgICAgIGxldCBldmVudCA9IG1zZy5ldmVudDtcclxuICAgICAgbGV0IGRhdGEgPSBtc2cuZGF0YTtcclxuXHJcbiAgICAgIGlmICghKGRhdGEuaWQgaW4gbWFuYWdlci5wbGF5ZXJzKSkge1xyXG4gICAgICAgIG1hbmFnZXIucGxheWVyc1tkYXRhLmlkXSA9IG5ldyBOZXR3b3JrUGxheWVyKGRhdGEuaWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBwbGF5ZXIgPSBtYW5hZ2VyLnBsYXllcnNbZGF0YS5pZF07XHJcblxyXG4gICAgICBpZiAocGxheWVyLmV2ZW50SWQgPT09IG51bGwpIHtcclxuICAgICAgICBwbGF5ZXIuY3JlYXRlRXZlbnQoZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChldmVudCA9PSBcIlBMQVlFUl9NT1ZFXCIpIHtcclxuICAgICAgICBpZiAod2luZG93LkdBTUVfSUQgIT09IHBsYXllci5pZCkge1xyXG4gICAgICAgICAgaWYgKCFTY2VuZU1hbmFnZXIuX3NjZW5lU3RhcnRlZCB8fCAhU2NlbmVNYW5hZ2VyLl9zY2VuZS5fc3ByaXRlc2V0KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgcGxheWVyLmhhbmRsZU1vdmUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gIH1cclxuXHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dhbWUvUGxheWVyTWFuYWdlci5qcyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXR3b3JrUGxheWVyIGV4dGVuZHMgUGxheWVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoaWQpIHtcclxuICAgIHN1cGVyKGlkKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUV2ZW50KGRldGFpbCkge1xyXG4gICAgdGhpcy54ID0gZGV0YWlsLng7XHJcbiAgICB0aGlzLnkgPSBkZXRhaWwueTtcclxuICAgIHRoaXMuY2hhcmFjdGVySW5kZXggPSBkZXRhaWwuY2hhcmFjdGVySW5kZXg7XHJcbiAgICB0aGlzLmNoYXJhY3Rlck5hbWUgPSBkZXRhaWwuY2hhcmFjdGVyTmFtZTtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGV0YWlsLmRpcmVjdGlvbjtcclxuICAgIHRoaXMubW92ZVNwZWVkID0gZGV0YWlsLm1vdmVTcGVlZDtcclxuICAgIHRoaXMubW92ZUZyZXF1ZW5jeSA9IGRldGFpbC5tb3ZlRnJlcXVlbmN5O1xyXG5cclxuICAgIGxldCBpbmRleCA9ICRnYW1lTWFwLl9ldmVudHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCBldmVudE9iamVjdCA9IHtcclxuICAgICAgXCJpZFwiOiB0aGlzLmlkLFxyXG4gICAgICBcIm5hbWVcIjogXCJOZXR3b3JrUGxheWVyMVwiLFxyXG4gICAgICBcIm5vdGVcIjogXCJcIixcclxuICAgICAgXCJwYWdlc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJjb25kaXRpb25zXCI6IHtcclxuICAgICAgICAgICAgXCJhY3RvcklkXCI6IDEsXHJcbiAgICAgICAgICAgIFwiYWN0b3JWYWxpZFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpdGVtSWRcIjogMSxcclxuICAgICAgICAgICAgXCJpdGVtVmFsaWRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwic2VsZlN3aXRjaENoXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICBcInNlbGZTd2l0Y2hWYWxpZFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJzd2l0Y2gxSWRcIjogMSxcclxuICAgICAgICAgICAgXCJzd2l0Y2gxVmFsaWRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwic3dpdGNoMklkXCI6IDEsXHJcbiAgICAgICAgICAgIFwic3dpdGNoMlZhbGlkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInZhcmlhYmxlSWRcIjogMSxcclxuICAgICAgICAgICAgXCJ2YXJpYWJsZVZhbGlkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInZhcmlhYmxlVmFsdWVcIjogMFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwiZGlyZWN0aW9uRml4XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpbWFnZVwiOiB7XHJcbiAgICAgICAgICAgIFwidGlsZUlkXCI6IDAsXHJcbiAgICAgICAgICAgIFwiY2hhcmFjdGVyTmFtZVwiOiB0aGlzLmNoYXJhY3Rlck5hbWUsXHJcbiAgICAgICAgICAgIFwiZGlyZWN0aW9uXCI6IHRoaXMuZGlyZWN0aW9uLFxyXG4gICAgICAgICAgICBcInBhdHRlcm5cIjogMCxcclxuICAgICAgICAgICAgXCJjaGFyYWN0ZXJJbmRleFwiOiB0aGlzLmNoYXJhY3RlckluZGV4XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJsaXN0XCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwiY29kZVwiOiAwLFxyXG4gICAgICAgICAgICAgIFwiaW5kZW50XCI6IDAsXHJcbiAgICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcIm1vdmVGcmVxdWVuY3lcIjogdGhpcy5tb3ZlRnJlcXVlbmN5LFxyXG4gICAgICAgICAgXCJtb3ZlUm91dGVcIjoge1xyXG4gICAgICAgICAgICBcImxpc3RcIjogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29kZVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IFtdXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcInJlcGVhdFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInNraXBwYWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ3YWl0XCI6IGZhbHNlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtb3ZlU3BlZWRcIjogdGhpcy5tb3ZlU3BlZWQsXHJcbiAgICAgICAgICBcIm1vdmVUeXBlXCI6IDAsXHJcbiAgICAgICAgICBcInByaW9yaXR5VHlwZVwiOiAxLFxyXG4gICAgICAgICAgXCJzdGVwQW5pbWVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInRocm91Z2hcIjogdHJ1ZSxcclxuICAgICAgICAgIFwidHJpZ2dlclwiOiAwLFxyXG4gICAgICAgICAgXCJ3YWxrQW5pbWVcIjogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgXCJ4XCI6IHRoaXMueCxcclxuICAgICAgXCJ5XCI6IHRoaXMueVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY3JlYXRlZCA9ICRnYW1lTWFwLmFkZEV2ZW50KGV2ZW50T2JqZWN0LCB0cnVlLCBpbmRleCk7XHJcblxyXG4gICAgdGhpcy5ldmVudElkID0gaW5kZXg7XHJcbiAgICB0aGlzLmV2ZW50ID0gY3JlYXRlZDtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUV2ZW50KCkge1xyXG4gICAgJGdhbWVTeXN0ZW0ucmVtb3ZlQ3VzdG9tRXZlbnQoJGdhbWVNYXAuX21hcElkLCB0aGlzLmV2ZW50SWQpO1xyXG5cclxuICAgIGlmKHRoaXMuZXZlbnRJZCBpbiAkZ2FtZU1hcC5fZXZlbnRzKSB7XHJcbiAgICAgICRnYW1lTWFwLmVyYXNlRXZlbnQodGhpcy5ldmVudElkKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50SWQgPSBudWxsO1xyXG4gICAgdGhpcy5ldmVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVNb3ZlKGRldGFpbCkge1xyXG4gICAgdGhpcy54ID0gZGV0YWlsLng7XHJcbiAgICB0aGlzLnkgPSBkZXRhaWwueTtcclxuICAgIHRoaXMuY2hhcmFjdGVySW5kZXggPSBkZXRhaWwuY2hhcmFjdGVySW5kZXg7XHJcbiAgICB0aGlzLmNoYXJhY3Rlck5hbWUgPSBkZXRhaWwuY2hhcmFjdGVyTmFtZTtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGV0YWlsLmRpcmVjdGlvbjtcclxuICAgIHRoaXMubW92ZVNwZWVkID0gZGV0YWlsLm1vdmVTcGVlZDtcclxuICAgIHRoaXMubW92ZUZyZXF1ZW5jeSA9IGRldGFpbC5tb3ZlRnJlcXVlbmN5O1xyXG5cclxuICAgIHRoaXMuZXZlbnQuc2V0TW92ZUZyZXF1ZW5jeSh0aGlzLm1vdmVGcmVxdWVuY3kpO1xyXG4gICAgdGhpcy5ldmVudC5zZXRNb3ZlU3BlZWQodGhpcy5tb3ZlU3BlZWQpO1xyXG4gICAgdGhpcy5ldmVudC5tb3ZlU3RyYWlnaHQodGhpcy5kaXJlY3Rpb24pO1xyXG4gICAgdGhpcy5ldmVudC5zZXRQb3NpdGlvbih0aGlzLngsIHRoaXMueSk7XHJcbiAgICB0aGlzLmV2ZW50LnNldEltYWdlKHRoaXMuY2hhcmFjdGVyTmFtZSwgdGhpcy5jaGFyYWN0ZXJJbmRleCk7XHJcbiAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HYW1lL05ldHdvcmtQbGF5ZXIuanMiLCIvKlxyXG4gKiBBdmFpbGFibGUgRXZlbnRzOlxyXG4gKiBHYW1lX1BsYXllci5tb3ZlQnlJbnB1dC5iZWZvcmVNb3ZlXHJcbiAqIEdhbWVfUGxheWVyLm1vdmVCeUlucHV0LmFmdGVyTW92ZVxyXG4gKi9cclxuXHJcbkdhbWVfUGxheWVyLnByb3RvdHlwZS5tb3ZlQnlJbnB1dCA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAoIXRoaXMuaXNNb3ZpbmcoKSAmJiB0aGlzLmNhbk1vdmUoKSkge1xyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMuZ2V0SW5wdXREaXJlY3Rpb24oKTtcclxuICAgIGlmIChkaXJlY3Rpb24gPiAwKSB7XHJcbiAgICAgICRnYW1lVGVtcC5jbGVhckRlc3RpbmF0aW9uKCk7XHJcbiAgICB9IGVsc2UgaWYgKCRnYW1lVGVtcC5pc0Rlc3RpbmF0aW9uVmFsaWQoKSkge1xyXG4gICAgICB2YXIgeCA9ICRnYW1lVGVtcC5kZXN0aW5hdGlvblgoKTtcclxuICAgICAgdmFyIHkgPSAkZ2FtZVRlbXAuZGVzdGluYXRpb25ZKCk7XHJcbiAgICAgIGRpcmVjdGlvbiA9IHRoaXMuZmluZERpcmVjdGlvblRvKHgsIHkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcclxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdHYW1lX1BsYXllci5tb3ZlQnlJbnB1dC5iZWZvcmVNb3ZlJywge1xyXG4gICAgICAgIGRldGFpbDoge1xyXG4gICAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgICAgeTogdGhpcy55LFxyXG4gICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXHJcbiAgICAgICAgICBtb3ZlU3BlZWQ6IHRoaXMucmVhbE1vdmVTcGVlZCgpLFxyXG4gICAgICAgICAgbW92ZUZyZXF1ZW5jeTogdGhpcy5tb3ZlRnJlcXVlbmN5KCksXHJcbiAgICAgICAgICBjaGFyYWN0ZXJOYW1lOiB0aGlzLl9jaGFyYWN0ZXJOYW1lLFxyXG4gICAgICAgICAgY2hhcmFjdGVySW5kZXg6IHRoaXMuX2NoYXJhY3RlckluZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICB0aGlzLmV4ZWN1dGVNb3ZlKGRpcmVjdGlvbik7XHJcblxyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0dhbWVfUGxheWVyLm1vdmVCeUlucHV0LmFmdGVyTW92ZScsIHtcclxuICAgICAgICBkZXRhaWw6IHtcclxuICAgICAgICAgIHg6IHRoaXMueCxcclxuICAgICAgICAgIHk6IHRoaXMueSxcclxuICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxyXG4gICAgICAgICAgbW92ZVNwZWVkOiB0aGlzLnJlYWxNb3ZlU3BlZWQoKSxcclxuICAgICAgICAgIG1vdmVGcmVxdWVuY3k6IHRoaXMubW92ZUZyZXF1ZW5jeSgpLFxyXG4gICAgICAgICAgY2hhcmFjdGVyTmFtZTogdGhpcy5fY2hhcmFjdGVyTmFtZSxcclxuICAgICAgICAgIGNoYXJhY3RlckluZGV4OiB0aGlzLl9jaGFyYWN0ZXJJbmRleFxyXG4gICAgICAgIH1cclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbkdhbWVfUGxheWVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGFjdG9yID0gJGdhbWVQYXJ0eS5sZWFkZXIoKTtcclxuICB2YXIgY2hhcmFjdGVyTmFtZSA9IGFjdG9yID8gYWN0b3IuY2hhcmFjdGVyTmFtZSgpIDogJyc7XHJcbiAgdmFyIGNoYXJhY3RlckluZGV4ID0gYWN0b3IgPyBhY3Rvci5jaGFyYWN0ZXJJbmRleCgpIDogMDtcclxuICB0aGlzLnNldEltYWdlKGNoYXJhY3Rlck5hbWUsIGNoYXJhY3RlckluZGV4KTtcclxuICB0aGlzLl9mb2xsb3dlcnMucmVmcmVzaCgpO1xyXG5cclxuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0dhbWVfUGxheWVyLnJlZnJlc2gnLCB7XHJcbiAgICBkZXRhaWw6IHtcclxuICAgICAgY2hhcmFjdGVyTmFtZTogY2hhcmFjdGVyTmFtZSxcclxuICAgICAgY2hhcmFjdGVySW5kZXg6IGNoYXJhY3RlckluZGV4XHJcbiAgICB9XHJcbiAgfSkpO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9FdmVudHMvR2FtZV9QbGF5ZXIuanMiLCJTY2VuZV9NYXAucHJvdG90eXBlLnVwZGF0ZVRyYW5zZmVyUGxheWVyID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKCRnYW1lUGxheWVyLmlzVHJhbnNmZXJyaW5nKCkpIHtcclxuICAgIFNjZW5lTWFuYWdlci5nb3RvKFNjZW5lX01hcCk7XHJcblxyXG5cclxuICB9XHJcbn07XHJcblxyXG5TY2VuZV9NYXAucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gIFNjZW5lX0Jhc2UucHJvdG90eXBlLmNyZWF0ZS5jYWxsKHRoaXMpO1xyXG4gIHRoaXMuX3RyYW5zZmVyID0gJGdhbWVQbGF5ZXIuaXNUcmFuc2ZlcnJpbmcoKTtcclxuICB2YXIgbWFwSWQgPSB0aGlzLl90cmFuc2ZlciA/ICRnYW1lUGxheWVyLm5ld01hcElkKCkgOiAkZ2FtZU1hcC5tYXBJZCgpO1xyXG4gIERhdGFNYW5hZ2VyLmxvYWRNYXBEYXRhKG1hcElkKTtcclxuXHJcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdTY2VuZV9NYXAuY3JlYXRlJywge1xyXG4gICAgZGV0YWlsOiB7XHJcbiAgICAgIG1hcF9pZDogbWFwSWRcclxuICAgIH1cclxuICB9KSk7XHJcbn07XHJcblxyXG5TY2VuZV9NYXAucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcclxuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ1NjZW5lX01hcC5zdG9wJywge1xyXG4gICAgZGV0YWlsOiB7XHJcbiAgICAgIG1hcF9pZDogJGdhbWVNYXAubWFwSWQoKVxyXG4gICAgfVxyXG4gIH0pKTtcclxuXHJcbiAgU2NlbmVfQmFzZS5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpO1xyXG4gICRnYW1lUGxheWVyLnN0cmFpZ2h0ZW4oKTtcclxuICB0aGlzLl9tYXBOYW1lV2luZG93LmNsb3NlKCk7XHJcbiAgaWYgKHRoaXMubmVlZHNTbG93RmFkZU91dCgpKSB7XHJcbiAgICB0aGlzLnN0YXJ0RmFkZU91dCh0aGlzLnNsb3dGYWRlU3BlZWQoKSwgZmFsc2UpO1xyXG4gIH0gZWxzZSBpZiAoU2NlbmVNYW5hZ2VyLmlzTmV4dFNjZW5lKFNjZW5lX01hcCkpIHtcclxuICAgIHRoaXMuZmFkZU91dEZvclRyYW5zZmVyKCk7XHJcbiAgfSBlbHNlIGlmIChTY2VuZU1hbmFnZXIuaXNOZXh0U2NlbmUoU2NlbmVfQmF0dGxlKSkge1xyXG4gICAgdGhpcy5sYXVuY2hCYXR0bGUoKTtcclxuICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0V2ZW50cy9TY2VuZV9NYXAuanMiXSwic291cmNlUm9vdCI6IiJ9