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
import { Entity } from "grand-model";
import { DataSource } from "./index";
export interface IDataSource {
    connect(): any;
    type: string;
}
export interface IRepository {
    dataSources: {
        [key: string]: DataSource;
    };
    Models: {
        [key: string]: {
            DataSource: DataSource;
            Model?: any;
            Entity: Entity;
        };
    };
}
export declare enum ServiceModes {
    global = "global",
    private = "private"
}
