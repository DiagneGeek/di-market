export const formatAmount = (num: number) => {
    const length = num.toString().length
    const formatted = num.toLocaleString("fr-FR")
    let quantity = "k"
    return `${formatted} FCFA`
}