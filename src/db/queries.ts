
import db from './db.js';
import crypto from 'crypto';

export function getPlanets(){
    return db('planet').select('*')
}

export function getSpaceCentersByPlanetCode(planet_code: string, limit: number = 5){
    return db('space_center').select('*').where('planet_code', planet_code).limit(limit)
}

export function getSpaceCenterByIdOrUUID(id?: number, UUID?: string){
    if(typeof id === 'undefined' && typeof UUID === 'string'){
        return db('space_center').select('*').where('uid', UUID)
    }
    if(typeof id === 'number' && typeof UUID === 'undefined'){
        return db('space_center').select('*').where('id', id)
    }
}

export function getPlanetByPlanetCode(code: string){
    return db('planet').select('*').where('code', code)
}

export function getFlightByCodeOrId(code?: string, id?:number){
    if(typeof id === 'undefined' && typeof code === 'string'){
        return db('flight').select('*').where('code', code)
    }
    if(typeof id === 'number' && typeof code === 'undefined'){
        return db('flight').select('*').where('id', id)
    }
}

export function getBookingById(id:number){
    return db('booking').select('*').where('id', id) 
}

export function getBookingByEmail(email:string){
    return db('booking').select('*').where('email', email)
}

export function getSpaceCenters(){
    return db('space_center').select('*')
}

export function getFlights(from: string, to: string, seatCount: number, departureDay: Date){
    return db('flight').select('*').where('launch_uid', from).where('land_uid', to).where('departure_at', departureDay).where('seat_available', '>=', seatCount)
}

export function scheduleFlight(launchSiteUid: string, landingSiteUid: string, departureAt: Date, seatCount: number){
    return db('flight')
    .insert({
        launch_uid: launchSiteUid,
        land_uid: landingSiteUid,
        departure_at: departureAt,
        seat_count: seatCount,
        code: crypto.randomBytes(16).toString('hex'),
        seat_available: seatCount
    }).returning('*')
}

export function bookSeat(code: string, count: number){
    return db('flight')
    .where('code', code).where('seat_available', '>=', count)
    .decrement({
        seat_available: count
    }).returning('*')
}

export function bookFlight(seatCount: number, flightCode: string, email: string){
    return db('booking')
    .insert({
        seat_count: seatCount,
        email: email,
        flight_code: flightCode
    }).returning('*')
}