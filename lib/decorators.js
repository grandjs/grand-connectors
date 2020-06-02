"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSources = exports.loadClass = exports.InjectService = exports.InjectModel = exports.InjectDataSource = void 0;
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DataSources = {};
exports.DataSources = DataSources;
// inject new service in any class
const InjectService = (name, store, Service, data) => {
    return (constructor) => {
        constructor.prototype[store] = constructor.prototype[store] || {};
        // console.log(new Service().getGreetingMessage)
        constructor.prototype[store][name] = new Service(data);
    };
};
exports.InjectService = InjectService;
// inject new data source into the repository
const InjectDataSource = (ComingDataSource) => {
    return (target, key) => {
        let dataSource = DataSources.name === key ? DataSources.DataSource : new ComingDataSource();
        target[key] = dataSource;
        target.dataSources = target.dataSources || {};
        target.dataSources[key] = dataSource;
    };
};
exports.InjectDataSource = InjectDataSource;
// inject model into the repository
const InjectModel = (options) => {
    return (target, key) => {
        let DataSource = target.dataSources[options.DataSourceName];
        if (DataSource) {
            target.Models = target.Models || {};
            target.Models[key] = { DataSource: DataSource, Entity: options.Entity, Model: options.Model ? options.Model : null };
            target[key] = { DataSource: DataSource, Entity: options.Entity, Model: options.Model ? options.Model : null };
        }
        else {
            throw new Error(`${options.DataSourceName} is not exist in ${target} Repository`);
        }
    };
};
exports.InjectModel = InjectModel;
// const InjectModel = (Entity:any,  DataSourceName:string) => {
//     return (target:Repository, key) => {
//         let DataSource = target.dataSources[DataSourceName];
//         if(DataSource) {
//             target.Models = target.Models || {};
//             // check if the data source type is mongoose
//             // target.Models[key] = {DataSource: DataSource, Entity: Entity, Model:Model};
//         } else {
//             throw new Error(`${DataSourceName} is not exist in ${target} Repository`);
//         }
//     }
// }
const bootsstrapModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let readdir = util_1.promisify(fs_1.default.readdir);
        let mkdir = util_1.promisify(fs_1.default.mkdir);
        let modelsDir = path_1.default.join(process.cwd(), "models");
        let directoryExists = yield readdir(modelsDir);
        // check if it exists
        if (directoryExists) {
        }
        else {
            yield mkdir(modelsDir);
        }
    }
    catch (err) {
        console.log(err);
    }
});
const writeModel = (dataSourceType, entityName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let exists = util_1.promisify(fs_1.default.exists);
        let writeFile = util_1.promisify(fs_1.default.writeFile);
        let modelsDir = path_1.default.join(process.cwd(), "models");
        let modelDir = path_1.default.join(modelsDir, `${entityName}.model.ts`);
        let fileExists = yield exists(modelDir);
        // check if file is not exist
        if (!fileExists) {
        }
    }
    catch (err) {
    }
});
const generateMongooseModel = (Entity, entityName) => {
    entityName = entityName.charAt(0).toUpperCase();
    const Schema = Entity.prototype.Schema;
    const DocumentData = {};
    Object.keys(Schema).map((key) => {
        let schema = Schema[key];
        if (schema.isModel) {
            if (Array.isArray(schema.type) && schema.type.length > 0) {
            }
            else {
            }
        }
        else {
            DocumentData[key] = schema.type;
        }
    });
    const template = `
        import mongoose, {Document, model} from "mongoose";
        interface I${entityName} extends Document {
            ${Object.keys(DocumentData).map((key) => {
        [key];
    }).join("")}

        }
    `;
};
// load class method for mongoose
const loadClass = (Schema, entity) => {
    Schema.loadClass(entity.prototype.Methods || class {
    });
};
exports.loadClass = loadClass;
