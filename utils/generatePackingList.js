import { HOT, COLD } from "../pages/index";
//key is item name
//value is how many needed per day (rounded up)
//if 0 - that just means only ONE pair needed for whole trip
const clothing = {
    "pairs of underwear 🩲": 1.5,
    "pairs of socks 🧦": 1.5,
    "shirts 👕": 1.2,
};

const swimmingClothing = { "swimsuit 👙": 0 };

const hotClothing = { "Pair of shorts 🩳": 0, "Sunny hat 👒": 0 };

const coldClothing = { "Warm jacket 🥼": 0, "Scarf 🧣": 0 };

const toiletries = {
    "toothbrush 🦷": 0,
    "toothpaste ": 0,
    "floss 🧵": 0,
    "soap 🧼": 0,
    "shampoo 🧴": 0,
    "deoderant ": 0,
    "fragrance 👃": 0,
    "medicines 💊": 0,
};

const electronics = {
    "phone charger 🔌": 0,
    "headphones 🎧": 0,
    "laptop 💻": 0,
};

const sleep = { "ear plugs 👂": 0, "sleep mask 🦸‍♀️": 0 };

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
    items.forEach((itemString) => string += `\n • ${itemString}`)
  })
  return string;
}