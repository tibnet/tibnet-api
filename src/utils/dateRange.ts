export default (start: Date, end: Date) => {
    var dateArray = new Array();
    var currentDate = start;
    while (currentDate <= end) {
        dateArray.push(new Date (currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

const addDays = (input: Date, days: number) => {
        let date = new Date(input.valueOf());
        date.setDate(date.getDate() + days);
        return date;
}