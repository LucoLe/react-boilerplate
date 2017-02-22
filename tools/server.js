import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev.babel';
import open from 'open';

/* eslint-disable no-console */

const PORT = process.env.PORT || 4000;
const app = express();
const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else if (process.env.NODE_ENV === 'production') {
  app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  });

  app.use(express.static('dist'));
}

app.get('/*', function(_, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${PORT}`);
  }
});
