const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDoc = YAML.load('./api.yaml')

const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'My eStore',
  customfavIcon: '../assets/icons/webicon.png'
}

module.exports = { swaggerServe: swaggerUi.serve, swaggerSetup: swaggerUi.setup(swaggerJsDoc, swaggerOptions) }
