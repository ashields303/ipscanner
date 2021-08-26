const cliProgress = require("cli-progress");

/**
 * Class for creating an instance of the CLI Progress bar used when fuzzing ips for Directory Traversal
 */
class Bar {
  /**
   * Creates a progress bar to display on the command line
   * @param {number} start sets the start value for how many 'ticks' there are for a progress bar
   */
  constructor(start) {
    this.start = start;
    this.value = 0;
    this.bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
    this.bar.start(start, 0, {
      speed: "N/A",
    });
  }

  /**
   * Stops the progress bar at it's current progress
   */
  stopBar() {
    this.bar.stop();
  }

  /**
   * Increments the start value of the progress bar by 1, stops the progress bar if start value surpasses total progress
   */
  increment() {
    this.value++;
    this.bar.update(this.value);
    if (this.value >= this.bar.getTotal()) {
      this.stopBar();
    }
  }
}

module.exports = {
  Bar,
};
