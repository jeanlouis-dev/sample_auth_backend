import UserRepo from '@src/repos/UserRepo';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import RouteError from '@src/common/RouteError';
import OtpRepo from '@src/repos/OtpRepo';
import { IOtp } from '@src/models/Otp';


async function generate(otp: IOtp): Promise<void> {
  let oldOtp = await OtpRepo.getOne(otp.phone) as any;
  if (oldOtp) {
    await _delete(oldOtp.id);
  }
  return OtpRepo.add(otp);
}

async function update(otp: IOtp): Promise<void> {
  const persists = await OtpRepo.persists(otp.id!);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, "OTP NOT FOUND");
  }
  return OtpRepo.update(otp);
}


async function _delete(id: number): Promise<void> {
  const persists = await OtpRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, "OTP NOT FOUND");
  }
  return OtpRepo.delete_(id);
}


export default {
  generate,
  update,
  _delete
} as const;
