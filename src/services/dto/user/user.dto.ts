import { IsEmail,IsNotEmpty,IsNumber, IsStrongPassword } from 'class-validator';

import { BaseDTO } from '../base.dto';

export class RegisterUserDTO extends BaseDTO {
    id?: number;
  
    @IsEmail()
    @IsNotEmpty() 
    email: string;
    
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
  
    @IsNotEmpty()
    firstName: string;
    
    lastName?: string;
    
    isDeleted?: boolean;
    
    @IsNotEmpty() 
    @IsNumber()
    role: number;
  
}
