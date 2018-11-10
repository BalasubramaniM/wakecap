import {
    APP_LOAD,
    REDIRECT,
    SELECT_WORKER,
    LOGOUT
} from "../constants/actionTypes";

// Array of Workers
const workersList = [
    {
        name: "Adelina Thomson",
        id: "0",
        designation: "Worker",
        supervisor: "Ismaeel Stevens",
        lastZone: "Zone 2",
        zoneDetails: [
            {
                Zone: "Zone 1",
                Hours: 11
            },
            {
                Zone: "Zone 2",
                Hours: 25
            },
            {
                Zone: "Zone 3",
                Hours: 86
            },
            {
                Zone: "Zone 4",
                Hours: 40
            }
        ]
    },
    {
        name: "Zack Barron",
        id: "1",
        designation: "Worker",
        supervisor: "Ismaeel Stevens",
        lastZone: "Zone 1",
        zoneDetails: [
            {
                Zone: "Zone 1",
                Hours: 100
            },
            {
                Zone: "Zone 2",
                Hours: 200
            },
            {
                Zone: "Zone 3",
                Hours: 1222
            },
            {
                Zone: "Zone 4",
                Hours: 606
            }
        ]
    },
    {
        name: "Fearne Cano",
        id: "2",
        designation: "Worker",
        supervisor: "Ansh Wilson",
        lastZone: "Zone 3",
        zoneDetails: [
            {
                Zone: "Zone 1",
                Hours: 21
            },
            {
                Zone: "Zone 2",
                Hours: 45
            },
            {
                Zone: "Zone 3",
                Hours: 33
            },
            {
                Zone: "Zone 4",
                Hours: 59
            }
        ]
    },
    {
        name: "Hallie Keeling",
        id: "3",
        designation: "Worker",
        supervisor: "Ansh Wilson",
        lastZone: "Zone 4",
        zoneDetails: [
            {
                Zone: "Zone 1",
                Hours: 345
            },
            {
                Zone: "Zone 2",
                Hours: 3333
            },
            {
                Zone: "Zone 3",
                Hours: 1500
            },
            {
                Zone: "Zone 4",
                Hours: 990
            }
        ]
    }
];

// Array of Workers Options - for Select Box.
const workersOptions = [
    {
        value: 0,
        label: "Adelina Thomson"
    },
    {
        value: 1,
        label: "Zack Barron"
    },
    {
        value: 2,
        label: "Fearne Cano"
    },
    {
        value: 3,
        label: "Hallie Keeling"
    }
];

const defaultState = {
    appName: "WakeCap",
    auth: false,
    appLoaded: false,
    workersList: workersList,
    workersOptions: workersOptions,
    workerID: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                appLoaded: true,
                auth: action.auth,
                redirectTo: action.auth ? null : "/login"
            };
        case LOGOUT:
            return {
                ...state,
                redirectTo: "/login"
            };
        case SELECT_WORKER:
            return {
                ...state,
                workerID: action.workerID
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        default:
            return state;
    }
};
