
export function setup() {
    const users = new Map();

    function replay(msg: Message) {
        switch (msg.id) {
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