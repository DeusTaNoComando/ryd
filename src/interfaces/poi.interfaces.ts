// Address Interface
export interface Address {
    country: string
    zipCode: string
    city: string
    street: string
    houseNumber: string
}

// Fuel Product Interface
export interface FuelProduct {
    name: string
    price: {
        [currency: string]: number // e.g., { USD: 3.5, EUR: 3.0 }
    }
}

// Pump Interface
export interface Pump {
    pumpId: string
    pumpName: string
    fuelProducts: FuelProduct[]
}
