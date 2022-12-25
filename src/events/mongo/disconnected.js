const chalk = require("chalk");

module.exports = {
    name: "disconnected", 
    execute() {
        console.log(chalk.green("Mongodb Database disconnected"))
    }
}