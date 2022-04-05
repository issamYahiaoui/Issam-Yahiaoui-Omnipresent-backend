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
  it(`
        GIVEN i am checking success scenario
        WHEN calling employeeServiceImpl
        THEN service function should be called with correct values
  `, async function () {
    const { sut, employeesRepositorySpy } = makeSut();
    await sut.getEmployees();
    expect(Object.getOwnPropertyNames(employeesRepositorySpy).includes("params")).toEqual(false);
  });

  it(`
        GIVEN i am fetching countries
        WHEN providing countriesCodes
        THEN service function should return EMPLOYEES_COUNTRIES_DATA.FAKE_EMPLOYEES_RESPONSE
  `, async function () {
    const { sut} = makeSut();
    const response = await sut.getEmployees();
    const expectedResponse = EMPLOYEES_COUNTRIES_DATA.FAKE_EMPLOYEES_RESPONSE;
    expect(response).toEqual(expectedResponse);
  });

  it(`
        GIVEN i am fetching employees
        WHEN providing invalid countryCode
        THEN service should return employee data with country: null
`, async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.INVALID_COUNTRY_CODE_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].country).toBeFalsy()
  });


  it(`
        GIVEN i am fetching employee detail
        WHEN employee region is Asia
        THEN additional id should be returned in response
  `, async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.ASIA_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeTruthy()
  });

  it(`
        GIVEN i am fetching employee detail
        WHEN employee region is Europe
        THEN additional id should be returned in response
 `, async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.EUROPE_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeTruthy()
  });

  it(`
        GIVEN i am fetching employee detail
        WHEN employee region is Ameria
        THEN additional id should not be returned in response
  `, async function () {
    const { sut, employeesRepositorySpy} = makeSut();
    const fakeEmployees = EMPLOYEES_COUNTRIES_DATA.AMERICA_EMPLOYEE_COUNTRIES_DATA
    jest.spyOn(employeesRepositorySpy, 'getEmployees').mockReturnValueOnce(Promise.resolve(fakeEmployees));
    const response = await sut.getEmployees();
    expect(response).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0].countryCode).toEqual(fakeEmployees[0].country);
    expect(response[0].id).toBeFalsy()
  });

  it(`
        GIVEN i am fetching employee detail
        WHEN employee region is Asia
        AND config is changed for Asia to [hasAdditionalId: false] 
        THEN additional id should not be returned in response
     `, async function () {
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

  it(`
        GIVEN i am fetching employee detail
        WHEN employee region is America
        AND config is changed for America to [hasAdditionalId: true] 
        THEN additional id should  be returned in response
  `, async function () {
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

  it(`
        GIVEN i am fetching employee detail
        WHEN employee region is Asia  
        THEN additional id should  be returned in response
        AND in the format "{firstName}{lastName}{dateOfBirth}"
  `, async function () {
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
