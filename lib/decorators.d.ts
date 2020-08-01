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
import { ServiceModes } from "./types";
import { Entity } from "grand-model";
import { DataSources } from "./store";
declare const InjectService: (store: string, Service: any, mode?: ServiceModes, data?: any) => (constructor: Function) => void;
declare const InjectDataSource: (ComingDataSource: any) => (target: Repository, key: string) => void;
declare const InjectModel: (options: {
    Entity?: any;
    DataSourceName?: string;
    Model?: any;
}) => (target: Repository, key: any) => void;
declare const loadClass: (Schema: any, entity: Function) => void;
export { InjectDataSource, InjectModel, InjectService, loadClass, DataSources };
