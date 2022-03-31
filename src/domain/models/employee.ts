export type EmployeeModel = {
    // Attributes
    id: string;
    firstName:string,
    lastName:string,
    dateOfBirth:string,
    jobTitle:string,
    company:string,
    country: string
}
export type GetEmployeeParams = EmployeeModel
