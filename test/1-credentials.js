const expect = require('chai').expect

const FICAPI = require('../build/index')
const client = new FICAPI()

/* eslint-disable no-unused-expressions */

describe('Credentials management', function () {
  it(`should return credentials object from getter method`, async function () {
    const { credentials } = client

    expect(credentials).to.be.an('object')
  })

  it(`should default to env vars on startup`, async function () {
    const { credentials } = client
    const { api_uid, api_key } = credentials

    expect(api_uid).to.equal(process.env.FATTURE_IN_CLOUD_API_UID)
    expect(api_key).to.equal(process.env.FATTURE_IN_CLOUD_API_KEY)
  })

  it(`should return a new object when calling getter method`, async function () {
    const modified = client.credentials

    modified.api_uid = 'mod'
    modified.api_key = 'mod'

    expect(client.credentials.api_uid).to.not.equal(modified.api_uid)
    expect(client.credentials.api_key).to.not.equal(modified.api_key)
  })

  it(`should modify credentials in the client when using setter methods`, async function () {
    const modified = {
      api_uid: 'mod',
      api_key: 'mod',
    }

    client.credentials = modified

    expect(client.credentials.api_uid).to.equal(modified.api_uid)
    expect(client.credentials.api_key).to.equal(modified.api_key)
  })

  after(function () {
    client.credentials = {
      api_uid: process.env.FATTURE_IN_CLOUD_API_UID,
      api_key: process.env.FATTURE_IN_CLOUD_API_KEY,
    }
  })
})
