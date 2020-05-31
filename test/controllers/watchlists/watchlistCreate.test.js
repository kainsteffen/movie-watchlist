const { app, Watchlist, request, id } = require('../../commonJest')

describe('watchlist create',
    function () {
        let watchlistData = {
            name: `Watchlist ${id()}`,
        }

        it('creates a watchlist', async function (done) {
            request(app)
                .post('/watchlist/create')
                .send(watchlistData)
                .then((res) => {
                    Watchlist.findOne({ name: watchlistData.name }).then(insertedRecord => {
                        expect(insertedRecord).not.toBeNull()
                        expect(watchlistData).not.toBeNull()
                        expect(insertedRecord.name).toBe(watchlistData.name)
                        done()
                    })
                }).catch(e => done(e))
        })
    }
)