import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import tokenService from '@/modules/token/token.service';
import { userService } from '../user/user.service';
import { ApiError } from '../errors';
import tokenTypes from '../token/token.types';
import { TokenDocument } from '../token/token.model';
import { UserDocument } from '../user/user.model';
import { IUserDoc } from '../user/user.interfaces';

/**
 * Logout — xoá refresh token khỏi DB
 */
const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await tokenService.findToken({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token không tồn tại');
  }

  await refreshTokenDoc.deleteOne();
};

/**
 * Refresh access token bằng refresh token cũ
 * → xoá refresh token cũ, tạo cặp token mới
 */
const refreshAuth = async (refreshToken: string) => {
  const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);

  const user = await userService.getUserById(refreshTokenDoc.user.toString());

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User không tồn tại');
  }

  await refreshTokenDoc.deleteOne();

  return tokenService.generateAuthTokens(user);
};

/**
 * Reset password bằng reset token
 */
const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
  const resetTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);

  const user = await userService.getUserById(resetTokenDoc.user.toString());

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Reset password thất bại');
  }

  await userService.updateUserById(user.id, {
    password: await bcrypt.hash(newPassword, 10),
  });

  await tokenService.deleteTokensByUserAndType(user.id, tokenTypes.RESET_PASSWORD);
};

/**
 * Verify email bằng verify token
 */
const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
  const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);

  const user = await userService.getUserById(verifyEmailTokenDoc.user.toString());

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Xác thực email thất bại');
  }

  // Xoá token sau khi verify xong
  await tokenService.deleteTokensByUserAndType(user.id, tokenTypes.VERIFY_EMAIL);

  // Đánh dấu email đã được verify
  await userService.updateUserById(user.id, { isEmailVerified: true });
};

/**
 * Kiểm tra email + password, trả về user nếu hợp lệ
 */
const loginWithEmailAndPassword = async (email: string, password: string): Promise<IUserDoc> => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

const authService = {
  loginWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};

export default authService;
