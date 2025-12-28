export const getDates = () => {
    const now = new Date()

    const oneDayAgo = new Date(now);
    oneDayAgo.setDate(now.getDate() - 1);

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    return {
        oneDayAgo,
        sevenDaysAgo,
        thirtyDaysAgo,
        oneYearAgo
    }
}