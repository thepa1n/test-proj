const task = async <T>(value: T) => {
  await new Promise((r) => setTimeout(r, 100 * Math.random()));
  console.log(value);
};

/*
  async function start() {
    await Promise.all([
      task(1),
      task(2),
      task(3),
      task(4),
    ]);
  }
*/

type FuncReturnPromise = () => Promise<any>;

class AsyncQueue {
  private _taskList: Array<FuncReturnPromise> = [];
  private _total: number = 0;
  private _runningTasks: Array<FuncReturnPromise> = [];
  private _completedTasks: Array<FuncReturnPromise> = [];

  public async add(callback: () => Promise<any>): Promise<void> {
    this._taskList.push(callback);

    this._total++;

    this._run();
  }

  private _canRunNext(): number {
    return ((this._runningTasks.length < 1) && this._taskList.length);
  }

  private _run() {
    while (this._canRunNext()) {
      const callback = this._taskList.shift();
      const promise = callback();

      promise.then(() => {
        this._completedTasks.push(this._runningTasks.shift());

        this._run();
      });

      this._runningTasks.push(callback);
    }
  }
}

async function start() {
  const queue = new AsyncQueue();

  await Promise.all([
    queue.add(() => task(1)),
    queue.add(() => task(2)),
    queue.add(() => task(3)),
    queue.add(() => task(4)),
  ]);
}

start();

