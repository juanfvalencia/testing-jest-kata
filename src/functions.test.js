import { createEvent } from './functions'

const RealDate = Date.now

beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-07T20:00:00Z').getTime())
})
test('Validation a event title and content basic', () => {
    const weekday = "mon";
    const week = 1;
    const openHour = 8;
    const closeHour = 14;

    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6, 'hour']);
});

test('Validation start date', () => {
    //TODO: hacer las verificaciones
});

test('Validation date', () => {
   //TODO: hacer las verificaciones
});


test('Validation illegal arguments', () => {
    //TODO: hacer las verificaciones
});


test('create an event list of at least 10 events', () => {
    //TODO: hacer las verificaciones
});