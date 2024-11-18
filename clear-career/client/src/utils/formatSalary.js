export default (salary) => {
    if (!salary) return;
    const [minSalary, maxSalary] = salary.split('-');
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return `${formatter.format(minSalary)} - ${formatter.format(maxSalary)}`;
};