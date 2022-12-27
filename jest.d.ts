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
