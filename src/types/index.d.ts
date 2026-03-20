declare type LoginFormValues = {
    username: string;
    password: string;
};

declare interface AuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

declare type LoginFormValues = {
    username: string;
    password: string;
};

declare interface JwtPayload {
    exp: number;
    iat: number;
    id: number;
    username: string;
}

declare type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    image: string;
    company: {
        department: string;
        title: string;
    };
};
declare type Address = {
    address: string;
    stateCode: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
};

declare type EmployeeDetail = {
    id: number;
    firstName: string;
    maidenName?: string;
    lastName: string;
    university: string;
    email: string;
    phone: string;
    image: string;
    age: number;
    birthDate: string;
    bloodGroup: string;
    height: number;
    weight: number;
    gender: string;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    address: Address;
    company: {
        department: string;
        title: string;
        name: string;
        address: Address;
    };
};
