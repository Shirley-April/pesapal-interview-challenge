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

    const mergedArray = [];

    const shorterArrayLength = Math.min(
      formatedArr1.length,
      formatedArr2.length
    );

    for (let i = 0; i < shorterArrayLength; i++) {
      if (formatedArr1[i] === formatedArr2[i]) {
        mergedArray.push(formatedArr1[i]);
      } else {
        mergedArray.push(formatedArr1[i]);
        mergedArray.push(formatedArr2[i]);
      }
    }

    if (formatedArr1.length > formatedArr2.length) {
      mergedArray.push(...formatedArr1.slice(shorterArrayLength));
    } else if (formatedArr2.length > formatedArr1.length) {
      mergedArray.push(...formatedArr2.slice(shorterArrayLength));
    }

    const result = mergedArray.join("\n");

    if (process.argv[2] === "diff") {
        console.log(
          `${arrOneDiff.join("\n")}\n ----------------- \n${arrTwoDiff.join(
            "\n"
          )}`
        );
      } else if (process.argv[2] === "patch") {
        fs.writeFile(process.argv[3], result, (err) => {
          if (err) throw err;
          console.log("Patching files");
        });
      } else {
        console.log(
          "Something went wrong. Kindly follow the readme file instructions to run the program"
        );
      }
  
      // if (process.argv[2] === "patch") {
      //   fs.writeFile(process.argv[3], result, (err) => {
      //     if (err) throw err;
      //     console.log("Text appended successfully.");
      //   });
      // } else {
      //   console.log("False");
      // }
  
      // console.log(mergedArray.join("\n"));
  });
});
