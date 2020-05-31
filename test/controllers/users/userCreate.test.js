const { app, User, request, id } = require('../../commonJest')

describe('user create',
    function () {
        let userData = {
            name: {
                first: 'Max',
                last: 'Mustermann',
            },
            email: `mustermann${id()}@gmail.com`,
            password: 'password'
        }

        it('creates a user', async function (done) {
            request(app)
                .post('/users/create')
                .send(userData)
                .then((res) => {
                    User.findOne({ email: userData.email }).then(insertedRecord => {
                        expect(insertedRecord).not.toBeNull()
                        expect(userData).not.toBeNull()
                        expect(insertedRecord.name.first).toBe(userData.first)
                        done()
                    })
                }).catch(e => done(e))
        })
    }
)