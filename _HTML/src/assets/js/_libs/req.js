export function req(settings, doneCb, failCb, alwaysCb) {
  typeof doneCb !== 'function'
    ? (doneCb = (response) => console.log(response))
    : doneCb;
  typeof failCb !== 'function' ? (failCb = (err) => console.log(err)) : failCb;
  typeof alwaysCb !== 'function' ? (alwaysCb = null) : alwaysCb;

  $.ajax(settings).done(doneCb).fail(failCb).always(alwaysCb);
}

// req (config, done callback, fail callback, always callback);
