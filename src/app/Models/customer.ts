export class Customer {
  public Name!: string;
  public Email!: string;
  public Telephone!: string;
  public Body!: string;

  constructor(data: any) {
    this.Name = data.name;
    this.Email = data.email;
    this.Body = data.body;
    this.Telephone = data.phone;
  }
}
