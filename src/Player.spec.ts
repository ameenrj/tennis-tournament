import Player from './Player'

describe('Player', () => {

  const playerName = 'Gandalf'
  let player

  beforeEach(() => {
    player = new Player(playerName)
  })

  it('should be initialised 0 gamesWon and setsWon', () => {
    expect(player.gamesWon).toBe(0)
    expect(player.setsWon).toBe(0)
  })

  describe('Constructor', () => {

    it('should be initialised with correct name', () => {
      expect(player.name).toBe(playerName)
    })

  })

  describe('winGame', () => {

    it('should increment the player points by 1', () => {
      player.winGame()
      expect(player.gamesWon).toBe(1)

      player.winGame()
      expect(player.gamesWon).toBe(2)
    })

  })

  describe('winSet', () => {

    it('should increment the setsWon by 1 and reset gamesWon to 0', () => {
      player.winGame()
      expect(player.gamesWon).toBe(1)
      expect(player.setsWon).toBe(0)

      player.winSet()
      expect(player.gamesWon).toBe(0)
      expect(player.setsWon).toBe(1)
    })

  })
})
