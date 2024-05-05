export function convertToSlug(value: string): string {
    return value
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}
