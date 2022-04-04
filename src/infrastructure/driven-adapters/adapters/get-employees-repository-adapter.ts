import { EmployeeModel, IGetEmployeesRepository } from '@/domain/models';

const EMPLOYEES_DATA = JSON.parse(`[
    {
        "firstName":"Roy",
        "lastName":"Testerton",
        "dateOfBirth":"19/02/1990",
        "jobTitle":"Software developer",
        "company":"Test co",
        "country":"US"
    },
    {
        "firstName":"Lisa",
        "lastName":"Testora",
        "dateOfBirth":"11/07/1984",
        "jobTitle":"CTO",
        "company":"Test co",
        "country":"GBR"
    },
    {
        "firstName":"Simon",
        "lastName":"McTester",
        "dateOfBirth":"01/11/1987",
        "jobTitle":"Product manager",
        "company":"Mock industries",
        "country":"IND"
    },
    {
        "firstName":"Selina",
        "lastName":"Testo",
        "dateOfBirth":"23/11/1972",
        "jobTitle":"Software developer",
        "company":"Mock industries",
        "country":"IND"
    },
    {
        "firstName":"Tim",
        "lastName":"Mockman",
        "dateOfBirth":"12/11/1972",
        "jobTitle":"Software developer",
        "company":"Mock industries",
        "country":"IND"
    },
    {
        "firstName":"Melissa",
        "lastName":"Mocker",
        "dateOfBirth":"10/01/1982",
        "jobTitle":"Software developer",
        "company":"Mock industries",
        "country":"US"
    }
]`);

// TODO: Replace this with a DB ORM Adapter
export class GetEmployeesRepositoryAdapter implements IGetEmployeesRepository {
  // Implementation
  async getEmployees(): Promise<EmployeeModel[]> {
    return Promise.resolve(EMPLOYEES_DATA);
  }
}
