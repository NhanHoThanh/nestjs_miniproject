import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: AuthDto) {
    // check if user exist
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // check if password match
    const pwMatch = await argon.verify(user.password, dto.password);
    if (!pwMatch) {
      throw new Error('Invalid password');
    }

    console.log('User logged in:', user);

    return this.signToken(user.id, user.email);
  }
  async signUp(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      // console.log(thi)

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          firstName: null, // Ensure these are optional in your Prisma schema
          lastName: null,
        },
      });

      delete user.password; // Remove the password from the response

      return this.signToken(user.id, user.email); // return a string
    } catch (error) {
      console.error('Error signing up user:', error);
      throw new Error('Internal server error'); // Consider throwing a more specific error or handling it differently
    }
  }

  // String is the return type
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email: email }; //sub: a convention for the subject of the token
    const secret = process.env.JWT_SECRET;
    const token = await this.jwt.signAsync(payload, {
      secret,
      // expiresIn: '1h',
    }); //signAsync because it easier to catch error
    return { access_token: token }; // return an object
  }
}
