<p align="center"><img width="200" height="200" src="https://i.ibb.co/t4MDdkq/grandjs.png" alt="Grandjs logo"></p>

# Grand Connectors
A Grandjs Package helper for repository pattern and clean archeticutre for your nodejs application using typescript
## Content
- [Grand Connectors](#grand-connectors)
  - [Content](#content)
  - [About](#about)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Dependencies](#dependencies)
  - [Installing](#installing)
  - [Usage](#usage)
  - [Grand Connectors Classes](#grand-connectors-classes)
    - [DataSource](#datasource)
      - [Extend DataSource](#extend-datasource)
      - [DataSource Type](#datasource-type)
      - [DataSource Method](#datasource-method)
      - [Repository](#repository)
    - [InjectDataSource](#injectdatasource)
    - [InjectModel](#injectmodel)
      - [Create New Entity](#create-new-entity)
      - [Create New Model](#create-new-model)
        - [InjectModel Properties](#injectmodel-properties)
    - [InjectService](#injectservice)

## About
Grand Connectors is a typescript package for building server side or frontend application based on clean design archeticutre and repository pattern, it's basically depends on two main functionalities, the first one is `Repository` and the second thing is `DataSource`, it also uses some decorators to enable you inject your datasource into your repositories and inject your repositories inside your controllers

## Features
- Dependency injection
- Repository Pattern
- Isolated models, repositories, datasources controllers
- For Typescript!


## Prerequisites
- install nodejs on your machine
- install typescript
- initialize a new typescript project

## Dependencies
Grand Connectors uses another package called [grand-model](https://github.com/tareksalem/grand-model), this package enables you to build models an scheme your data easily, it enables you inject your entities and models inside your repository, please take a look at how to use it for building schema and modeling your data

## Installing
```javascript
npm i grand-connectors
```


## Usage
`grand-connectors` exposes to you a set of functions and classes that you can use to build your repository and datasources, firstly import the following:

```typescript
import {Repository, DataSource, InjectDataSource, InjectModel} from "grand-connectors";
```


## Grand Connectors Classes
Grand Connectors exposes to you two classes, these classes as the following:

### DataSource

This is an abstracted class that you can extend to build your own data source, datasource in grandjs is basically considered as a host for your database type, so if you are using mongoose, it will be the where that your data base exist and connect in.


#### Extend DataSource

To Extend the datasource you need to import from `grand-connectors`

```typescript
import {DataSource} from "grand-connectors";

class MyDataSource extends DataSource{
}
```

#### DataSource Type

In extending the data source, you need to set one property called `type` this property specify the type of your data source it can be one of the following:

- mongoose
- sequelize

**Example**

```typescript
import {DataSource} from "grand-connectors";

class MyDataSource extends DataSource{
    type = "mongoose"
}
```

#### DataSource Method
The second thing you need to define is a method called `connect`, this method will be called when you run the project to connect your database either it's a mongodb or sql or any database you prefer, also you can assign any hooks you want inside this function

**Example**

```typescript

import {DataSource} from "grand-connectors";
import mongoose from "mongoose";
class MyDataSource extends DataSource{
    type = "mongoose"
    connect() {
        mongoose.connect("mongodb://localhost:27017/testDb").then(() => {
            console.log("connected");
        }).catch(err => {
            console.log(err);
        })
    }
}

```

#### Repository
After Extending your DataSource, you need now to extend your repository.


**Example**

```typescript
import {Repository} from "grand-connectors";

class UserRepository extends Repository{
}
```


### InjectDataSource

You need now to inject the datasource that you have created inside the repository, this can be done via a decorator called `InjectDataSource`

**Example**

```typescript

import {DataSource, Repository, InjectDataSource} 
from "grand-connectors";

import mongoose from "mongoose";

class MyDataSource extends DataSource{
    type = "mongoose"
    
    connect() {
        
        mongoose.connect("mongodb://localhost:27017/testDb").then(() => {
            console.log("connected");
        
        }).catch(err => {
            console.log(err);
        
        })
    }
}

class UserRepository extends Repository{
InjectDataSource(MyDataSource)
MyDataSource: MyDataSource
}
```

As you can see above, the datasource is injected inside the repository

### InjectModel

This is a second decorator that `grand-connectors` uses to inject the model you have created inside the repository

#### Create New Entity

To create a new entity, you need to import `Entoty` class from `grand-model` package

```typescript
import {Entity, property, settings, method} from "grand-model"

class UserEntity extends Entity{
    @property({required: true, type: "string"})
    email:string
    @property({required: true, type: String})
    name
    @method
    getName() {
        return this.name;
    }
}
```
#### Create New Model

Now you need to create a new model using mongoose

The mongoose model can uses the `grand-model` entity to load your schema definition inside mongoose schema

```typescript
import mongoose, {Document, Schema, Model} from "mongoose";
import {loadClass} from "grand-connectos";
import {Entity, property, settings, method} from "grand-model"

class UserEntity extends Entity{
    @property({required: true, type: "string"})
    email:string
    @property({required: true, type: String})
    name:string
    @method
    getName() {
        return this.name;
    }
}
interface IUser extends UserEntity, Document{}

const UserSchema = new mongoose.Schema(<any>UserEntity.prototype.Schema)

loadClass(UserSchema, UserEntity);

const User:Model<IUser> = mongoose.model<IUser>("User", UserSchema);
```

Now you need to inject the model you have created inside your repository

**Example**

```typescript
import {Repository, DataSource, InjectDataSource, InjectModel} from "grand-connectors";
class UserRepository extends Repository{
    @InjectDataSource(MyDataSource)
    MyDataSource: MyDataSource
    @InjectModel({Entity:UserENtity, Mode: User, DataSource: "MyDataSource"})
}
```


##### InjectModel Properties

InjectModel is a decorator you use to inject a new model intor your repository, this decorator takes one parameter which is an object, this object has the following properties:

|property|type|required|description|
|-|-|-|-|
|Entity|Entity|false|This is the Entity Class that you have created|
|Model|Model|false|this is a mongoose model or any model that you want to inject inside your repository|
|DataSource|string|true|the DataSource name that you have injected inside the repository before|

### InjectService
This decorator is exposed if you want to inject any class inside another class as a service, for example if you are using grandjs which is the core framework for building your routes, you can inject the repository you have created inside the grandjs Router as the following:

```typescript
import {InjectService} from "grand-connectors";
import {Router} from "grandjs";

@InjectService("UserRepository", "repositories", UserRepository)
class UserController{
    repositories: {
        UserRepository:UserRepository
    }
    constructor() {}
    createUser() {
        this.repositories.UserRepository.create();
    }
}

class UserRouter extends Router{
    services: {
        UserController:UserController
    }
    constructor(props) {
        super(props)
        console.log();
    }
    @GET({url: "/"})
    getUserPage() {
        this.services.UserController.createUser();
        return this.res.status(200).json({status: 200,message: "user page"})
    }
}
```

InjectService Parameters

This decorator uses the following parameters

|name|type|required|description|
|-|-|-|-|
|ServiceName|string|true|The name of the service that you want to inject inside the class|
|store|object|true|the store object that is exist inside the class that you want to add the service in as a property|
|Service|Service|true|The Service class that you want to inject|
