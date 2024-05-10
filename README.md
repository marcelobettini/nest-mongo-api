## Mongo connection
file: app.module.ts

Configure the MongoDB DB connection.

- 1- <code>MongooseModule.forRoot('mongodb://127.0.0.1:27017/recipes')</code>:
This approach provides the MongoDB connection URI directly as a string argument to the forRoot() method of MongooseModule.
It's a simple and straightforward way to configure the MongoDB connection.
This method is suitable for cases where the connection parameters are static and don't need to be dynamically generated or fetched from an external source.

- 2- ```MongooseModule.forRootAsync({ useFactory: () => ({ uri: 'mongodb://127.0.0.1:27017/recipes', }), })```:
This approach uses the forRootAsync() method of MongooseModule, which allows for asynchronous configuration using a factory function.
The useFactory property specifies a factory function that returns an object with the MongoDB connection URI.
This method is suitable for cases where the connection parameters need to be dynamically generated or fetched from an external source, such as environment variables, configuration files, or external services.
It provides more flexibility and allows for more advanced configuration options compared to the synchronous forRoot() method.

* In summary: while both approaches achieve the same goal of configuring the MongoDB connection in a NestJS project with Mongoose, forRootAsync() offers more flexibility and is preferred when the connection parameters need to be dynamically generated or fetched from an external source.

---

## mongoModel.method() vs mongoModel.method().exec()
file: recipe.service.ts (and all service files that uses Mongoose methods).

Exec or not exec, that's the question...

- 1. ```this.recipeModel.find()```: This method initiates a query to find documents in the MongoDB collection represented by the recipeModel. It returns a Mongoose Query object, which allows you to further customize the query using chaining methods (such as select, where, sort, etc.).
- 2. ```this.recipeModel.find().exec()```: The exec() method is used to execute the query that was built using Mongoose query builder methods (like find, select, etc.). It returns a Promise that resolves to an array of documents that match the query criteria.

* In summary: The find() method returns a Mongoose Query object representing a query to find all documents in the Recipe collection. However, since you're returning it directly from the method, Mongoose will automatically execute the query for you when it's returned from the function. So, in this case, exec() is not explicitly needed because Mongoose will handle the execution internally. 
  However, using exec() explicitly can sometimes be useful when you want to handle the Promise returned by the query separately, allowing for more control over error handling or other asynchronous operations.
  So, both approaches achieve the same result, but using exec() gives you a bit more control over the execution of the query, while omitting it works fine in most cases where you just want to execute the query and return the result immediately.

