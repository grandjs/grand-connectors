"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = exports.DataSource = void 0;
var DBSourceTypes;
(function (DBSourceTypes) {
    DBSourceTypes["mongoose"] = "mongoose";
    DBSourceTypes["sequalize"] = "sequalize";
})(DBSourceTypes || (DBSourceTypes = {}));
class Repository {
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
