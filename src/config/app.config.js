/**
 * 配置文件
 */
 module.exports = {
  appPort: 9000, // 服务端口
  defaultPageSize: 5, // 仓库的默认 pageSize

  redis: { // redis 配置
    username: '',
    password: '1234',
    host: '127.0.0.1',
    port: '6379',
    dbNumber: '0',
  }
}
