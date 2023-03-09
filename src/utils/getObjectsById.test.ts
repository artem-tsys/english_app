import { ERROR_INCORRECT_VALUE, ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import ArrayContain from 'src/matchers/ArrayContain'
import { getObjectsById, IGetObjectsByIdProps } from 'src/utils/getObjectsById' // fn getObjectsById get params as object

// fn getObjectsById get params as object
// collection, amount, ignoredIds, isRandomOrder
// return collection object without ignoredIds don't more amount

expect.extend({
  ArrayContain,
})

interface IObject {
  id: string
  name: string
}

describe('valid params', () => {
  const collection = [
    {
      name: 'object 1',
      id: '1',
    },
    {
      name: 'object 2',
      id: '2',
    },
    {
      name: 'object 3',
      id: '3',
    },
    {
      name: 'object 4',
      id: '4',
    },
    {
      name: 'object 5',
      id: '5',
    },
    {
      name: 'object 6',
      id: '6',
    },
    {
      name: 'object 7',
      id: '7',
    },
  ]
  const amount = 3

  test('collection empty', () => {
    const config = { collection: [], amount: 3 }
    expect(getObjectsById<IObject>(config)).toEqual([])
  })

  test('linear order without ignored ids', () => {
    const config = { collection, amount }
    const result = collection.slice(0, amount)

    expect(getObjectsById<IObject>(config)).toStrictEqual(result)
  })

  test('random order with', () => {
    const config = { collection, amount, isRandomOrder: true }
    const isNotToBe = [
      {
        name: 'object 2',
        id: '2',
      },
      {
        name: 'object 1',
        id: '1',
      },
      {
        name: 'object 4',
        id: '4',
      },
    ]

    expect(getObjectsById<IObject>(config)).toHaveLength(amount)
    expect(getObjectsById<IObject>(config)).ArrayContain(collection)
    expect(getObjectsById<IObject>(config)).not.ArrayContain(isNotToBe)
  })

  test('amount more collection length', () => {
    const config = { collection, amount: collection.length + 5 }
    expect(getObjectsById<IObject>(config)).toHaveLength(collection.length)
    expect(getObjectsById<IObject>(config)).toEqual(collection)
  })

  test('amount 0', () => {
    const config = { collection, amount: 0 }
    expect(getObjectsById<IObject>(config)).toEqual([])
  })
})

describe('is not valid params', () => {
  type ConfigUnknown = {
    collection: unknown
    amount: unknown
  }
  const collection = [
    {
      name: 'object 1',
      id: '1',
    },
    {
      name: 'object 2',
      id: '2',
    },
    {
      name: 'object 3',
      id: '3',
    },
    {
      name: 'object 4',
      id: '4',
    },
    {
      name: 'object 5',
      id: '5',
    },
    {
      name: 'object 6',
      id: '6',
    },
    {
      name: 'object 7',
      id: '7',
    },
  ]

  test('collection undefined', () => {
    const config = { collection: undefined, amount: 3 }
    expect(() => getObjectsById<IObject>(config)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('collection string', () => {
    const config = { collection: 'string', amount: 3 } as ConfigUnknown as IGetObjectsByIdProps<IObject>
    expect(() => getObjectsById<IObject>(config)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('amount less than zero', () => {
    const config = { collection, amount: -4 }
    expect(() => getObjectsById<IObject>(config)).toThrow(ERROR_INCORRECT_VALUE)
  })

  test('amount like null', () => {
    const config = { collection, amount: null }
    expect(() => getObjectsById<IObject>(config)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
