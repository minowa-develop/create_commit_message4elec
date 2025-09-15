/** unixタイムを表示用の形式に変換 */
export class TimestampComverter {
  public static convTimestamp(unixtime: number): string{
    const date: Date = new Date(unixtime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}