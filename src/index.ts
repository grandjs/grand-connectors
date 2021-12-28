/**
 * @package @GrandConnectors
 * @author Tarek Salem
 * MIT License
 */
/**
 * ==============================================================================
 * File Role: Main File
 * ==============================================================================
 */
import {IDataSource, IRepository, ServiceModes} from "./types";
import {InjectDataSource, InjectModel, InjectService, loadClass} from "./decorators";
enum DBSourceTypes{
    mongoose = "mongoose",
    sequalize = "sequalize"
}


abstract class Repository implements IRepository{
    dataSources:{[key:string]:DataSource}
    Models:{[key:string]: {
        DataSource:DataSource,
        Model?:any,
        Entity?:any
    }}
}

abstract class DataSource implements IDataSource{
    abstract type: string;
    constructor() {
        this.init().then().catch(err => { throw Error(err) });
    }
    private async init() {
        if(this.connect) {
            return this.connect();
        }
    }
    abstract connect():any;
}




export {DataSource, Repository, IDataSource, ServiceModes, IRepository, InjectDataSource, InjectModel, InjectService, loadClass}