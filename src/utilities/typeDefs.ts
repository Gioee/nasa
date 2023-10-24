export const typeDefs = `#graphql

  scalar Email
  scalar UUID
  scalar Date
  scalar max10
  scalar min1Max100
  scalar Hex
  scalar min1

  type Planet{
    id: Int!
    name: String!
    code: String!
    spaceCenters(limit: max10): [SpaceCenter]
  }

  type SpaceCenter{
    id: Int!
    name: String!
    uid: UUID!
    description: String!
    latitude: Float!
    longitude: Float!
    planet: Planet!
  }

  type Flight{
    id: Int!
    code: Hex!
    departureAt: Date!
    seatCount: Int!
    launchSite: SpaceCenter!
    landingSite: SpaceCenter!
    availableSeats: Int
  }

  type Booking{
    id: Int!
    seatCount: Int!
    email: Email!
    flight: Flight!
  }

  type pageSpaceCenter{
    total: Int!
    page: Int!
    pageSize: Int!
    nodes: [SpaceCenter]
  }

  type pageFlights{
    total: Int!
    page: Int!
    pageSize: Int!
    nodes: [Flight]
  }

  type pageBookings{
    total: Int!
    page: Int!
    pageSize: Int!
    nodes: [Booking]
  }

  type Query{
    planets: [Planet]
    spaceCenters(page: min1 = 1, pageSize: min1Max100 = 10): pageSpaceCenter
    spaceCenter(id: Int, uid: UUID): SpaceCenter
    flights(from: UUID, to: UUID, seatCount: Int, departureDay: Date, page: min1 = 1, pageSize: min1Max100 = 10): pageFlights
    flight(id: Int): Flight
    bookings(email: Email, page: min1 = 1, pageSize: min1Max100 = 10): pageBookings
    booking(id: Int): Booking
  }

  type Mutation{
    scheduleFlight(info: flightInfo): Flight
    bookFlight(info: bookingInfo): Booking
  }

  input flightInfo{
    launchingSiteUid: UUID!
    landingSiteUid: UUID!
    departureAt: Date!
    seatCount: Int!
  }

  input bookingInfo{
    seatCount: Int!
    flightCode: Hex!
    email: Email!
  }
`;