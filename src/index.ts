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
import {Entity, settings, property} from "grand-model";
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
        Entity:Entity
    }}
}

abstract class DataSource implements IDataSource{
    abstract type: string;
    constructor() {
        this.init();
    }
    private init() {
        if(this.connect) {
            return this.connect().then().catch(err => { throw Error(err) });
        }
    }
    abstract connect():any;
}




export {DataSource, Repository, IDataSource, ServiceModes, IRepository, InjectDataSource, InjectModel, InjectService, loadClass}