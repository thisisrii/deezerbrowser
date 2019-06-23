export function getDurationInMinutes(value) {
    let duration = value / 60;
    duration = duration.toFixed(2).replace(/[.|,]/g, ':');
    return duration;
}

export function IsNullOrUndefined(x) {
    if (x === undefined) {
        return true;
    }
    if (x === null) {
        return true;
    }

    if (typeof (x) === 'string')
        if (x.trim() === '') {
            return true;
        }
    return false;
}