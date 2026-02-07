const fs = require("fs");
const { execSync } = require("child_process");

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const updateDependencies = () => {
  const dependencies = Object.keys(packageJson.dependencies)
  const devDependencies = Object.keys(packageJson.devDependencies)
  const deps = dependencies.concat(devDependencies)
  const command = `yarn add ${ deps.join(" ")}`
  execSync(command, { stdio: "inherit" })
}

updateDependencies()

console.log("All dependencies have been updated to their latest versions.");
