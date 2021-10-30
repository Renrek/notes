// Little function to convert a datetime block to human time

export default (rawDate) => {
    const date = new Date(rawDate); //likly from sql
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month}, ${date.getDate()} ${date.getFullYear()}`;
} // End humanReadableTime
