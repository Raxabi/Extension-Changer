import { readdir, lstat, copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { argv } from "node:process";

const paramIsDir = await lstat(argv[2]);
const {pathname: __dirname} = new URL(paramIsDir, import.meta.url)
/**
 * 
 * @param {String} path The path where the program will work
 * @param {String} fileExtension The extension that will be replaced
 */
async function replacer(cliArgument/* , fileExtension */) {

    // Adding slash at the final of the cli argument
    const workDir = `${cliArgument}/`;

    const copyDir = "renamedFiles/"

    // Check if the cli argument is a File
    if (paramIsDir.isFile()) {
        throw new Error("The path must be a directory and not a file");
    }

    // Getting a array making suitable the reading of the directory
    const reading = await readdir(resolve(__dirname, workDir));

    // Creating the directory if it wasn't previously created
    if (!existsSync(workDir + copyDir)) {
        mkdir(workDir + copyDir)
    }

    // skipping of copy and rename the items that his type is a directory
    reading.forEach(async item => {
        if ((await lstat(workDir + item)).isFile()) {
            console.log(`${item} was sucessfully converted`)
            await copyFile(workDir + item, workDir + `${copyDir}/${item.replace(".txt", ".sql")}`);
        }
    });
}

replacer(argv[2]);