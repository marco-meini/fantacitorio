"use strict";

import * as bcrypt from "bcryptjs";
import * as fs from "fs";
import * as crypto from "crypto";

class Crypt {
  /**
   *
   * @param {string} plain
   * @returns {Promise<string>}
   */
  static hash(plain) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plain, 10, (error, hashed) => {
        if (error) {
          reject(error);
        } else {
          resolve(hashed);
        }
      });
    });
  }

  /**
   *
   * @param {string} plain
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static compare(plain, hash) {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(plain, hash)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   *
   * @param {string} val
   * @param {string} [charset]
   * @returns {string}
   */
  static base64encode(val, charset) {
    charset = charset || "utf8";
    return Buffer.from(val).toString("base64");
  }

  /**
   *
   * @param {string} base64
   * @param {any} [charset]
   * @returns {string}
   */
  static base64Decode(base64, charset) {
    charset = charset || "utf8";
    return Buffer.from(base64, "base64").toString(charset);
  }

  /**
   *
   * @param {string} filePath
   * @param {any} encoding
   * @returns {Promise<string>}
   */
  static fileToMd5(filePath, encoding = "hex") {
    return new Promise((resolve, reject) => {
      try {
        let stream = fs.createReadStream(filePath);
        let hash = crypto.createHash("md5");
        hash.setEncoding(encoding);
        stream.on("end", () => {
          hash.end();
          resolve(hash.read());
        });
        stream.pipe(hash);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   *
   * @param {Buffer} file
   * @param {any} encoding
   * @returns {Promise<string>
   */
  static bufferToMd5(file, encoding = "hex") {
    return new Promise((resolve, reject) => {
      try {
        let hash = crypto.createHash("md5");
        hash.update(file);
        resolve(hash.digest(encoding));
      } catch (e) {
        reject(e);
      }
    });
  }
}

export { Crypt };
