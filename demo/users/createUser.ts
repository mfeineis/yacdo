
interface Context {
    env: {
        DEBUG?: Boolean,
    },
}

interface HealthContext extends Context {
    headers: {
        Authorize?: string;
    },
    send(it?: any);
}

interface IntentContext extends Context {
    stateFact(name: String, body: any),
    status(statusCode: Number, message?: String),
}

const emailLookup = new Set();

export function replay(msg) {
    switch (msg.type) {
        case "USER_CREATED!":
            emailLookup.add(msg.body.email);
            break;
    }
}

export function handler(req: IntentContext, intent) {
    const { env: { DEBUG } } = req;

    if (emailLookup.has(intent.body.email)) {
        req.status(400, "Email already taken.");
        return;
    }

    req.stateFact("USER_CREATED!", {
        ...intent,
    });

    req.status(200);
}

export function health(req: HealthContext) {
    console.log("createUser.health called");

    if (!req.headers.Authorize) {
        req.send();
        return;
    }

    if (req.headers.Authorize === "valid-token") {
        req.send();
        return;
    } else {
        req.send({
            body: {
                errorCode: 401,
                message: "Unauthorized",
            },
        });
        return;
    }
}
