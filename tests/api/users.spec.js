const server = require('../../server')
const chai = require("chai")

const mocha = require("mocha")
const expect = chai.expect;
const supertest = require("supertest")(server)

describe('Route tests',()=>{
    describe('users',()=>{
        it('responds with the right info',()=>{
            return supertest.post('/api/users').send({email:"test@gmail.com",name:"coffeeJean"})
            .expect(201)
            .expect((res)=>{
                expect(res.body).to.equal({email:"test@gmail.com",name:"coffeeJean"})
            })
        })
    })
})