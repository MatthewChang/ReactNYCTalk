export default class Comment {
  isSpam() {
    return this.content.match(/spammer/)
  }
}
