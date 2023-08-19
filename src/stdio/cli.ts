import { Interface } from "readline";

import { Operation, Tax } from "@/types";

const createCli = (readline: Interface) => ({
  /**
   * Wait a console line
   * @param { (line: Operation[]) => Tax[]} callback Callback function to return tax be written on the console
   * @returns {void}
   */
  waitLine(callback: (line: Operation[]) => Tax[]): void {
    readline.on("line", (line) => {
      if (line === "") {
        readline.close();
      } else {
        const result = callback(JSON.parse(line));
        process.stdout.write(`${JSON.stringify(result)}\n`);
        readline.prompt();
      }
    });
    readline.prompt();
  },
});

export default createCli;
