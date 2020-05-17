const { db } = require('../commonJest')
describe('insert', () => {
  it('creating a mock watchlist and check if it worked', async done => {
    const watchlists = db.collection('watchlists')

    const randomAudienceAge = Math.floor(Math.random()* (18));
    const mockWatchlist = {name: 'The Best Love Movies of all Time', genre: "Romance", intendedAudience: randomAudienceAge }

    await watchlists.insertOne(mockWatchlist)

    const insertedWatchlist = await watchlists.findOne({name: 'The Best Love Movies of all Time'})
    expect(insertedWatchlist).toEqual(mockWatchlist)
    done()
  })
})
