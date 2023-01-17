# Database class

This database class is a general purpose class for creating and using mariadb/Mysql queries. The constructor takes all necessary information needed to open database connection as parameter objects.
The layer used between the database engine and our application.

Here is the option object for constructor:

```js
{
     host: "127.0.0.1", //the host of Db
    port: 3306, //the port of Db
    user: "zeke",
    password: "1234",
    database: "employeeDb",
    allowPublicKeyRetrieval: true,
}
```

### Method **doQuery(sql, parameters)**

### Method usage

```js
const result = await  db.doQuert("select * from employee);
```

```js
const result = await db.doQuert("select * from employee where id=?", [1]);
```

Select queries will return promise with a result as javascript object:

```js
{
  queryResult: [
    {
    id: 1,
    firstname: "Matt,
    lastname: "River,
    depertment: 'ict,
    salary: '5000.00'
 } ],
 resutSet: true
}

```

For example, an insert statement will return an object:

```js
const result = await db.doQuery('insert into employee values(?,?,?,?,?)', [123, 'Vera', 'River', 'ict, 6000]);
```

The statement to be sent to database engine will be:

insert into employee values (123, 'Vera', 'River', 'ict', 6000);

will return a promise with an object:

```js
{
    queryResult:{ rowsChanged:1, insertId:0, status:0},
    resultSet: false
}
```

```
in error case it rejects error-string
```
