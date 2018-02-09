module.exports = {
    selectBurgers: () => {
        return new Promise((resolve, reject)  => {
            reject(new Error('couldn\'t find burgers'));
        });
    }
}