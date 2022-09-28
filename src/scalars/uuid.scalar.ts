import { BadRequestException } from "@nestjs/common";
import { GraphQLScalarType, StringValueNode } from "graphql";

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validate(uuid: unknown): string | never {
  if (typeof uuid !== "string" || !regex.test(uuid)) {
    throw new BadRequestException("Invalid uuid, please try with another one");
  }
  return uuid;
}

export const UuidScalar = new GraphQLScalarType({
  name: "UUID",
  description: "A simple UUID parser",
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (value: StringValueNode) => validate(value.value),
});
