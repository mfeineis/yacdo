
interface RequestContext {
    headers: {
        Authorize?: string;
    },
    send(it?: any);
}

interface IntentContext {
    stateFact(name: String, body: any),
    status(statusCode: Number, message?: String),
}

interface Message {
    id: String,
    type: "fact" | "intent",
    body: any,
    meta: {
        correlationId: String[],
        timestamp: Number,
    },
}

interface Intent extends Message {
    type: "intent",
}

interface Fact extends Message {
    type: "fact",
}

interface QueryContext {

}