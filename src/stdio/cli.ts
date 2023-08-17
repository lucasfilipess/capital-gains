import { Interface } from "readline";

export default class Cli {
  constructor(private readline: Interface) {}

  /**
   * Wait a console line
   * @param {(line: string) => unknown} callback Callback function to return something to be written on the console
   * @returns {void}
   */
  waitLine(callback: (line: string) => unknown): void {
    this.readline.on("line", (line) => {
      if (line === "") {
        this.readline.close();
      } else {
        const result = callback(line);
        process.stdout.write(`${JSON.stringify(result)}\n`);
        this.readline.prompt();
      }
    });
    this.readline.prompt();
  }
}
