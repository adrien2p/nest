import { MicroserviceConfiguration } from '@nestjs/microservices';
import { INestMicroservice, ExceptionFilter, PipeTransform } from './index';
import { WebSocketAdapter } from './web-socket-adapter.interface';

export interface INestApplication {
    /**
     * Initializes application. It is not necessary to call this method directly.
     *
     * @returns Promise
     */
    init(): Promise<void>;

    /**
     * The wrapper function around native `express.use()` method.
     * Example `app.use(bodyParser.json())`
     *
     * @param  {} requestHandler Express Request Handler
     * @returns void
     */
    use(requestHandler): void;

    /**
     * Starts the application.
     *
     * @param  {number} port
     * @param  {Function} callback Optional callback
     * @returns Promise
     */
    listen(port: number, callback?: () => void): Promise<any>;

    /**
     * Starts the application and can be awaited.
     *
     * @param  {number} port
     * @returns Promise
     */
    listenAsync(port: number): Promise<any>;

    /**
     * Setups the prefix for the every HTTP route path
     *
     * @param  {string} prefix The prefix for the every HTTP route path (for example `/v1/api`)
     * @returns void
     */
    setGlobalPrefix(prefix: string): void;

    /**
     * Setup Web Sockets Adapter, which will be used inside Gateways.
     * Use, when you want to override default `socket.io` library.
     *
     * @param  {WebSocketAdapter} adapter
     * @returns void
     */
    useWebSocketAdapter(adapter: WebSocketAdapter): void;

    /**
     * Connects microservice to the NestApplication instance. It transforms application to the hybrid instance.
     *
     * @param  {MicroserviceConfiguration} config Microservice configuration objet
     * @returns INestMicroservice
     */
    connectMicroservice(config: MicroserviceConfiguration): INestMicroservice;

    /**
     * Returns array of the connected microservices to the NestApplication.
     *
     * @returns INestMicroservice[]
     */
    getMicroservices(): INestMicroservice[];

    /**
     * Starts all the connected microservices asynchronously
     *
     * @param  {Function} callback Optional callback function
     * @returns void
     */
    startAllMicroservices(callback?: () => void): void;

    /**
     * Starts all the connected microservices and can be awaited
     *
     * @returns Promise
     */
    startAllMicroservicesAsync(): Promise<void>;

    /**
     * Setups exception filters as a global filters (will be used inside every HTTP route path)
     *
     * @param  {ExceptionFilter[]} ...filters
     */
    useGlobalFilters(...filters: ExceptionFilter[]);

    /**
     * Setups pipes as a global pipes (will be used inside every HTTP route path)
     *
     * @param  {PipeTransform[]} ...pipes
     */
    useGlobalPipes(...pipes: PipeTransform<any>[]);

    /**
     * Terminates the application (both NestApplication, Web Socket Gateways and every connected microservice)
     *
     * @returns void
     */
    close(): void;
}