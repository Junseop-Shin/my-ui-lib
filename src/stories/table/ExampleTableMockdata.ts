import { en, Faker, ko } from "@faker-js/faker";
import { format } from "date-fns";
import { Person } from "./ExampleTable";

const generateRandomString = (faker: Faker, length: number): string => {
  return faker.lorem.text().slice(0, length);
};

export const generateCompany = (faker: Faker): string => {
  return generateRandomString(faker, faker.number.int({ min: 3, max: 7 }));
};

export const generateName = (faker: Faker): string => {
  return generateRandomString(faker, faker.number.int({ min: 2, max: 4 }));
};

export const generatePhone = (faker: Faker): string => {
  return faker.phone.number();
};

export const generateAddress = (faker: Faker): string => {
  return faker.location.street();
};

export const generatePeople = (numPeople: number): Person[] => {
  const faker = new Faker({ locale: [ko, en] });
  const companies = Array.from({ length: 10 }, () => generateCompany(faker));
  const names = Array.from({ length: 10 }, () => generateName(faker));
  const people: Person[] = [];

  for (let i = 1; i <= numPeople; i++) {
    const company = faker.helpers.shuffle(companies)[0];
    const name = faker.helpers.shuffle(names)[0];

    const person: Person = {
      company,
      name,
      years: faker.number.int({ min: 1, max: 10 }),
      date: format(faker.date.recent(), "yy.MM.dd"),
      phone: generatePhone(faker),
      address: generateAddress(faker),
    };
    people.push(person);
  }
  return people;
};
