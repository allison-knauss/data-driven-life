# Server for Meaning of Life

## Running

To run, use: `npm start`

## Testing

To run unit tests, use: `npm test`

To run integraton tests, use: `cypress open`

## Technologies

- Node
- Express

## Universe data model

Universe state is in this form, where true cells on the grid are alive, and false cells are dead:
```
{
    "type": "universe",
    "id": {universeId},
    "grid": [
        [ true, true, false ],
        [ false, true, true ],
        [ true, false, false ]
    ]
}
```
