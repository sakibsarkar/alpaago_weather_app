export const formateDate = (date) => {
    //  date = yyyy-mm-dd
    const dateObj = new Date(date);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate;

}


export const inputDateFormater = (date) => {
    // date = dd/mm/yyyy
    const dateArray = date.split("/")

    const formateDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`//yyyy-mm-dd
    return formateDate

}