
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
        // TODO: Report health!
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