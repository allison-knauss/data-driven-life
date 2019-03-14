# Server for Meaning of Life

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
