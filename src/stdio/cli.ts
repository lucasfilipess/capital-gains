import { Interface } from "readline";

export default class Cli {
  constructor(private readline: Interface) {}

  waitLine(callback: (line: string) => string) {
    this.readline.question("", (line) => {
      if (line) {
        const result = callback(line);
        this.readline.write(result);
        this.readline.write("\r");
        this.waitLine(callback);
      } else {
        this.readline.close();
      }
    });
  }
}
