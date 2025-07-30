if (process.env.BASE_URL) {
    module.exports = { BASE_URL: process.env.BASE_URL };
}
else {
    module.exports = {};
}
