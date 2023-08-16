import { Interface } from "readline";

export default class Cli {
  constructor(private readline: Interface) {}

  /**
   * Wait a console line
   * @param {(line: string) => unknown} callback Callback function to return something to be written on the console
   * @returns {void}
   */
  waitLine(callback: (line: string) => unknown): void {
    this.readline.question("", (line) => {
      if (line) {
        const result = callback(line);
        this.readline.write(JSON.stringify(result));
        this.waitLine(callback);
      } else {
        this.readline.close();
      }
    });
  }
}
