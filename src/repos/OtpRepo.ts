

import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { IOtp } from '@src/models/Otp';

async function add(otp: IOtp): Promise<void> {
    const db = await orm.openDb();
    otp.id = getRandomInt();
    db.otps.push(otp);
    return orm.saveDb(db);
}

async function getOne(phone: string): Promise<IOtp| null> {
    const db = await orm.openDb();
    for (const otp of db.otps) {
      if (otp.phone === phone) {
        return otp;
      }
    }
    return null;
}

async function isGenerated(phone: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const otp of db.otps) {
    if (otp.phone === phone) {
      return true;
    }
  }
  return false;
}


async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const otp of db.otps) {
    if (otp.id === id) {
      return true;
    }
  }
  return false;
}


async function update(otp: IOtp): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.otps.length; i++) {
    if (db.otps[i].id === otp.id) {
      const dbOtp = db.otps[i];
      db.otps[i] = {
        ...dbOtp,
        txHash: otp.txHash
      };
      return orm.saveDb(db);
    }
  }
}


async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.otps.length; i++) {
    if (db.otps[i].id === id) {
      db.otps.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


export default {
    add,
    getOne,
    isGenerated,
    persists,
    update,
    delete_
  } as const;