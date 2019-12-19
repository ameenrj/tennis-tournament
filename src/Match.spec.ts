import Match from './Match'

const p1 = 'Gandalf'
const p2 = 'Sauron'

describe('Match', () => {

  describe('getScore', () => {

    it('new match should give correct score', async () => {
      const match = newMatch()

      const result = match.score()
      expect(result).toBe('0-0, 0-0')
    })

    it('new match should give correct score', async () => {
      const match = newMatch()
      expect(match.score()).toBe('0-0, 0-0')
    })

    it('players winning games should return correct scoring', async () => {
      const match = newMatch()
      expect(match.score()).toBe('0-0, 0-0')

      match.pointWonBy(p1)
      match.pointWonBy(p2)
      expect(match.score()).toBe('0-0, 15-15')

      match.pointWonBy(p1)
      match.pointWonBy(p2)
      expect(match.score()).toBe('0-0, 30-30')
    })

    it('when at least 3 points have been scored by each player and scores are tied should return deuce', async () => {
      const match = newMatch()

      match.pointWonBy(p1)
      match.pointWonBy(p1)

      match.pointWonBy(p2)
      match.pointWonBy(p2)

      expect(match.score()).toBe('0-0, 30-30')

      match.pointWonBy(p1)
      match.pointWonBy(p2)

      expect(match.score()).toBe('0-0, Deuce')
    })

    it('when a player leads by one after 3 points should return advantage', async () => {
      const match = newMatch()

      match.pointWonBy(p1)
      match.pointWonBy(p1)
      match.pointWonBy(p1)

      match.pointWonBy(p2)
      match.pointWonBy(p2)
      match.pointWonBy(p2)

      expect(match.score()).toBe('0-0, Deuce')

      match.pointWonBy(p1)
      expect(match.score()).toBe(`0-0, Advantage ${p1}`)

      match.pointWonBy(p2)
      expect(match.score()).toBe(`0-0, Deuce`)

      match.pointWonBy(p2)
      expect(match.score()).toBe(`0-0, Advantage ${p2}`)
    })

    describe('winning the game', () => {

      it('when a player leads by two after 3 points should win the set', async () => {
        const match = newMatch()

        match.pointWonBy(p1)
        match.pointWonBy(p1)
        match.pointWonBy(p1)

        match.pointWonBy(p2)
        match.pointWonBy(p2)
        match.pointWonBy(p2)

        expect(match.score()).toBe('0-0, Deuce')

        match.pointWonBy(p1)
        expect(match.score()).toBe(`0-0, Advantage ${p1}`)

        match.pointWonBy(p1)
        expect(match.score()).toBe('1-0')
      })

      it('when a player wins 5 games straight should win the set', async () => {
        const match = newMatch()

        match.pointWonBy(p2)
        match.pointWonBy(p2)
        match.pointWonBy(p2)
        match.pointWonBy(p2)
        match.pointWonBy(p2)

        expect(match.score()).toBe('0-1')
      })

      describe('tieBreak game', () => {

        let tieBreakMatch

        beforeEach(() => {
          tieBreakMatch = newMatch()

          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)

          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
        })

        it('when players are tied at 6-6, should play tiebreak game', async () => {
          expect(tieBreakMatch.score()).toBe('0-0, 0-0')
        })

        it('when tiebreak game is being played should count scores from 0', async () => {
          tieBreakMatch.pointWonBy(p1)
          expect(tieBreakMatch.score()).toBe('0-0, 1-0')

          tieBreakMatch.pointWonBy(p2)
          expect(tieBreakMatch.score()).toBe('0-0, 1-1')

          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          expect(tieBreakMatch.score()).toBe('0-0, 3-3')
        })

        it('when a player wins 7 points straight should win game', async () => {
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          expect(tieBreakMatch.score()).toBe('0-0, 6-0')

          tieBreakMatch.pointWonBy(p1)
          expect(tieBreakMatch.score()).toBe('1-0')
        })

        it('when player leads by 2 and at least 7 points should win game', async () => {
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          tieBreakMatch.pointWonBy(p1)
          expect(tieBreakMatch.score()).toBe('0-0, 6-0')

          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          tieBreakMatch.pointWonBy(p2)
          expect(tieBreakMatch.score()).toBe('0-0, 6-6')

          tieBreakMatch.pointWonBy(p1)
          expect(tieBreakMatch.score()).toBe('0-0, 7-6')

          tieBreakMatch.pointWonBy(p2)
          expect(tieBreakMatch.score()).toBe('0-0, 7-7')

          tieBreakMatch.pointWonBy(p2)
          expect(tieBreakMatch.score()).toBe('0-0, 7-8')

          tieBreakMatch.pointWonBy(p2)
          expect(tieBreakMatch.score()).toBe('0-1')
        })
      })

    })

  })

})

const newMatch = () => new Match(p1, p2)
