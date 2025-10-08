const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 24);
function makeLicense() {
  return nanoid().match(/.{1,4}/g).join("-");
}
module.exports = { makeLicense };
