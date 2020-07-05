const { app, User, request, id } = require('../../commonJest')

describe('user update',
    function () {
        let userData = {
            name: {
                first: 'Max',
                last: 'Mustermann',
            },
            email: `mustermann${id()}@gmail.com`,
            password: 'password'
        }

        it('changes first name', async function (done) {
            const user = await User.create(userData)
            const newName = 'Tom'
            request(app)
                .put(`/users/${user.id}/update`)
                .send({ first: newName })
                .then((res) => {
                    User.findById(user.id)
                        .exec()
                        .catch(e => done(e))
                        .then(u => {
                            expect(u.name.first).toBe(newName)
                            done()
                        })
                })
        })
    }
)