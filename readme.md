# csv-to-json

Simple node command line utility for parsing csv files to json.

Btw, `csv-parser` does all the heavy lifting. I just wrapped it in a useful way.

#### How to use

```
npm i
npm run start

Path to read: ./pokemon.csv
Columns to use (comma separated): id,identifier,order
Output filename: pokemon
```

Example output [here](./pokemon.json).