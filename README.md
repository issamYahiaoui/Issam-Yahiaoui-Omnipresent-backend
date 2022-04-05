# Omnipresent
## Home Task [ Backend]

For this task you are given a list of employees. The output of the task is an endpoint which returns the same list of employees but with the relevant country specific information added to each employee.

## Requirements

- The country specific information ( Full name,  Currency, Language/s, Timezone/s )
- employees in Asia and Europe regions to have an additional identifier which takes the form of `{firstName}{lastName}{dateOfBirth}`
- the regions which require additional identifier  may change in the future.


## Features

- `GET /api/v1/employees` API to fetch employees [Main API]
- `GET /status` health check API


Employees API fetch employees Data including the country details.
## Acceptance Creterias
- Countries details are available on Rest API, can be fetched by country codes which can be [cca2, ccn3, cca3, cioc] format ( need to be handled).
- Countries Service need to be abstracted to be replaced easily in the future [ Caching could be added ]
- Country Service is a possible point of failure so we should handle this, currently we are returning [] empty response cause unavailable country details should not cause Employees API failure
- Employees API should return additional identifiers `id` in case the region is `Asia` or `Europe`
  since the region can be extracted from Country details, we should extract and abstract the logic, hence the need for `RegionConfig` table ( for now it's a repository with dummy data) can be easily replaced and persisted in same employees service or another service thanks to `Repository pattern` and `DI`
  -in case of Adding the additional identifier it should be in the correct format `{firstName}{lastName}{dateOfBirth}` : Lower case, date should be trimmed from '/'
  ideally this rule should be abstracted and configured [table] but for now as first iteration it's inside our business logic.
- Tests should be written [ CountryService, EmployeesService ]


## Future Enhancements:
- Add caching for Countries Service [less possibility of data change] .
- Add Caching for Employees API [less frequency of data change] .
- Add Authentication to Employees API : Employees data is sensitive and should be secured .
- Add  Rate Limiter to Employees API : To prevent Bots and scrappers .
- Move the Region Config into Persistance layer [ Db ] or  Separate microservice or within the country service .



## Tech

Omnipresent home task uses a number of Packages/Libraries/Frameworks:

- [Nodejs](https://nodejs.org/en/) - Express + typescript
- [ts-scaffold](https://github.com/gengjiawen/ts-scaffold) -Very good CLI to generate Clean code architecture based Boilerplate

## Installation

Omnipresent requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd omnipresent
npm i
npm run watch
```
## Tests
you can find test in `/tests` , to run:
```sh
npm run test 
```
## Docker

Omnipresent is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 9000, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd omnipresent
docker build -t <youruser>/omnipresent:${package.json.version} .
```

This will create the omnipresent image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Omnipresent.

```sh
docker run -d -p 9000:9000 --restart=always --name=omnipresent <youruser>/omnipresent:${package.json.version}
```
Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:9000/status
```
