import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '@src/common/Paths';
import User from '@src/models/User';

import adminMw from './middleware/adminMw';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import OtpRoutes from './OtpRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// *** Add OtpRouter  ***/
const optRouter = Router();

//Generate otp
optRouter.post(
  Paths.Otp.Generate,
  validate('phone'),
  OtpRoutes.generate
);

optRouter.post(
  Paths.Otp.Verify,
  validate('phone','token','txHash'),
  OtpRoutes.verify
)
// Add OtpRouter
apiRouter.use(Paths.Otp.Base, optRouter);

// **** Add AuthRouter **** //

const authRouter = Router();

// Login user
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login,
);

// Logout user
authRouter.get(
  Paths.Auth.Logout,
  AuthRoutes.logout,
);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, userRouter);


// **** Export default **** //

export default apiRouter;
