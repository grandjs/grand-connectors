"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadClass = exports.InjectService = exports.InjectModel = exports.InjectDataSource = exports.ServiceModes = exports.Repository = exports.DataSource = void 0;
const types_1 = require("./types");
Object.defineProperty(exports, "ServiceModes", { enumerable: true, get: function () { return types_1.ServiceModes; } });
const decorators_1 = require("./decorators");
Object.defineProperty(exports, "InjectDataSource", { enumerable: true, get: function () { return decorators_1.InjectDataSource; } });
Object.defineProperty(exports, "InjectModel", { enumerable: true, get: function () { return decorators_1.InjectModel; } });
Object.defineProperty(exports, "InjectService", { enumerable: true, get: function () { return decorators_1.InjectService; } });
Object.defineProperty(exports, "loadClass", { enumerable: true, get: function () { return decorators_1.loadClass; } });
var DBSourceTypes;
(function (DBSourceTypes) {
    DBSourceTypes["mongoose"] = "mongoose";
    DBSourceTypes["sequalize"] = "sequalize";
})(DBSourceTypes || (DBSourceTypes = {}));
class Repository {
    constructor() {
        console.log("I instantiated");
    }
}
exports.Repository = Repository;
class DataSource {
    constructor() {
        this.init();
    }
    init() {
        if (this.connect) {
            this.connect();
        }
    }
}
exports.DataSource = DataSource;
