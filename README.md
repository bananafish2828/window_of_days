# window_of_days

instructions:
1)  download index.txt and input.txt into same directory
2)  rename index.txt to index.js
3)  enter data to be used in input.txt
4)  if you're using node.js, in CLI type 'node index' otherwise please visit https://nodejs.org/en/download/ and download and install node first.
5)  output.txt should be created with the data results

methodology:
there are 2 parts to the problem
1) i/o text file
2) logic solution to create the metric

i/o text file
this was pretty straightforward.  node has a file-system library that allows users to read and write files.  the data is space delimited so just needed to separate the data by lines and then by space into a format which my formula would be able to receive.  results are then displayed in CLI as well as written to a file 'output.txt'

logic solution
the solution has O(n) time complexity.
1) create the 1st window by iterating through the 1st k days.
2) within k, k can be separated by 'm' number of consecutive up/down/even days, such that we get k = m1 + m2 + m3 + ...
3) we create an array(queue) of the tuples of the number of consecutive up/down/even days and it's multiplier (1 for up, -1 for down, 0 for even)
4) subranges can be calculated by the sum of its days, e.g if m = 1, subrange of m = 1; if m = 2, subrange of m = 1 + 2 = 3; if m = 3, subrange of m = 1 + 2 + 3 = 6; which can be refactored to subrange of m = m * (m + 1) / 2
5) we get the total net subrange count by adding the subrange * its multiplier

6) now we iterate through the array of data from 0 to n - k
7) to get the new total for the day, we only need to reduce the 1st day and compare the last day of the window to the following day
  a) since subranges are a sum of its days, for the last day of the window we can add the new consecutive days * its multiplier to the total (push a new tuple if the direction changes)
  b) similarly the 1st element we can subtract the number of consecutive days * its multiplier from the total, and reduce the consecutive days by 1.  if the consecutive days reaches 0, we remove the element from the queue.

this would produce the total net subranges for each day.


