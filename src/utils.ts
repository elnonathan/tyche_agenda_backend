export const isNumber = (num?: number | string | null): boolean => {
	if (num === null || num === undefined) return false
	const casted: number = Number(num)
	return !isNaN(casted)
}
