const nextTranslate = require('next-translate')

module.exports = {
    ...nextTranslate(),
    images: {
        domains: ['openweathermap.org','images.unsplash.com','www.trueshayari.in','ikshvaku-s3.s3.ap-south-1.amazonaws.com'],
      },
}