import crypto from 'crypto';
import { OTP } from '../entities/user/otp.entity';
import dataSource from '../configs/orm.config';
import { MoreThan } from 'typeorm';

const OTP_EXPIRY_MINUTES = 15;

export async function generateOTP(email: string): Promise<number> {
  const otp = crypto.randomInt(100000, 999999);
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

  const otpRecord = new OTP();
  otpRecord.email = email;
  otpRecord.otp = otp;
  otpRecord.expiresAt = expiresAt;

  await dataSource.getRepository(OTP).save(otpRecord);

  return otp;
}

export async function verifyOTP(email: string, otp: number): Promise<boolean> {
  const otpRecord = await dataSource.getRepository(OTP).findOne({
    where: {
      email,
      otp,
      expiresAt: MoreThan(new Date()),
    },
  });

  if (otpRecord) {
    await dataSource.getRepository(OTP).delete(otpRecord.id);
    return true;
  }

  return false;
}
