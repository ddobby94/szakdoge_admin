export const setData = (data) => {
  return data.map( val => {
    if (!val) {
      return {};
    }
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

export const getConsumptionNorm = (cylinder_capacity, fuelType) => {
  // pl: 1350 cm^3 and diesel: 8.6 liter / 100 km
  if (fuelType === 'diesel') {
    if (cylinder_capacity <= 1000) {
      return 7.6;
    } else if (cylinder_capacity < 1500) {
      return 8.6;
    } else if (cylinder_capacity < 2000) {
      return 9.5;
    } else if (cylinder_capacity < 3000) {
      return 11.4;
    } else if (cylinder_capacity >= 3001) {
      return 13.3;
    }
  } else if (fuelType === 'petrol') {
    if (cylinder_capacity <= 1500) {
      return 5.7;
    } else if (cylinder_capacity < 2000) {
      return 6.7;
    } else if (cylinder_capacity < 3000) {
      return 7.6;
    } else if (cylinder_capacity >= 3001) {
      return 9.5;
    }
  }
/*
segédmotoros kerékpár:

 3,0 liter/100 km,

motorkerékpár: 80 cm3-ig

 3,5 liter/100 km,

motorkerékpár: 81-125 cm3

 3,8 liter/100 km,

motorkerékpár: 126-250 cm3

 4 liter/100 km,

motorkerékpár: 251-500 cm3

 4,5 liter/100 km,

motorkerékpár: 500 cm3 felett

 5 liter/100 km.
*/
}