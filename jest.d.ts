type OwnMatcher<Params extends unknown[]> = (
  this: jest.MatcherContext,
  actual: unknown,
  ...params: Params
) => jest.CustomMatcherResult
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeInTheList(possibleResults: R[]): T
    }
    interface ExpectExtendMap {
      toBeInTheList: OwnMatcher<[possibleResults: R[]]>
    }
  }
}
