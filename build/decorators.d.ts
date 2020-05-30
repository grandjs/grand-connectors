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
declare const InjectService: (name: string, store: any, Service: any, data?: any) => (constructor: Function) => void;
declare const InjectDataSource: (ComingDataSource: any) => (target: Repository, key: string) => void;
declare const InjectModel: (Entity: any, Model: any, DataSourceName: string) => (target: Repository, key: any) => void;
export { InjectDataSource, InjectModel, InjectService };
