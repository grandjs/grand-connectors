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
import { IDataSource } from "./types";
import { Entity } from "grand-model";
declare const DataSources: {
    name?: string;
    DataSource?: IDataSource;
};
declare const InjectService: (name: string, store: any, Service: any, data?: any) => (constructor: Function) => void;
declare const InjectDataSource: (ComingDataSource: any) => (target: Repository, key: string) => void;
declare const InjectModel: (options: {
    Entity?: any;
    DataSourceName: string;
    Model?: any;
}) => (target: Repository, key: any) => void;
declare const loadClass: (Schema: any, entity: Function) => void;
export { InjectDataSource, InjectModel, InjectService, loadClass, DataSources };
