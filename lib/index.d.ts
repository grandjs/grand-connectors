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
import { Entity } from "grand-model";
import { IDataSource, IRepository, ServiceModes } from "./types";
import { InjectDataSource, InjectModel, InjectService, loadClass } from "./decorators";
declare abstract class Repository implements IRepository {
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
    constructor();
}
declare abstract class DataSource implements IDataSource {
    abstract type: string;
    constructor();
    private init;
    abstract connect(): any;
}
export { DataSource, Repository, IDataSource, ServiceModes, IRepository, InjectDataSource, InjectModel, InjectService, loadClass };
