const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

const { map } = require("ramda");
const yaml = require("yaml").default;

const Koa = require("koa");
const mount = require("koa-mount");
const router = require("koa-router")();
const send = require("koa-send");
const serve = require("koa-static");

const app = new Koa();

router.get("/api/hello", async ctx => {
    ctx.body = "Hello World from Koa.js!";
});

const loadYaml = async filePath => {
    console.log("loadYaml", filePath);
    const buffer = await readFile(filePath, { encoding: "utf-8" });
    console.log("  buffer", buffer);

    const schema = yaml.parse(buffer);
    console.log("  schema", schema);

    return schema;
};

router.get("/api/schema", async ctx => {
    const baseDir = path.resolve(__dirname, "../../demo/");
    const filePath = path.join(baseDir, "./yacdo.yaml");
    console.log(`serving ${filePath}...`);

    const schema = await loadYaml(filePath);

    schema.system.processors = await Promise.all(
        map(
            p => loadYaml(path.join(baseDir, p, "yacdo.yaml")),
            schema.system.processors || [],
        )
    );

    ctx.body = JSON.stringify(schema, null, "  ");
});

app.use(serve("./public/"));
app.use(router.routes());

const PORT = 4000;
app.listen(PORT);
console.log(`Running on ${PORT}`);