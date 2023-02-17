const fs = require("fs");

const file1 = process.argv[process.argv.length - 2];
const file2 = process.argv[process.argv.length - 1];

fs.readFile(file1, "utf-8", (err, file1) => {
  if (err) throw err;

  fs.readFile(file2, "utf-8", (err, file2) => {
    if (err) throw err;

    const array1 = file1.split("\n");
    const array2 = file2.split("\n");

    const formatedArr1 = [];
    const formatedArr2 = [];

    // remove Carriage Return(\r) form the arrays
    for (const i of array1) {
      formatedArr1.push(i.replaceAll("\r\n", "\n").replaceAll("\r", ""));
    }

    for (const i of array2) {
      formatedArr2.push(i.replaceAll("\r\n", "\n").replaceAll("\r", ""));
    }

    // check for difference in each file
    const arrOneDiff = formatedArr1.filter((x) => !formatedArr2.includes(x));
    const arrTwoDiff = formatedArr2.filter((x) => !formatedArr1.includes(x));

    console.log(arrOneDiff);
    console.log(arrTwoDiff);
  });
});
