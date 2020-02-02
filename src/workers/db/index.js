import PromiseWorker from 'promise-worker'
import Worker from 'worker-loader!./worker'

const worker = new Worker()
const promiseWorker = new PromiseWorker(worker)

const send = ({ type, data }) => promiseWorker.postMessage({
    type,
    data
})

export default {
    send
}