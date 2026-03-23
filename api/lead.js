const { handleLeadRequest } = require('../lib/lead-handler.js');

module.exports = async function leadHandler(req, res) {
  await handleLeadRequest(req, res);
};
