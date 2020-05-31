const { app, Watchlist, request, id } = require('../../commonJest')

describe('watchlist delete',
    function () {
        let watchlistData = {
            name: `Watchlist ${id()}`,
        }

        it('deletes a watchlist', async done => {
            const watchlist = await Watchlist.create(watchlistData)
            request(app)
                .delete(`/watchlist/${watchlist.id}/delete`)
                .then((res) => {
                    Watchlist.findOne({ name: watchlist.name }).then(result => {
                        expect(result).toBeNull()
                        done()
                    }).catch(e => done(e))
                })
        })
    }
)