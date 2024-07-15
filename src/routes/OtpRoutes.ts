import HttpStatusCodes from '@src/common/HttpStatusCodes';
import jwt from 'jsonwebtoken';
import { IReq, IRes } from './types/express/misc';
import OtpService from '@src/services/OtpService';
import Otp, { IOtp } from '@src/models/Otp';
import EnvVars from '@src/common/EnvVars';
import OtpRepo from '@src/repos/OtpRepo';


// **** Functions **** //

/**
 * Generate a phone Number authentication payload.
 */
async function generate(req: IReq<IOtp>, res: IRes) {
  const { phone } = req.body;
  let payload = Otp.from({phone});
  await OtpService.generate(payload);
  const secretKey = EnvVars.Jwt.Secret;
  const token = jwt.sign(payload, secretKey, {expiresIn: process.env.JWT_EXP});
  payload.clientId = process.env.ADN_CLIENT_ID;
  payload.token = token;
 
  return res.status(HttpStatusCodes.OK).json(payload);
}

/**
 * Verify phone Number .
 */
async function verify(req: IReq<IOtp>, res: IRes) {
    const { phone, token, txHash } = req.body;
    var otp = await OtpRepo.getOne(phone) as any;
    console.log("otp", otp);
    if (!otp) {
        throw 'Phone not registered';
    }
    const { id, exp }  = jwt.decode(token!) as any;
    console.log("ID from token", id);
    console.log("ID database", otp.id);
    const currentTime = Date.now() / 1000;
    if(exp < currentTime){
      throw "token expired";
    }
    
    if (otp.id !== id){
        throw "Invalid Token";
    }

  return res.status(HttpStatusCodes.OK).end();
}


export default {
  generate,
  verify,
} as const;
