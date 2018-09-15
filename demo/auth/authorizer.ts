
export function main() {

    function handler(next: Function, req: RequestContext) {
        next();
    }

    return {
        handler,
    };
}