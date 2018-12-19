const expect = require('chai').expect

const client = require('../index')

let responseCount

/* eslint-disable no-unused-expressions */

function generateRequests (n, start) {
  const promises = []

  for (let i = 0; i < n; i++) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await client.listaAnagraficaFornitori()
        responseCount += 1
        const now = Date.now()
        const seconds = (now - start) / 1000
        console.info(`Response ${responseCount}/${n} in ${seconds} seconds`)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })

    promises.push(promise)
  }

  return promises
}

describe('Rate limiting - variables management', function () {
  let FATTURE_IN_CLOUD_API_RPM
  let FATTURE_IN_CLOUD_API_RPH

  before(function () {
    ({
      FATTURE_IN_CLOUD_API_RPM,
      FATTURE_IN_CLOUD_API_RPH,
    } = process.env)
  })

  it(`should return rateLimiting object from getter method`, async function () {
    const { rateLimiting } = client

    expect(rateLimiting).to.be.an('object')
  })

  it('should have default rate limiting set to 30rpm and 500rph', function () {
    delete process.env.FATTURE_IN_CLOUD_API_RPM
    delete process.env.FATTURE_IN_CLOUD_API_RPH

    const newClient = new client.Class()
    const { rateLimiting } = newClient
    const { rpm, rph } = rateLimiting //

    expect(rpm).to.be.equal(30)
    expect(rph).to.be.equal(500)
  })

  it(`should set to env vars on startup`, async function () {
    process.env.FATTURE_IN_CLOUD_API_RPM = 1
    process.env.FATTURE_IN_CLOUD_API_RPH = 1

    const newClient = new client.Class()
    const { rateLimiting } = newClient
    const { rpm, rph } = rateLimiting // eslint-disable-line camelcase

    expect(rpm).to.equal(process.env.FATTURE_IN_CLOUD_API_RPM)
    expect(rph).to.equal(process.env.FATTURE_IN_CLOUD_API_RPH)
  })

  it(`should return a new object when calling getter method`, async function () {
    const modified = client.rateLimiting

    modified.rpm = 1
    modified.rph = 1

    expect(client.rateLimiting.rpm).to.not.equal(modified.rpm)
    expect(client.rateLimiting.rph).to.not.equal(modified.rph)
  })

  it(`should modify rateLimiting in the client when using setter methods`, async function () {
    const modified = {
      rpm: 1,
      rph: 1,
    }

    client.rateLimiting = modified

    expect(client.rateLimiting.rpm).to.equal(modified.rpm)
    expect(client.rateLimiting.rph).to.equal(modified.rph)
  })

  afterEach(function () {
    process.env.FATTURE_IN_CLOUD_API_RPM = FATTURE_IN_CLOUD_API_RPM
    process.env.FATTURE_IN_CLOUD_API_RPH = FATTURE_IN_CLOUD_API_RPH
  })

  after(function () {
    client.rateLimiting = {
      rpm: process.env.FATTURE_IN_CLOUD_RPM || 30,
      rph: process.env.FATTURE_IN_CLOUD_RPH || 500,
    }
  })
})

describe('Rate limiting - functionality', function () {
  beforeEach(function () {
    responseCount = 0
  })

  it(`should not go over quota with 31 concurrent requests (30rpm)`, async function () {
    this.timeout(0)

    const start = Date.now()
    const promises = generateRequests(31, start)
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

  it(`should not go over quota with 501 concurrent requests (500rph)`, async function () {
    this.timeout(0)

    const promises = generateRequests(501)
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
