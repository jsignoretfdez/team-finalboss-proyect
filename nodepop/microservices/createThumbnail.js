const cote = require('cote');
const jimp = require('jimp');
const path = require('path');

const createThumbnail = new cote.Responder({ name: 'adsThumbnail ' });

createThumbnail.on('createThumb', async (req, done) => {
  try {
    const img = await jimp.read(path.join(__dirname, '../public', req.rutaImg));

    await img.resize(100, jimp.AUTO);

    await img.writeAsync(path.join(__dirname, '../public/images/thumbnails/', req.thumb));

    done();
  } catch (err) {
    console.log(err);
  }
});
