import { EmployeesServiceImpl } from "@/domain/use-cases";
import { CountriesRepositorySpy  } from '@/tests/domain/mocks';
import { EmployeesRepositorySpy } from "@/tests/domain/mocks/employees-repository-spy";
import { RegionsRepositorySpy } from "@/tests/domain/mocks/regions-repository-spy";
import { EMPLOYEES_COUNTRIES_DATA } from "@/tests/domain/mocks/common";

type SutTypes = {
  sut: EmployeesServiceImpl;
  countriesRepositorySpy: CountriesRepositorySpy;
  employeesRepositorySpy: EmployeesRepositorySpy;
  regionsRepositorySpy: RegionsRepositorySpy;
};
const makeSut = (): SutTypes => {
  const countriesRepositorySpy = new CountriesRepositorySpy();
  const employeesRepositorySpy = new EmployeesRepositorySpy();
  const regionsRepositorySpy = new RegionsRepositorySpy();
  const sut = new EmployeesServiceImpl(employeesRepositorySpy, countriesRepositorySpy, regionsRepositorySpy);
  return { sut, countriesRepositorySpy, employeesRepositorySpy, regionsRepositorySpy };
};

describe('Get Employees use case', () => {
  it('should call employeeServiceImpl with correct values', async function () {
    const { sut, employeesRepositorySpy } = makeSut();
    await sut.getEmployees();
    expect(Object.getOwnPropertyNames(employeesRepositorySpy).includes("params")).toEqual(false);
  });

  it('should return  EMPLOYEES_COUNTRIES_DATA.FAKE_EMPLOYEES_RESPONSE on success', async function () {
    const { sut} = makeSut();
    const response = await sut.getEmployees();
    expect(response).toEqual(EMPLOYEES_COUNTRIES_DATA.FAKE_EMPLOYEES_RESPONSE);
  });
});
