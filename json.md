# JSON (JavaScript Object Notation)

## Documentation

https://www.json.org/json-en.html

## File extension

.json

## Values

- string
- number
- array
- object
- true
- false
- null

### Examples

### String

Must be doublequoted

empty string: ""

```json
"this a string"
"here is a \"quote\" in the 'middle'"
"hearts symbol is \u2665"
```

### Number

- no leading +
- only one leading 0
- decimal delimiter is .

These are allowed:

```json
0, 0.5, 345.567, 1200, 1.5E54, 2E+2, -1, -23.4, -0.898,
```

Thease are not allowed

```json
000.34, +34, 000500,
```

### Array

Array begins with [ and ends with]. Values in the array are separated by a comma.

### Examples

```json
[1,2,3,4,5]
["some text", "some string"],
[true, false, null],
[
    {"name": "Leila"},
    {"age": 19}
]
[
    [1,2,3,4],
    [4,5,6]
]

##
```
