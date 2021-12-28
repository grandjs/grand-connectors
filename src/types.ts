/**
 * @package @GrandConnectors
 * @author Tarek Salem
 * MIT License
 */
/**
 * ==============================================================================
 * File Role: Interfaces File
 * ==============================================================================
 */
import {DataSource} from "./index";

export interface IDataSource{
    connect()
    type:string
}

export interface IRepository{
    dataSources: {[key:string]:DataSource}
    Models: {[key:string]: {
        DataSource:DataSource,
        Model?:any,
        Entity?:any
    }}
}

export enum ServiceModes{
    global = "global",
    private = "private"
}