import { Crypt } from "./lib/crypt.mjs";

(async () => {
  try {
    const plain = process.argv[2];

    const hash = await Crypt.hash(plain);

    console.log(`${plain} => ${hash}`);
  } catch (e) {
    return Promise.reject(e);
  }
})();
