import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { AuthService } from '../auth/auth.service';

@Resolver()
export class UserResolver {
  private authService = new AuthService();

  @Mutation(() => String)
  async login(@Arg('username') username: string, @Arg('password') password: string, @Ctx() ctx: any): Promise<void> {
    return this.authService.login(username, password, ctx.res);
  }

  @Mutation(() => String)
  async register(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('role') role: 'admin' | 'employee',
    @Ctx() ctx: any,
  ): Promise<void> {
    return this.authService.register(username, password, role, ctx.res);
  }
}
