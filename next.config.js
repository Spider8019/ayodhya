const nextTranslate = require('next-translate')

module.exports = {
    ...nextTranslate(),
    images: {
        domains: ['openweathermap.org','drive.google.com'],
      },
}