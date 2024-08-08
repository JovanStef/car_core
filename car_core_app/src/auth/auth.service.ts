import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import RefreshToken from './entities/refresh-token.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { sign, verify } from 'jsonwebtoken';
import { HashService } from './hash/hash.service';

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];

  constructor(private readonly userService: UsersService) {}

  async refresh(refreshStr: string): Promise<string | undefined> {

    const refreshToken = await this.retrieveRefreshToken(refreshStr)

    if(!refreshToken) return undefined

    const user = await this.userService.findOne(refreshToken.userId);

    if(!user) return undefined

    const userId = refreshToken.userId

    const accessToken = {
        userId
    }

    const expiresIn ='1h'

    const newToken = sign(accessToken , process.env.ACCESS_SECRET , {expiresIn})

    return newToken
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);

      if (typeof decoded === 'string') return undefined;
// get from DB
      const newToken = this.refreshTokens.find(
        (token: RefreshToken) => token.id === decoded.id,
      );

      return Promise.resolve(newToken);
    } catch (error) {
      return undefined;
    }
  }

  async login(
    email: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.findByEmail(email);

    if (!user){
      throw new NotFoundException('Please sign in')

    }

    const validPassword = HashService.compareHash(password , user.password)

    if (!validPassword){
      
      throw new UnauthorizedException('Invalid password')
    };

    return this.newRefreshAndAccessToken(user, values);
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    // get from DB
    const id =
      this.refreshTokens.length === 0
        ? 0
        : this.refreshTokens[this.refreshTokens.length - 1].id + 1;

    const refreshObject = new RefreshToken({
      id,
      ...values,
      userId: user.id,
    });
// set to DB
    this.refreshTokens.push(refreshObject);

    const userId = user.id;
    const expiresIn = '1h';
    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign({ userId }, process.env.ACCESS_SECRET, { expiresIn }),
    };
  }

  async logout(refreshStr:string):Promise<void>{
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if(!refreshToken) return;

    // delete from DB

    this.refreshTokens = this.refreshTokens.filter((refreshToken:RefreshToken) => refreshToken.id !== refreshToken.id)
  }
}
