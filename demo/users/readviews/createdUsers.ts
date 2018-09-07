interface QueryContext {

}

const users = new Map();

export function replay(msg) {
    switch (msg.type) {
        case "USER_CREATED!":
            users.set(msg.body.userId, msg.body);
            break;
    }
}

export function query(req: QueryContext) {

}