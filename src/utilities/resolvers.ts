import * as CSTypes from './custom_scalar_types.js';
import * as Queries from '../db/queries.js';

export const resolvers = {
    Query: {
      planets: () => Queries.getPlanets(),
      spaceCenter: (_,args) => Queries.getSpaceCenterByIdOrUUID(args.id, args.uid).first(),
      spaceCenters: (_,args) => Queries.getSpaceCenters().then(function(rows){
        return{
          total: rows.length,
          page: args.page,
          pageSize: args.pageSize,
          nodes: rows.slice(args.pageSize*(args.page-1), args.pageSize*args.page)
        }
      }),
      flights: (_,args) => Queries.getFlights(args.from, args.to, args.seatCount, args.departureDay).then(function(rows){

        var arr = rows.slice(args.pageSize*(args.page-1), args.pageSize*args.page)

        var narr = []

        for(const node of arr){
          var carr = {
            id: node.id,
            code: node.code,
            departureAt: node.departure_at,
            seatCount: node.seat_count,
            availableSeats: node.seat_available,
            launchSite:{
              uid: node.launch_uid
            },
            landingSite:{
              uid: node.land_uid
            }
          }
          narr.push(carr)
        }

        return{
          total: rows.length,
          page: args.page,
          pageSize: args.pageSize,
          nodes: narr
        }
      }),
      flight: (_,args) => Queries.getFlightByCodeOrId(undefined,args.id).first().then(function(rows){
        return {
          id: rows.id,
          code: rows.code,
          departureAt: rows.departure_at,
          seatCount: rows.seat_count,
          availableSeats: rows.seat_available,
          launchSite: {
            uid: rows.launch_uid
          },
          landingSite: {
            uid: rows.land_uid
          },
        }
      }),
      booking: (_,args) => Queries.getBookingById(args.id).first().then(function(rows){
        return {
          id: rows.id,
          seatCount: rows.seat_count,
          email: rows.email,
          flight: {
            code: rows.flight_code
          }
        }
      }),
      bookings: (_,args) => Queries.getBookingByEmail(args.email).then(function(rows){

        var arr = rows.slice(args.pageSize*(args.page-1), args.pageSize*args.page)

        var narr = []

        for(const node of arr){
          var carr = {
            id: node.id,
            seatCount: node.seat_count,
            email: node.email,
            flight:{
              code: node.flight_code
            }
          }
          narr.push(carr)
        }


        return{
          total: rows.length,
          page: args.page,
          pageSize: args.pageSize,
          nodes: narr
        }
      }),
      
    },
  
    Planet: {
      spaceCenters(parent, args){
        return Queries.getSpaceCentersByPlanetCode(parent.code, args.limit)
      }
    },
  
    SpaceCenter: {
      planet(parent){
        return Queries.getPlanetByPlanetCode(parent.planet_code).first()
      }
    },

    Flight: {
      launchSite: (parent) => Queries.getSpaceCenterByIdOrUUID(undefined,parent.launchSite.uid).first(),
      landingSite: (parent) => Queries.getSpaceCenterByIdOrUUID(undefined,parent.landingSite.uid).first()
    },

    Booking: {
      flight: (parent) => Queries.getFlightByCodeOrId(parent.flight.code).first().then(function(rows){
        return{
          id: rows.id,
          code: rows.code,
          departureAt: rows.departure_at,
          seatCount: rows.seat_count,
          availableSeats: rows.seat_available,
          launchSite: {
            uid: rows.launch_uid
          },
          landingSite: {
            uid: rows.land_uid
          }
        }
      })
    },

    Mutation: {
      scheduleFlight: (_, args) => Queries.scheduleFlight(args.info.launchingSiteUid, args.info.landingSiteUid, args.info.departureAt, args.info.seatCount).then(function(rows){
        return {
          id: rows[0].id,
          code: rows[0].code,
          departureAt: rows[0].departure_at,
          seatCount: rows[0].seat_count,
          availableSeats: rows[0].seat_available,
          launchSite: Queries.getSpaceCenterByIdOrUUID(_,rows[0].launch_uid).first(),
          landingSite: Queries.getSpaceCenterByIdOrUUID(_,rows[0].land_uid).first()
        }
    }),
      bookFlight: (_, args) => Queries.bookSeat(args.info.flightCode, args.info.seatCount).then(async function(rows){

        const book = await Queries.bookFlight(args.info.seatCount, args.info.flightCode, args.info.email).then(function(brows){
          return brows
        })

        console.log(rows, book)

        return{
          id: book[0].id,
          seatCount: book[0].seat_count,
          email: book[0].email,
          flight: {
            id: rows[0].id,
            code: rows[0].code,
            departureAt: rows[0].departure_at,
            seatCount: rows[0].seat_count,
            availableSeats: rows[0].seat_available,
            launchSite: Queries.getSpaceCenterByIdOrUUID(_,rows[0].launch_uid).first(),
            landingSite: Queries.getSpaceCenterByIdOrUUID(_,rows[0].land_uid).first()
          }
        }
      }),
    },
  
  
    Email: CSTypes.Email,
    UUID: CSTypes.UUID,
    Date: CSTypes.dateScalar,
    max10: CSTypes.max10,
    min1Max100: CSTypes.min1Max100,
    Hex: CSTypes.Hex,
    min1: CSTypes.min1
  };