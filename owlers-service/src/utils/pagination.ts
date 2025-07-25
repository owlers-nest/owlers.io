export const getLimitAndOffset = (page: number) => {
    if (page === 1) {
        return {
            offset: 0,
            limit: 10
        }
    } else {
        return {
            offset: page * 10 - 10,
            limit: 10
        }
    }
};
