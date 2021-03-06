import { HOT, COLD } from "../pages/index";
//key is item name
//value is how many needed per day (rounded up)
//if 0 - that just means only ONE pair needed for whole trip
const clothing = {
    "pairs of underwear π©²": 1.5,
    "pairs of socks π§¦": 1.5,
    "shirts π": 1.2,
};

const swimmingClothing = { "swimsuit π": 0 };

const hotClothing = { "Pair of shorts π©³": 0, "Sunny hat π": 0 };

const coldClothing = { "Warm jacket π₯Ό": 0, "Scarf π§£": 0 };

const toiletries = {
    "toothbrush π¦·": 0,
    "toothpaste ": 0,
    "floss π§΅": 0,
    "soap π§Ό": 0,
    "shampoo π§΄": 0,
    "deoderant ": 0,
    "fragrance π": 0,
    "medicines π": 0,
};

const electronics = {
    "phone charger π": 0,
    "headphones π§": 0,
    "laptop π»": 0,
};

const sleep = { "ear plugs π": 0, "sleep mask π¦ΈββοΈ": 0 };

export const generatePackingList = ({
    numberOfNights,
    isSwimming,
    climate,
}) => {
    const packingList = {
        clothing: calculateQuantity(clothing, numberOfNights),
        toiletries: calculateQuantity(toiletries, numberOfNights),
        electronics: calculateQuantity(electronics, numberOfNights),
        sleep: calculateQuantity(sleep, numberOfNights),
    };

    if (isSwimming) {
        packingList.clothing.push(
            ...calculateQuantity(swimmingClothing, numberOfNights)
        );
    }

    if (climate === HOT) {
        packingList.clothing.push(
            ...calculateQuantity(hotClothing, numberOfNights)
        );
    }

    if (climate === COLD) {
        packingList.clothing.push(
            ...calculateQuantity(coldClothing, numberOfNights)
        );
    }

    return packingList;
};

export const calculateQuantity = (items, numberOfNights) => {
    return Object.entries(items).map(([itemName, ratePerNight]) => {
        if (ratePerNight === 0) {
            return itemName;
        }
        return `${Math.ceil(ratePerNight * numberOfNights)} ${itemName}`;
    });
};

export const stringifyPackingList = (packingList) => {
  let string = "";
  Object.entries(packingList).forEach(([category, items]) => {
    string += `\n \n ${category.toLocaleUpperCase()} \n`
    items.forEach((itemString) => string += `\n β’ ${itemString}`)
  })
  return string;
}