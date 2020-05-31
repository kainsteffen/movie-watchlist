const { app, Watchlist, request, id } = require('../../commonJest')

describe('watchlist update',
    function () {
        let watchlistData = {
            name: `Watchlist ${id()}`,
        }

        it('changes watchlist name', async function (done) {
            const watchlist = await Watchlist.create(watchlistData)
            const newName = 'Cooler Watchlist'
            request(app)
                .put(`/watchlist/${watchlist.id}/update`)
                .send({ name: newName })
                .then((res) => {
                    Watchlist.findById(watchlist.id)
                        .exec()
                        .catch(e => done(e))
                        .then(result => {
                            expect(result.name).toBe(newName)
                            done()
                        })
                })
        })
    }
)