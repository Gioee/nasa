import { GraphQLScalarType, Kind } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value;
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'string') {
      const date = new Date(value);
      if(!isNaN(date.getTime())){
        return date;
      }
    }
    throw new Error('GraphQL Date Scalar parser expected a ISO formatted datetime');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});



function checkNumberBetween(value, b: number, a: number = 0): number{
  if(value < a || value > b){
    throw new Error('Value is outside of the range')
  }
  return value;
}
function literalInt(ast, b: number, a: number = 0){
  if(ast.kind !== Kind.INT){
      throw new Error('Query error: got a: '+ ast.kind)
  }
  return checkNumberBetween(ast, b, a);
}
export const max10 = new GraphQLScalarType({
  name: 'max10',
  description: 'An Integer number between 0 and 10 custom scalar type',
    serialize(value: number) {return checkNumberBetween(value, 10)},
    parseValue(value: number) {return checkNumberBetween(value, 10)},
    parseLiteral(ast) {return literalInt(ast, 10)},
});
export const min1Max100 = new GraphQLScalarType({
    name: 'min1Max100',
    description: 'An Integer number between 1 and 100 custom scalar type',
    serialize(value: number) {return checkNumberBetween(value, 100, 1)},
    parseValue(value: number) {return checkNumberBetween(value, 100, 1)},
    parseLiteral(ast) {return literalInt(ast, 100, 1)},
});
export const min1 = new GraphQLScalarType({
  name: 'min',
  description: 'An Integer number which has to be at least 1 custom scalar type',
  serialize(value: number) {return checkNumberBetween(value, Number.MAX_SAFE_INTEGER, 1)},
  parseValue(value: number) {return checkNumberBetween(value, Number.MAX_SAFE_INTEGER, 1)},
  parseLiteral(ast) {return literalInt(ast, Number.MAX_SAFE_INTEGER, 1)},
});



const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
const validateEmail = value => {
  if(typeof value !== 'string'){
      throw new Error('Value is not a string')
  }
  if(!EMAIL_REGEX.test(value)){
      throw new Error('Value is not a valid Email')
  }
  return value;
}
export const Email = new GraphQLScalarType({
    name: 'Email',
    description: 'Email custom scalar type',
    serialize: validateEmail,
    parseValue: validateEmail,
    parseLiteral(ast){
      if(ast.kind !== Kind.STRING){
        throw new Error('Query error: got a: '+ ast.kind)
      }
      return validateEmail(ast);
    },
});


const HEX_REGEX = new RegExp(/^[a-zA-Z0-9]{32}$/)
const validateHex = value => {
  if(typeof value !== 'string'){
      throw new Error('Value is not a string')
  }
  if(!HEX_REGEX.test(value)){
      throw new Error('Value is not a valid 16 Byte Hex')
  }
  return value;
}
export const Hex = new GraphQLScalarType({
    name: 'Hex',
    description: '16 Byte Hexadecimal custom scalar type',
    serialize: validateHex,
    parseValue: validateHex,
    parseLiteral(ast){
      if(ast.kind !== Kind.STRING){
        throw new Error('Query error: got a: '+ ast.kind)
      }
      return validateHex(ast);
    },
});



const UUID_REGEX = new RegExp(/[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/i)
const validateUUID = value => {
  if(typeof value !== 'string'){
      throw new Error('Value is not a string')
  }
  if(!UUID_REGEX.test(value)){
      throw new Error('Value is not a valid UUID')
  }
  return value;
}
export const UUID = new GraphQLScalarType({
    name: 'UUID',
    description: 'UUID custom scalar type',
    serialize: validateUUID,
    parseValue: validateUUID,
    parseLiteral(ast){
      if(ast.kind !== Kind.STRING){
        throw new Error('Query error: got a: '+ ast.kind)
      }
      return validateUUID(ast);
    },
});