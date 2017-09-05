const fs = require('fs');

let readFile = fs.readFileSync('./input.txt','utf-8')
let input_array = readFile.split('\n');

const main = () => {
  let params = input_array[0].split(' ');
  let n = parseInt(params[0]);
  let k = parseInt(params[1]);
  let arr = input_array[1].split(' ');

  if (!(arr.length === n)) {
    console.log('** error ** mismatch in number of data elements');
    return;
  }

  fs.open('output.txt', 'w', (err, fd) => {
    if (err) throw err;
 
    windowOfDays(n, k, arr, fd);
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
}

const sumOfDays = (i) => {
  return (i * (i + 1) / 2); 
}

const windowOfDays = (n, k, arr, fd) => {

// initialize window
  let winOfDays = [];

  let totalCount = 0;
  let dayCounter = 0;
  let daySwitch = 0;
  let newSwitch = 0;
  for (let count = 0; count < k - 1; count ++) {
    if (arr[count] < arr[count + 1]) {
        newSwitch = 1;
    } else if (arr[count] > arr[count + 1]) {
      newSwitch = -1;
    } else {
      newSwitch = 0;
    }
    if (newSwitch === daySwitch) {
      dayCounter++;
    } else {
      if (dayCounter) winOfDays.push([dayCounter, daySwitch])
      totalCount += daySwitch * sumOfDays(dayCounter);
      daySwitch = newSwitch;
      dayCounter = 1;
    }
  }
  winOfDays.push([dayCounter, daySwitch])
  totalCount += daySwitch * sumOfDays(dayCounter);
  // console.log(winOfDays);
  // process.stdout.write('' + winOfDays + '\n');
  fs.write(fd, totalCount + '\n', (err) => {
    if (err) throw err;
  });
  
  for (let idx = 0; idx < n - k; idx++) {
    if (arr[idx + k - 1] < arr[idx + k]) {
      newSwitch = 1;
    } else if (arr[idx + k - 1] > arr[idx + k]) {
      newSwitch = -1;
    } else {
      newSwitch = 0;
    }
    if (newSwitch === winOfDays[winOfDays.length - 1][1]) {
      winOfDays[winOfDays.length - 1][0]++;
    } else {
      winOfDays.push([1, newSwitch]);
    }
    totalCount += winOfDays[winOfDays.length - 1][1] * winOfDays[winOfDays.length - 1][0];
    totalCount -= winOfDays[0][1] * winOfDays[0][0];
    winOfDays[0][0]--;
    if (!winOfDays[0][0]) winOfDays.shift();

    fs.write(fd, totalCount + '\n', (err) => {
      if (err) throw err;
    });  
  }
  return;
}

main();
