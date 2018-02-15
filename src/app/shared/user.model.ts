export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public isAdmin: boolean;

  constructor(user?: User) {
    this.id = user && user.id || 0;
    this.firstName = user && user.firstName || '';
    this.lastName = user && user.lastName || '';
    this.email = user && user.email || '';
    this.isAdmin = user && user.isAdmin || false;
  }

  public getFullName(): string {
    return this.firstName +' '+this.lastName;
  }
}