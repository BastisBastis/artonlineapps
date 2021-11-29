(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/@ion-phaser/core/dist/esm/ion-phaser.entry.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ion-phaser/core/dist/esm/ion-phaser.entry.js ***!
  \********************************************************************/
/*! exports provided: ion_phaser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_phaser\", function() { return IonPhaser; });\n/* harmony import */ var _index_53dab568_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-53dab568.js */ \"./node_modules/@ion-phaser/core/dist/esm/index-53dab568.js\");\n\n\nconst ionPhaserCss = \"ion-phaser{display:block}\";\n\nconst IonPhaser = class {\n  constructor(hostRef) {\n    Object(_index_53dab568_js__WEBPACK_IMPORTED_MODULE_0__[\"r\"])(this, hostRef);\n    /**\n     * Initialize the phaser game manually\n     */\n    this.initialize = true;\n    this.initializeGame = (game = this.game) => {\n      if (game === null || game === undefined)\n        return;\n      if (game.instance !== undefined && game.instance !== null) {\n        throw new Error(\"A Phaser game already exist\");\n      }\n      game.parent = game.parent || this.el;\n      game.instance = new Phaser.Game(game);\n    };\n  }\n  onGameChange(game) {\n    if (this.initialize && !this.hasInitialized()) {\n      this.initializeGame(game);\n    }\n  }\n  onInitialize(newInitialize, oldInitialize) {\n    if (newInitialize && !oldInitialize) {\n      this.initializeGame();\n    }\n  }\n  /**\n   * Get the Phaser game instance\n   */\n  async getInstance() {\n    const { instance } = this.game || {};\n    return Promise.resolve(instance);\n  }\n  /**\n   * Destroy the Phaser game instance\n   */\n  async destroy() {\n    if (this.hasInitialized()) {\n      this.game.instance.destroy(true);\n      this.game.instance = null;\n    }\n  }\n  connectedCallback() {\n    if (!this.hasInitialized() && this.initialize) {\n      this.initializeGame();\n    }\n  }\n  disconnectedCallback() {\n    this.destroy();\n  }\n  hasInitialized() {\n    return (this.game &&\n      this.game.instance !== undefined &&\n      this.game.instance !== null);\n  }\n  get el() { return Object(_index_53dab568_js__WEBPACK_IMPORTED_MODULE_0__[\"g\"])(this); }\n  static get watchers() { return {\n    \"game\": [\"onGameChange\"],\n    \"initialize\": [\"onInitialize\"]\n  }; }\n};\nIonPhaser.style = ionPhaserCss;\n\n\n\n\n//# sourceURL=webpack:///./node_modules/@ion-phaser/core/dist/esm/ion-phaser.entry.js?");

/***/ })

}]);