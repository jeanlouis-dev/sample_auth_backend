import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 'with the appropriate user keys.';

// **** Types **** //

export interface IOtp {
  id?: number,
  phone: string;
  created?: Date;
  token?: string;
  txHash?: string;
  clientId?: string
}


function new_(
  phone: string,
  created?: Date,
  token?: string,
  txHash?: string,
  clientId?: string,
  id?: number, 
): IOtp {
  return {
    id: (id ?? -1),
    phone: (phone ?? ''),
    token: (token ??  ''),
    clientId: (clientId ??  ''),
    created: (created ? new Date(created) : new Date()),
    ...( txHash ? { txHash } : {}),
  };
}


function from(param: object): IOtp {
  if (!isOtp(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IOtp;
  return new_(p.phone, p.created,p.token, p.txHash,p.clientId, p.id);
}


function isOtp(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'phone' in arg && typeof arg.phone === 'string'
  );
}

export default {
  new: new_,
  from,
  isOtp,
} as const;
