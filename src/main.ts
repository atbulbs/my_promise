declare type PromiseExecutor = (resolve: Function, reject: Function) => {}

export default class MyPromise {

  private executor: PromiseExecutor
  private PENDING: string = 'PENDING'
  private FULFILLED: string = 'FULFILLED'
  private REJECTED: string = 'REJECTED'
  private state: string
  private value: any
  private reason: any

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
      this.value = value
    }
  }

  reject (reason: any) {
    if (this.state === this.PENDING) {
      this.state = this.REJECTED
      this.reason = reason
    }
  }

  then (onFulfilled: Function, onRejected: Function) {
    if (this.state === this.FULFILLED) {
      onFulfilled(this.value)
    } else if (this.state === this.REJECTED) {
      onRejected(this.reason)
    }
  }

}
