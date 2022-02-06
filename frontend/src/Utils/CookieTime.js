export function hourTime(value) {
    let hour_minutes = (60 * 60);
    return (value * hour_minutes);
}

export function dayTime(value) {
    let day_minutes = (24 * 60 * 60);
    return (value * day_minutes);
}

export function monthTime(value) {
    let day_minutes = (24 * 60 * 60);
    let month_minutes = (30 * day_minutes);
    return (value * month_minutes);
}
