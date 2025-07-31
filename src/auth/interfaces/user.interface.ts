export interface JwtUserData {
  /**
   * The "subject" of the token. The value of this property is the user ID
   * that granted this token.
   */
  sub: number;

  /**
   * The subject's (user) email.
   */
  email: string;
  /**
   * The permissions granted to the user.
   * This is an array of strings representing the permissions.
   */
  permissions: string[];
}
