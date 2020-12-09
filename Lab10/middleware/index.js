const middlewareCommon = require("./middlewareCommon");
const middlewarePrivate = require("./middlewarePrivate");

function constructor(app) {
    app.use(middlewareCommon);
    app.use("/private", middlewarePrivate);
}

module.exports = constructor;