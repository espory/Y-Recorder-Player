
module.exports = {
  finish (status = true, body = {}, code = 200) {
    this.status = code
    this.body = {
      status,
      data: body
    }
  },
  async getToken (data) {
    return await this.app.jwt.sign(data, this.app.config.jwt.secret)
  },
  async checkToken (token) {
    return await this.app.jwt.verify(token, this.app.config.jwt.secret)
  }
}
