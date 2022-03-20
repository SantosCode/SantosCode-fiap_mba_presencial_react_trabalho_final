class Storage {
  private key = "user"

  public setItem = <Value extends object>(value: Value): void => {
    localStorage.setItem(this.key, JSON.stringify(value))
  }

  public getItem = <Value extends object>(): Value | undefined => {
    const rawValue = localStorage.getItem(this.key);

    if (rawValue === null) {
      return undefined
    }

    return JSON.parse(rawValue);
  }

  public removeItem = (): void => {
    localStorage.removeItem(this.key)
  }
}

export default Storage;