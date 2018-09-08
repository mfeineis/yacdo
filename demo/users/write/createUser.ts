
export function setup() {
    const emailLookup = new Set();

    function replay(msg: Fact) {
        switch (msg.id) {
            case "USER_CREATED!":
                emailLookup.add(msg.body.email);
                break;
        }
    }

    function handler(intent: Intent, req: IntentContext) {
        if (emailLookup.has(intent.body.email)) {
            req.status(400, "Email already taken.");
            return;
        }

        req.stateFact("USER_CREATED!", {
            ...intent,
        });

        req.status(200);
    }

    function health(req: RequestContext) {
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

    function onSignal() {
        // TODO: React to TERM or whatever...
    }

    return {
        handler,
        health,
        replay,
        onSignal,
    };
}