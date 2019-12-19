export default class Player {
  name: string
  gamesWon: number = 0
  setsWon: number = 0

  constructor(name: string) {
    this.name = name
  }

  public winGame(): void {
    this.gamesWon++
  }

  public winSet(): void {
    this.gamesWon = 0
    this.setsWon++
  }
}
