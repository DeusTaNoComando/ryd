export enum POIStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

export enum POIOpeningHours {
    DAILY = 'DAILY', // Open daily
    WEEKDAYSSAT = 'WEEKDAYSSAT', // Mon-Fri 8AM-8PM, Sat 8AM-6PM, closed Sun & public holidays
    WEEKDAYS = 'WEEKDAYS', // Mon-Thur 6AM-8PM, Fri 6AM-4PM, closed Sat, Sun & public holidays
}
