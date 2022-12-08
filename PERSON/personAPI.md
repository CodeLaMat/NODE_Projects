# PErson API

## person.json

```json
[
  { "firstname": "Matt", "lastname": "River", "age": "30" },
  { "firstname": "Jesse", "lastname": "River", "age": "10" },
  { "firstname": "Mary", "lastname": "Smith", "age": "50" }
]
```

## Datalayer for persons

## function **search (ket, value)**

Function returns an arrray of person objects. Search criterion is poassed to the function as parameters. If paramateres are missing, all persons will be returned in an array.

- search() will return an array of all persons
- search(key, value) returns an array of all matching persons

If no match found empty array is returned

## Server usage

## search all persons

http://localhost:3000/persons

same origin fetch: /persons

## search by firstname

http://localhost:3000/persons/firstname?value=Matt

same origin fetch: /persons/firstname?value=Matt

## search by lastname

http://localhost:3000/persons/lastname?value=River

same origin fetch: /persons/lastname?value=River

## search by age

http://localhost:3000/persons/age?value=30

same origin fetch: /persons/age?value=30

## SPA (Single PAge Application)

uses fetch to get data to the browser

## Additional info

Server serves also styles and javaScript
