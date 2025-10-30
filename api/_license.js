import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 24);

export function makeLicense() {
  return nanoid().match(/.{1,4}/g).join("-");
}
