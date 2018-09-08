
export function setup() {

    function handler(next, req: RequestContext) {
        next();
    }

    return {
        handler,
    };
}