const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let path, columns, filename, json = [];

const pathToRead = () => {
  return new Promise((resolve) => {
    rl.question('Path to read: ', (ans) => {
      path = ans;
      resolve();
    });
  });
};

const columnsToUse = () => {
  return new Promise((resolve) => {
    rl.question('Columns to use (comma separated): ', (ans) => {
      columns = ans.split(',');
      resolve();
    });
  });
};

const fileNameToUse = () => {
  return new Promise((resolve,) => {
    rl.question('Output filename: ', (ans) => {
      filename = ans;
      resolve();
    });
  });
};

const main = async () => {
  await pathToRead();
  await columnsToUse();
  await fileNameToUse();
  rl.close();
};

main().then(() => {
  fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => {
      try {
        let row = {};
        columns.forEach(column => {
          row[column] = data[column];
        });
        json.push(row);
      }
      catch (err) {
        //error handler
        console.error(err);
      }
    })
    .on('end', () => {
      fs.writeFile(`./${filename}.json`, JSON.stringify(json), null, (err) => {
        if (err) console.log(err);
      });
    });
});

