import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class FormatStringPipe
  implements PipeTransform<string, Record<string, unknown> | string>
{
  transform(
    value: Record<string, unknown> | string,
  ): Record<string, unknown> | string {
    if (typeof value === "object" && "title" in value) {
      const title = (value.title as string).trim().toLowerCase();

      return {
        ...value,
        title,
      };
    }
    if (typeof value === "object" && "name" in value) {
      const name = (value.name as string).trim().toLowerCase();

      return {
        ...value,
        name,
      };
    }

    return value;
  }
}
