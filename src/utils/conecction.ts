const CLOUD = import.meta.env.VITE_APP_DATABASE_URL
const LOCAL = import.meta.env.VITE_APP_DATABASE_LOCAL

export const API_URL = CLOUD;
export const TRAKING_ID = import.meta.env.VITE_APP_TRACKING_ID