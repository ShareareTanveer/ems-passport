import { IsEmail,IsNotEmpty,IsNumber, IsOptional, IsStrongPassword } from 'class-validator';

import { BaseDTO } from '../base.dto';
import { EGender } from '../../../entities/enum/gender.enum';

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
    
    @IsOptional()
    lastName?: string;    
    
    @IsOptional()
    phone?: string;
       
    @IsOptional()
    address?: string;     

    @IsNotEmpty()
    gender: EGender;
         
    @IsNotEmpty() 
    @IsNumber()
    role: number;
}

export class MeDTO extends BaseDTO {
    @IsOptional()
    firstName?: string;
    
    @IsOptional()
    lastName?: string;    
    
    @IsOptional()
    phone?: string;
       
    @IsOptional()
    address?: string;     

    @IsOptional()
    gender: EGender;
}
