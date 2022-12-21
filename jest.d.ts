type OwnMatcher<Params extends unknown[]> = (
  this: jest.MatcherContext,
  actual: unknown,
  ...params: Params
) => jest.CustomMatcherResult

interface CustomMatchers<R = unknown> {
  ArrayContain(possibleResults: R[] | undefined): R
}

declare global {
  namespace jest {
    type Expect = CustomMatchers
    type Matchers<R> = CustomMatchers<R>
    type InverseAsymmetricMatchers = CustomMatchers
  }
}

// declare global {
//   namespace jest {
//     interface Matchers<R, T> {
//       ArrayContain(possibleResults: R[]): T
//     }
//     interface ExpectExtendMap {
//       ArrayContain: OwnMatcher<[possibleResults: R[]]>
//     }
//   }
// }
