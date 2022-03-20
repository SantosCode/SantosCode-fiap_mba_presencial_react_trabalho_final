export class ErrorException extends Error {
  public constructor(
    public message: string = "Business Error",
    public code?: string
  ) {
    super();
  }
}