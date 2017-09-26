export const setData = (data) => {
  return data.map( val => {
    const { from, to } = val;
    if (!from.city) {
      return val
    }
    val.from = from.zip + ' ' + from.city + ' ' + from.address + ' ' + from.house_number;
    val.to =  to.zip + ' ' + to.city + ' ' + to.address + ' ' + to.house_number;
    let d = new Date(val.date);
    val.date = d.getFullYear() + '.' + d.getMonth()+ '.' + d.getDate();
    return val;
  });
}