declare type PromiseExecutor = (resolve: Function, reject: Function) => {}

export default class MyPromise {

  private executor: PromiseExecutor
  private PENDING: string = 'PENDING'
  private FULFILLED: string = 'FULFILLED'
  private REJECTED: string = 'REJECTED'
  private state: string
  private value: any
  private reason: any
  private handleValueList: Array<{():any}> = []
  private handleReasonList: Array<{():any}> = []


  constructor (executor: PromiseExecutor) {
    this.state = this.PENDING
    this.executor = executor
    try {
      // 立即执行函数调用, 并传入resolve和reject
      this.executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 接收在立即执行函数里传入的值
  resolve (value: any) {
    if (this.state === this.PENDING) {
      this.state = this.FULFILLED
      this.value = value
      // 执行then里暂存的handleValue
      this.handleValueList.forEach(handleValue => handleValue())
    }
  }

  // 接收在立即执行函数里传入的值
  reject (reason: any) {
    if (this.state === this.PENDING) {
      this.state = this.REJECTED
      this.reason = reason
      // 执行then里暂存的handleReson
      this.handleReasonList.forEach(handleReason => handleReason())
    }
  }

  then (handleValue: Function, handleReason: Function) {
    // 待定状态, 暂存handleValue和handleReason
    if (this.state === this.PENDING) {
      this.handleValueList.push(() => {
        handleValue(this.value)
      })
      this.handleReasonList.push(() => {
        handleReason(this.reason)
      })
      // 履行状态, 执行handleValue, 传入resovle接收的值
    } else if (this.state === this.FULFILLED) {
      handleValue(this.value)
      // 拒绝状态, 执行handleReason, 传入reject接收的值
    } else if (this.state === this.REJECTED) {
      handleReason(this.reason)
    }
  }

}
