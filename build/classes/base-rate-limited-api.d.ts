export declare type RateLimiting = {
    rpm: number;
    rph: number;
};
export declare type RequestFunction = (data?: object) => Promise<any>;
export default abstract class BaseRateLimitedAPI {
    #private;
    protected abstract baseUrl: string;
    private scheduleTick;
    private tick;
    private rateLimitedRequest;
    protected rateLimitedRequestFactory(request: RequestFunction): (data?: object) => Promise<unknown>;
    get rateLimiting(): RateLimiting;
    set rateLimiting(value: RateLimiting);
}
