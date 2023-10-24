import * as toTest from '../src/index'

const { server } = jest.requireActual<typeof toTest>("../src/index.ts")

describe("Test one query and one mutation", () => {
  it("runs a flights query", async () => {
    let result = await server.executeOperation({
      query: `#graphql
        query Jest($from: UUID, $to: UUID, $seatCount: Int, $departureDay: Date, $page: min, $pageSize: min1Max100) {
          flights(from: $from, to: $to, seatCount: $seatCount, departureDay: $departureDay, page: $page, pageSize: $pageSize) {
            page
            pageSize
            total
            nodes {
              availableSeats
              code
              id
              seatCount
              departureAt
              landingSite {
                name
              }
              launchSite {
                name
              }
            }
          }
        }
      `,
      variables: {
        from: 'd8067f65-8630-4157-9f9a-21b487d8f929',
        to: '20b18541-12ce-4418-87fb-5faa3b447c46',
        seatCount: 3,
        departureDay: '2025-07-09T16:00:00Z',
        page: 1,
        pageSize: 1
      }
    });
    expect(result).toBeDefined(); //simple query unit test to be finished
  });
  
  /* simple mutation unit test to be finished
  it("should schedule a flight correctly", async () => {
    let result = async () => await server.executeOperation({
      query: `#graphql
        mutation {
          scheduleFlight(
            info: {
              launchingSiteUid: "20b18541-12ce-4418-87fb-5faa3b447c46"
              landingSiteUid: "d8067f65-8630-4157-9f9a-21b487d8f929"
              departureAt: "1970-01-01T00:00:00Z"
              seatCount: 3
            }
          )
        }
      `,
    });
    expect(result).toHaveProperty("code");
  });

  */
});

