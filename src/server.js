import Express from "express";
import http from "http";

(() => {
    const app = Express();

    app.use(`*`, (req, res, next) => {
        console.log(`${req.method} ${req.originalUrl}`);
        next();
    });

    app.use(Express.static("public"));

    app.use(`*`, (req, res) => {
        console.log(`404 ${req.originalUrl}`);
        res.statusMessage = `404 Page Not Found: ${req.originalUrl}`;
        res.status(404);
        res.send(`404: page not found`);
        res.end();
    });

    const server = http.createServer(app);

    server.listen(8000, "0.0.0.0", () => {
        console.log(`Listening on port 8000`);
    });

    process.on(`SIGINT`, () => stop(server));
    process.on(`SIGTERM`, () => stop(server));
})();

function stop(server) {
    console.log(`Stopping server`);
    server.close();
    process.exit();
}
