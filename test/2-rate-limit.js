const expect = require('chai').expect

const clients = [
  require('../index'),
  require('../index'),
  require('../index'),
  require('../index'),
]

const NUMBER_OF_CALLS = 10

/* eslint-disable no-unused-expressions */

function generateRequests (client, promises) {
  for (let i = 0; i < NUMBER_OF_CALLS; i++) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await client.listaAnagraficaFornitori()
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })

    promises.push(promise)
  }
}

describe('Rate limiting at 30 rpm', function () {
  it(`should not go over quota with ${NUMBER_OF_CALLS * clients.length} concurrent requests`, async function () {
    this.timeout(90000)

    const promises = []
    for (let i = 0; i < clients.length; i++) {
      generateRequests(clients[i], promises)
    }
    let err = null
    let results = null

    try {
      results = await Promise.all(promises)
    } catch (e) {
      err = e
    }

    expect(err).to.be.null
    expect(results).to.be.an('array')
    results.forEach((result) => {
      expect(result).to.be.an('object')
      const { success } = result
      expect(success).to.be.true
    })
  })
})
