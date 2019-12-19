import Player from './Player'

export default class Match {

  private readonly playerOne: Player
  private readonly playerTwo: Player

  private readonly TIE_BREAK_ADJUSTMENT: number = 6
  private readonly TIE_BREAK_POINT: number = 12
  private readonly TIE_BREAK_WIN_MINIMUM: number = 19

  private scores = {
    0: '0',
    1: '15',
    2: '30',
    3: '40'
  }

  constructor(playerOne: string, playerTwo: string) {
    this.playerOne = new Player(playerOne)
    this.playerTwo =  new Player(playerTwo)
  }

  public pointWonBy(player: string): void {
    if (this.playerOne.name === player) this.playerOne.winGame()
    else if (this.playerTwo.name === player) this.playerTwo.winGame()
  }

  public score(): string {
    const p1GamesWon = this.playerOne.gamesWon
    const p2GamesWon = this.playerTwo.gamesWon
    const gamesPlayed = p1GamesWon + p2GamesWon
    const isNormalScoring = p1GamesWon <= 3 && p2GamesWon <= 3 && gamesPlayed < 6

    let gameScore: string
    if (isNormalScoring) {
      gameScore = this.getNormalScores()
    } else if (gamesPlayed >= this.TIE_BREAK_POINT) {
      gameScore = this.getTieBreakMatchScoring(gamesPlayed)
    } else {
      gameScore = this.getAdvantageSetScoring()
    }

    return gameScore ? `${this.getMatchScore()}, ${gameScore}` : this.getMatchScore()
  }

  private getTieBreakMatchScoring(totalGames: number): string {
    if (totalGames < this.TIE_BREAK_WIN_MINIMUM) return this.getTieBreakScore()

    let gameScore = ''

    const tieBreakDifference = (this.playerOne.gamesWon - this.TIE_BREAK_ADJUSTMENT) - (this.playerTwo.gamesWon - this.TIE_BREAK_ADJUSTMENT)
    if (tieBreakDifference >= 2) {
      this.playerOne.winSet()
    } else if (tieBreakDifference <= -2) {
      this.playerTwo.winSet()
    } else {
      gameScore = this.getTieBreakScore()
    }

    return gameScore
  }

  private getAdvantageSetScoring(): string {
    const gameDifference = this.playerOne.gamesWon - this.playerTwo.gamesWon
    let gameScore = ''

    if (gameDifference === 0) {
      gameScore = 'Deuce'
    } else if (gameDifference === 1) {
      gameScore = `Advantage ${this.playerOne.name}`
    } else if (gameDifference === -1) {
      gameScore = `Advantage ${this.playerTwo.name}`
    } else if (gameDifference >= 2) {
      this.playerOne.winSet()
    } else if (gameDifference <= 2) {
      this.playerTwo.winSet()
    }

    return gameScore
  }

  private getNormalScores(): string {
    return `${this.scores[this.playerOne.gamesWon]}-${this.scores[this.playerTwo.gamesWon]}`
  }

  private getTieBreakScore(): string {
    const playerOneScore = this.playerOne.gamesWon <= this.TIE_BREAK_ADJUSTMENT ? 0 : this.playerOne.gamesWon - this.TIE_BREAK_ADJUSTMENT
    const playerTwoScore = this.playerTwo.gamesWon <= this.TIE_BREAK_ADJUSTMENT ? 0 : this.playerTwo.gamesWon - this.TIE_BREAK_ADJUSTMENT

    return `${playerOneScore}-${playerTwoScore}`
  }

  private getMatchScore(): string {
    return `${this.playerOne.setsWon}-${this.playerTwo.setsWon}`
  }
}
