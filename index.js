const windowOfDays = (n, k, arr) => {
  let results = [];
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
    results.push(totalCount);
  }
  return results;
}

let test_n = 5;
let test_k = 3;
let test_array = [188930, 194123, 201345, 154243, 154243];

console.log(windowOfDays(test_n, test_k, test_array));
