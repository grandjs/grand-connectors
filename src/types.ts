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
import {Entity, settings, property} from "grand-model";
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
        Entity:Entity
    }}
}