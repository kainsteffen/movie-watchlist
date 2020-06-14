const { app, Watchlist, request, id } = require('../../commonJest')

describe('watchlist read',
    function () {
        let watchlistData = {
            name: `Watchlist ${id()}`,
        }

        it('reads a watchlist', async function (done) {
            const watchlist = await Watchlist.create(watchlistData)
            request(app)
                .get('/watchlists/' + watchlist.id)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    expect(res.text).toContain(watchlistData.name)
                    done()
                })
        })
    }
)