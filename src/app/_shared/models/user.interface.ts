export interface UserData {
    limit: number,
    skip: number,
    total: number,
    users: users[]

}

export interface users {
    address?: address
    age?:number,
    bank?: bank,
    birthDate?: string,
    bloodGroup?: string,
    company?: company,
    domain?: string,
    ein?: string,
    email: string,
    eyeColor?: string,
    firstName: string,
    gender?: string,
    hair?: hair,
    height?: string,
    id: string,
    image?: string,
    ip?: string,
    lastName?: string,
    macAddress?: string,
    maidenName?: string,
    password: string,
    phone?: string,
    ssn?: string,
    university?: string,
    userAgent?: string,
    username: string,
    weight?: number
}

interface address {
    address: string,
    city: string,
    coordinates: coordinates
    postalCode: string,
    state: string
}

interface coordinates {
    lat: number,
    lng: number
}

interface bank {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string
}

interface company {
    address: address,
    department: string,
    name: string,
    title: string
}

interface hair {
    color: string,
    type: string
}

export interface UserState {
    user: users[],
    loadingFlag: boolean
}
