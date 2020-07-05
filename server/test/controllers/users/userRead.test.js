const { app, User, request, id } = require('../../commonJest')

describe('user read',
    function () {
        let userData = {
            name: {
                first: 'Max',
                last: 'Mustermann',
            },
            email: `mustermann${id()}@gmail.com`,
            password: 'password'
        }

        it('reads a user', async function (done) {
            const user = await User.create(userData)
            request(app)
                .get('/users/' + user.id)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    expect(res.text).toContain(userData.name.first)
                    expect(res.text).toContain(userData.name.last)
                    done()
                })
        })
    }
)