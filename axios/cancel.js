// 取消重复请求功能

import axios from 'axios'

const http = axios.create()

const pendingReqs = []

http.interceptors.request.use((config) => {
    const source = axios.cancelToken.source()
    config.cancelToken = source.token


    const md5Key = cryptohelper.encrypt(config.url + (config.method || ''))

    const hits = pendingReqs.filter((item) => item.md5Key == md5Key)

    if (hits.length > 0) {
        hits.forEach((item) => {
            item.source.cancel(JSON.stringify({
                type: CANCEL.REPEAT,
                data: '重复请求'
            }))
        })
    }

    pendingReqs.push({
        md5Key,
        source
    })
    return config
})


http.interceptors.response.use((config) => {
    const md5Key = cryptohelper.encrypt(config.url + (config.method || ''))

    const index = pendingReqs.findIndex((item) => item.md5Key == md5Key)

    if (index > -1) {
        pendingReqs.splice(index, 1)
    }
})