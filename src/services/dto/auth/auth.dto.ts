import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsStrongPassword,
} from 'class-validator';

export class sendEmailOtpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class verifyEmailOtpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  otp: number;
}

export class resetPasswordDTO {
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  confirmNewPassword: string;
}

export class loginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
