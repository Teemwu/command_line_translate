#!/usr/bin/env node
const chalk = require('chalk')
const ora = require('ora')
const request = require('request')

const word = process.argv[2]
const border = chalk.cyanBright(new Array(100).join('-'))

console.log(border)

const spinner = ora(chalk.blue('Translating ...')).start()
request.post({
    url: 'https://fanyi.sogou.com/reventondc/suggV2',
    form: {
        from: 'auto',
        to: 'zh-CHS',
        client: 'pc',
        text: word,
        pid: 'sogou-dict-vr',
        addSugg: 'on',
    }
}, function (error, res, body) {
    spinner.stop()
    const _body = JSON.parse(body)
    try {
        _body.data.forEach(i => {
            console.log(chalk.gray(i.k) + ':' + chalk.greenBright(i.v))
        })
    } catch (error) {
        console.log(_body)
    }
    console.log(border)
})

