# Car storage API

## **getAllModels()**

return the names of all models in storage as an array of strings.
The name is added to the array only once. If nothing found, return an empty array.

## **getCar(key, value)**

get all cars that matches the given key-vakue pair.

- returns car objects in an array
- if there is no match, an empty array is returned

### Example

```js
getCar("model", "Fast GT");
getCars("licence", "ABC-1");
```

## **getAllaCars()**

returns all car objects in an array or an empty array
