export const NOT_CONTAINS_NULL_VALUES = (obj) => {
    let flag = true;
    if (obj) {
        try {
            for (let v of Object.values(obj)) {
                if (v === null) {
                    flag = false;
                    break;
                }
            }
        } catch (e) {
            flag = false;
        }
    } else {
        flag = false;
    }
    return flag;
};
