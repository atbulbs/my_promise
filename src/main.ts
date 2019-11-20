declare type PromiseExecutor = (resolve: Function, reject: Function) => {}

export default class MyPromise {

  private executor: PromiseExecutor
  private PENDING: string = 'PENDING'
  private FULFILLED: string = 'FULFILLED'
  private REJECTED: string = 'REJECTED'
  private state: string

  constructor (executor: PromiseExecutor) {
    this.state = this.PENDING
    this.executor = executor
    try {
      this.executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (value: any) {
    if (this.state === this.PENDING) {
      this.state = this.FULFILLED
    }
  }

  reject (reason: any) {
    if (this.state === this.PENDING) {
      this.state = this.REJECTED
    }
  }

}
