export interface UserPayload {
  sub: number;
  userName: string;
  accountId: number;
  iat?: number;
  exp?: number;
}
