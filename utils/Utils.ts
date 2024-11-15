import { compareAsc, format } from "date-fns";

class Utils {

    convertStringPriceToInt(value){
        return value
            .replace("лв.", "")
            .replace(",", "")
            .replace(".", "");
    }

    getTimeNow(){
        return format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
    }

}

export default Utils;