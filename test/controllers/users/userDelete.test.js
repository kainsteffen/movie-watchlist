const { app, User, request, id } = require('../../commonJest')

describe('user delete',
    function () {
        let userData = {
            name: {
                first: 'Max',
                last: 'Mustermann',
            },
            email: `mustermann${id()}@gmail.com`,
            password: 'password'
        }

        it('deletes user', async done => {
            const user = await User.create(userData)
            request(app)
                .delete(`/users/${user.id}/delete`)
                .then((res) => {
                    User.findOne({ email: user.email }).then(u => {
                        expect(u).toBeNull()
                        done()
                    }).catch(e => done(e))
                })
        })
    }
)