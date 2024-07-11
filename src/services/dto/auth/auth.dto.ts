import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

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

export class changePasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsNumber()
  otp: string;
  
  @IsNotEmpty()
  @IsNumber()
  newPassword: string;
}
