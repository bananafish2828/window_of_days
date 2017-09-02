const fs = require('fs');

let readFile = fs.readFileSync('./input.txt','utf-8')
let input_array = readFile.split('\n');

const main = () => {
  let params = input_array[0].split(' ');
  let n = parseInt(params[0]);
  let k = parseInt(params[1]);
  let arr = input_array[1].split(' ');

  let results = windowOfDays(n, k, arr);

  process.stdout.write('' + results);
  fs.writeFile('output.txt', results, 'utf-8', (err) => {
    if (err) throw err;
  });
}  

const windowOfDays = (n, k, arr) => {
  let results = '';
  if (!(arr.length === n)) {
    console.log('** error ** mismatch in number of data elements');
    return;
  }
  for (let idx = 0; idx < n - k + 1; idx++) {
    let totalCount = 0;
    let dayCounter = 0;
    let daySwitch = 0;
    let newSwitch = 0;
    for (let count = 0; count < k - 1; count ++) {
      if (arr[idx + count] < arr[idx + count + 1]) {
        newSwitch = 1;
      } else if (arr[idx + count] > arr[idx + count + 1]) {
        newSwitch = -1;
      } else {
        newSwitch = 0;
      }
      if (newSwitch === daySwitch) {
        dayCounter++;
      } else {
        totalCount += daySwitch * (dayCounter * (dayCounter + 1)) / 2;
        daySwitch = newSwitch;
        dayCounter = 1;
      }
    }
    totalCount += daySwitch * (dayCounter * (dayCounter + 1)) / 2;
    results += totalCount + '\n'
  }
  return results;
}

main();
