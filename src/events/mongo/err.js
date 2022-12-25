const chalk = require("chalk");

module.exports = {
    name: "err", 
    execute() {
        console.log(chalk.green("Mongodb Database erorr :("))
    }
}