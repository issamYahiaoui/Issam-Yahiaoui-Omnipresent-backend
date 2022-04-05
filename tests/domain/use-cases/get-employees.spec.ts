import { EmployeesServiceImpl } from "@/domain/use-cases";
import { EmployeesRepositorySpy } from "@/tests/domain/mocks/employees-repository-spy";
import { RegionsRepositorySpy } from "@/tests/domain/mocks/regions-repository-spy";
import { EMPLOYEES_COUNTRIES_DATA, fakeAmericaRegionConfig, fakeAsiaRegionConfig } from "@/tests/domain/mocks/common";
import { CountriesRepositoryAdapter, RegionRepositoryAdapter } from "@/infrastructure/driven-adapters/adapters";

type SutTypes = {
  sut: EmployeesServiceImpl;
  countriesRepositorySpy: CountriesRepositoryAdapter;
  employeesRepositorySpy: EmployeesRepositorySpy;
  regionsRepositorySpy: RegionRepositoryAdapter;
};
const makeSut = (): SutTypes => {
  const countriesRepositorySpy = new CountriesRepositoryAdapter();
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
    const expectedResponse = EMPLOYEES_COUNTRIES_DATA.FAKE_EMPLOYEES_RESPONSE;
    expect(response).toEqual(expectedResponse);
  });

  it('should return employee data with country: null when passing an invalid country code', async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.INVALID_COUNTRY_CODE_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].country).toBeFalsy()
  });


  it('should return additional id  when employee region is Asia', async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.ASIA_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeTruthy()
  });

  it('should return additional id  when employee region is Europe', async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.EUROPE_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeTruthy()
  });

  it('should not return additional id  when employee region is America', async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.AMERICA_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeFalsy()
  });

  it('should not return additional id  when employee region is Asia after config change [hasAdditionalId: false]', async function () {
    const { sut, employeesRepositorySpy, regionsRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.ASIA_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    jest.spyOn(regionsRepositorySpy, 'getRegionByNames').mockReturnValueOnce(Promise.resolve(fakeAsiaRegionConfig));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeFalsy()
  });

  it('should  return additional id  when employee region is America after config change [hasAdditionalId: true]', async function () {
    const { sut, employeesRepositorySpy, regionsRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.AMERICA_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    jest.spyOn(regionsRepositorySpy, 'getRegionByNames').mockReturnValueOnce(Promise.resolve(fakeAmericaRegionConfig));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeFalsy()
  });

  it('should return id in `{firstName}{lastName}{dateOfBirth}` format', async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.ASIA_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeTruthy()
    expect(response[0].id).toEqual(`issamyahiaoui04101995`)
  });

});
