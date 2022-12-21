import { ERROR_INCORRECT_VALUE, ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import ArrayContain from 'src/matchers/ArrayContain'
import { getObjectsFromArrayById, IGetObjectsFromArrayByIdProps } from 'src/utils/getObjectsFromArrayById' // fn getObjectsFromArrayById get params as object

// fn getObjectsFromArrayById get params as object
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
  const ignoredIds = ['1', '4']

  test('collection empty', () => {
    const config = { collection: [], amount: 3 }
    expect(getObjectsFromArrayById<IObject>(config)).toEqual([])
  })

  test('linear order without ignored ids', () => {
    const config = { collection, amount }
    const result = collection.slice(0, amount)

    expect(getObjectsFromArrayById<IObject>(config)).toStrictEqual(result)
  })

  test('linear order with ignored ids', () => {
    const config = { collection, amount, ignoredIds }
    const result = [
      {
        name: 'object 2',
        id: '2',
      },
      {
        name: 'object 3',
        id: '3',
      },
      {
        name: 'object 5',
        id: '5',
      },
    ]

    expect(getObjectsFromArrayById<IObject>(config)).toEqual(result)
  })

  test('random order with ignored ids', () => {
    const config = { collection, amount, ignoredIds, isRandomOrder: true }
    const result = [
      {
        name: 'object 2',
        id: '2',
      },
      {
        name: 'object 3',
        id: '3',
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

    expect(getObjectsFromArrayById<IObject>(config)).toHaveLength(amount)
    expect(getObjectsFromArrayById<IObject>(config)).ArrayContain(result)
    expect(getObjectsFromArrayById<IObject>(config)).not.ArrayContain(isNotToBe)
  })

  test('amount more collection length', () => {
    const config = { collection, amount: collection.length + 5 }
    expect(getObjectsFromArrayById<IObject>(config)).toHaveLength(collection.length)
    expect(getObjectsFromArrayById<IObject>(config)).toEqual(collection)
  })

  test('amount 0', () => {
    const config = { collection, amount: 0 }
    expect(getObjectsFromArrayById<IObject>(config)).toEqual([])
  })

  test('ignoreIds like object', () => {
    const config = { collection, amount: 3, ignoredIds: { '1': true, '2': true } }
    const result = [
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
    ]
    expect(getObjectsFromArrayById<IObject>(config)).toEqual(result)
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
    expect(() => getObjectsFromArrayById<IObject>(config)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('collection string', () => {
    const config = { collection: 'string', amount: 3 } as ConfigUnknown as IGetObjectsFromArrayByIdProps<IObject>
    expect(() => getObjectsFromArrayById<IObject>(config)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('amount less than zero', () => {
    const config = { collection, amount: -4 }
    expect(() => getObjectsFromArrayById<IObject>(config)).toThrow(ERROR_INCORRECT_VALUE)
  })

  test('amount like undefined', () => {
    const config = { collection, amount: undefined }
    expect(() => getObjectsFromArrayById<IObject>(config)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('ignoreIds like boolean', () => {
    const config = {
      collection,
      amount: 3,
      ignoredIds: true,
    } as ConfigUnknown as IGetObjectsFromArrayByIdProps<IObject>
    expect(() => getObjectsFromArrayById<IObject>(config)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
