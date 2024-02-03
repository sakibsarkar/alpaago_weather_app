export const todayDate = () => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const today = new Date()
    const date = today.getDate()
    const monthIndex = today.getMonth()
    const month = months[monthIndex]
    const year = today.getFullYear()
    return `${month} ${date}, ${year}`
}