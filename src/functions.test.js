import { createEvent } from './functions'


beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-07T10:20:30Z').getTime())
})

const NUM_DAY = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };

const weekday = "mon"; 
const week = 1; 
const openHour = 8; 
const closeHour =14;

const numDay = NUM_DAY[weekday];
const currentDay = new Date().getDay();
const hour = new Date().getHours();
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };


function addDays(days) {
    return new Date(new Date().setDate(new Date().getDate() + days));
}

function getDateCalendar(numDay, currentDay) {
    if (numDay >= currentDay && parseInt(closeHour) >= hour) {//posterior a dia de la semana
        return addDays((numDay - currentDay) + 7 * (week - 1));
    }
    return addDays((numDay - currentDay) + 7 * (week - 1));
}


test('Validation a event title and content basic', () => {

    const result = createEvent(weekday,week,openHour,closeHour);
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6, "hour"]);
    
});

test('Validation start date', () => {
    const date = getDateCalendar(numDay, currentDay);
    const result = createEvent(weekday,week,openHour,closeHour);
    expect(result.start.toUTCString).toStrictEqual(date.toUTCString);

});

test('Validation date', () => {

    const date = getDateCalendar(numDay, currentDay);
    const dateResult = new Date(date).toLocaleDateString('es-ES', options);
    const result = createEvent(weekday,week,openHour,closeHour);
    expect(result.date).toStrictEqual(dateResult);
   
});


describe('Validation illegal arguments', () => {
    test("Ilegal horario de entrada", () => {
        const result = () => createEvent(weekday,week,10,7);
        expect(result).toThrow(Error);        
    });

    test("Ilegal semana con valor positivo", () => {
        const result = () => createEvent(weekday,-2,openHour,closeHour);
        expect(result).toThrow(Error);        
    });

    test("Ilegal dia de la semana", () => {
        const result = () => createEvent("lun",week,openHour,closeHour);
        expect(result).toThrow(Error);      
    });

});


test('create an event list of at least 10 events', () => {
    const eventList = [
    {   weekday: 'mon',
        week: 1,
        openHour: 8,
        closeHour: 15
    },
    {   weekday: 'thu',
        week: 2,
        openHour: 9,
        closeHour: 10
    },
    {   weekday: 'wed',
        week: 3,
        openHour: 7,
        closeHour: 12
    },
    {   weekday: 'sun',
        week: 4,
        openHour: 6,
        closeHour: 8
    },
    {   weekday: 'tue',
        week: 5,
        openHour: 5,
        closeHour: 6
    },
    {   weekday: 'sat',
        week: 6,
        openHour: 20,
        closeHour: 22
    },
    {   weekday: 'fri',
        week: 7,
        openHour: 14,
        closeHour: 15
    },
    {   weekday: 'thu',
        week: 8,
        openHour: 13,
        closeHour: 15
    },
    {   weekday: 'wed',
        week: 9,
        openHour: 8,
        closeHour: 10
    },
    {   weekday: 'mon',
        week: 1,
        openHour: 8,
        closeHour: 11
    }]

    eventList.map((event) =>{
        const result = createEvent(event.weekday,event.week,event.openHour,event.closeHour);
        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual([(event.closeHour-event.openHour), "hour"]);
    })
});