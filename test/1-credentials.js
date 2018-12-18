const expect = require('chai').expect

const client = require('../index')

/* eslint-disable no-unused-expressions */

describe('Get credentials from process.env', function () {
  it(`should return an object with properties set`, async function () {
    const { credentials } = client

    expect(credentials).to.be.an('object')
    const { api_uid, api_key } = credentials // eslint-disable-line camelcase
    expect(api_uid).to.be.a('string')
    expect(api_key).to.be.a('string')
    expect(api_uid).to.equal(process.env.FATTURE_IN_CLOUD_API_UID)
    expect(api_key).to.equal(process.env.FATTURE_IN_CLOUD_API_KEY)
  })
})

describe('Modifying returned credentials', function () {
  it(`should not modify them in the client`, async function () {
    const modified = client.credentials

    modified.api_uid = 'mod'
    modified.api_key = 'mod'

    expect(client.credentials.api_uid).to.not.equal(modified.api_uid)
    expect(client.credentials.api_key).to.not.equal(modified.api_key)
  })
})

describe('Modifying credentials via setter', function () {
  it(`should modify them in the client`, async function () {
    const modified = 'mod'

    client.credentials = {
      api_uid: modified,
      api_key: modified,
    }

    expect(client.credentials.api_uid).to.equal(modified)
    expect(client.credentials.api_key).to.equal(modified)
  })

  after(function () {
    client.credentials = {
      api_uid: process.env.FATTURE_IN_CLOUD_API_UID,
      api_key: process.env.FATTURE_IN_CLOUD_API_KEY,
    }
  })
})
