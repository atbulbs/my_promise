declare type PromiseExecutor = (resolve: Function, reject: Function) => {}

export default class MyPromise {

  executor: PromiseExecutor

  constructor (executor: PromiseExecutor) {
    this.executor = executor
    try {
      this.executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (value: any) {}

  reject (reason: any) {}

}
