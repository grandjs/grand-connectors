/**
 * @package @GrandConnectors
 * @author Tarek Salem
 * MIT License
 */
/**
 * ==============================================================================
 * File Role: Decorators File
 * ==============================================================================
 */
import { Repository } from "./index";
import { IDataSource, ServiceModes } from "./types";
import { promisify } from "util";
import Fs from "fs";
import Path from "path";
import { Entity } from "grand-model";
import { DataSources, Models, Services } from "./store";

// inject new service in any class
const InjectService = (
  store: string,
  Service: any,
  mode = ServiceModes.global,
  data?: any
) => {
  return (constructor: Function) => {
    let storeWhere: any;
    let preparedService;
    let serviceName:string =
      typeof Service === "function"
        ? Service.prototype.constructor.name
        : Service.constructor.name;
    let serviceNameLowerCase = serviceName.charAt(0).toLowerCase() + serviceName.slice(1);
    if (Object.values(ServiceModes).includes(mode)) {
      if (mode === ServiceModes.global) {
          if(Services[serviceName]) {
          } else {
            Services[serviceName] = {name: serviceName, Service: new Service(data)}
          }
        preparedService = Services[serviceName].Service
      } else {
        preparedService =
          typeof Service === "function" ? new Service(data) : Service;
      }
      if (store === "this") {
        storeWhere = constructor.prototype;
      } else {
        storeWhere = constructor.prototype[store] =
          constructor.prototype[store] || {};
      }
      storeWhere[serviceNameLowerCase] = preparedService;
    } else {
      throw new Error(
        `service mode should be on of the following, ${Object.keys(
          ServiceModes
        ).join(" , ")}`
      );
    }
  };
};

// define the mode of service is it global or private
const Mode = (mode: ServiceModes) => {
  return (target) => {
    let modes = Object.values(ServiceModes);
    if (modes.includes(mode)) {
      target.Mode = mode;
    } else {
      throw new Error(
        `service mode should be on of the following, ${modes.join(" , ")}`
      );
    }
  };
};
// inject new data source into the repository
const InjectDataSource = (ComingDataSource: any) => {
  return (target: Repository, key: string) => {
    let dataSource =
      DataSources[key]?.name === key
        ? DataSources[key].DataSource
        : new ComingDataSource();
    target[key] = dataSource;
    target.dataSources = target.dataSources || {};
    target.dataSources[key] = dataSource;
    if(!DataSources[key]) {
      DataSources[key] = {name: key, dataSource}
    }
  };
};

// inject model into the repository
const InjectModel = (options: {
  Entity?: any;
  DataSourceName?: string;
  Model?: any;
}) => {
  return (target: Repository, key) => {
    target.dataSources = target.dataSources || {};
    let DataSource = target.dataSources[options.DataSourceName];
    target.Models = target.Models || {};
    target.Models[key] = {
      DataSource: DataSource ? DataSource : null,
      Entity: options.Entity,
      Model: options.Model ? options.Model : null,
    };
    target[key] = {
      DataSource: DataSource ? DataSource : null,
      Entity: options.Entity,
      Model: options.Model ? options.Model : null,
    };
  };
};

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

const bootsstrapModel = async () => {
  try {
    let readdir = promisify(Fs.readdir);
    let mkdir = promisify(Fs.mkdir);
    let modelsDir = Path.join(process.cwd(), "models");
    let directoryExists = await readdir(modelsDir);
    // check if it exists
    if (directoryExists) {
    } else {
      await mkdir(modelsDir);
    }
  } catch (err) {
    console.log(err);
  }
};
const writeModel = async (dataSourceType, entityName) => {
  try {
    let exists = promisify(Fs.exists);
    let writeFile = promisify(Fs.writeFile);
    let modelsDir = Path.join(process.cwd(), "models");
    let modelDir = Path.join(modelsDir, `${entityName}.model.ts`);
    let fileExists = await exists(modelDir);
    // check if file is not exist
    if (!fileExists) {
    }
  } catch (err) {}
};
const generateMongooseModel = (Entity: Function, entityName: string) => {
  entityName = entityName.charAt(0).toUpperCase();
  const Schema = Entity.prototype.Schema;
  const DocumentData = {};
  Object.keys(Schema).map((key: string) => {
    let schema = Schema[key];
    if (schema.isModel) {
      if (Array.isArray(schema.type) && schema.type.length > 0) {
      } else {
      }
    } else {
      DocumentData[key] = schema.type;
    }
  });
  const template = `
        import mongoose, {Document, model} from "mongoose";
        interface I${entityName} extends Document {
            ${Object.keys(DocumentData)
              .map((key) => {
                [key];
              })
              .join("")}

        }
    `;
};

// load class method for mongoose
const loadClass = (Schema, entity: Function) => {
  Schema.loadClass(entity.prototype.Methods || class {});
};

export { InjectDataSource, InjectModel, InjectService, loadClass, DataSources };
