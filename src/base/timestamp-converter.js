/** unixタイムを表示用の形式に変換 */
export class TimestampComverter {
    static convTimestamp(unixtime) {
        const date = new Date(unixtime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
}
//# sourceMappingURL=timestamp-converter.js.map