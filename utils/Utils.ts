class Utils {

    convertStringPriceToInt(value){
        return value
            .replace("лв.", "")
            .replace(",", "")
            .replace(".", "");
    }

}

export default Utils;