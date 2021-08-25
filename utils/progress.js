const cliProgress = require("cli-progress");

class Bar {
  constructor(start) {
    this.start = start;
    this.value = 0;
    this.bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
    this.bar.start(start, 0, {
      speed: "N/A",
    });
  }
  stopBar() {
    this.bar.stop();
  }

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
