
export function setup() {
    const users = new Map();

    function replay(msg) {
        switch (msg.type) {
            case "USER_CREATED!":
                users.set(msg.body.userId, msg.body);
                break;
        }
    }

    function query(req: QueryContext) {

    }

    return {
        query,
        replay,
    }
}