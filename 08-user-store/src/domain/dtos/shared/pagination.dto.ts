export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  public static createPagination(
    page: number = 1,
    limit: number = 10
  ): [string?, PaginationDto?] {
    if (Number.isNaN(page) || Number.isNaN(limit))
      return ["Page and limit must be numbers"];
    if (page <= 0 || limit <= 0)
      return ["Page and limit must be greater than 0"];

    return [undefined, new PaginationDto(page, limit)];
  }
}
