const CACHE_DURATION_IN_SECS = 300;

const ok = res => result => {
  if (!res.headersSent) {
    res.set("Cache-Control", `max-age=${CACHE_DURATION_IN_SECS}`);
    res.json(result).status(200);
  }
};

const notFound = res => _ => {
  if (!res.headersSent) {
    res.status(404).end();
  }
};

const badRequest = res => _ => {
  if (!res.headersSent) {
    res.status(400).end();
  }
};

const badRequestWithMessage = res => err => {
  if (!res.headersSent) {
    res.json(err).status(400);
  }
};

const created = res => _ => {
  if (!res.headersSent) {
    res.status(201).end();
  }
};


module.exports = {
  ok,
  notFound,
  badRequest,
  badRequestWithMessage,
  created
};