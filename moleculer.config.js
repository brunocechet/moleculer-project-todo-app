'use strict';

module.exports = {
    // Namespace of nodes to segment your nodes on the same network.
    namespace: 'todo-app',
    // Unique node identifier. Must be unique in a namespace.
    nodeID: 'todo-app-' + process.pid,
    // Custom metadata store. Store here what you want. Accessing: `this.broker.metadata`
    metadata: {},

    // Enable/disable logging or use custom logger. More info: https://moleculer.services/docs/0.14/logging.html
    // Available logger types: "Console", "File", "Pino", "Winston", "Bunyan", "debug", "Log4js", "Datadog"
    logger: {
        type: 'Console',
        options: {
            // Using colors on the output
            colors: true,
            // Print module names with different colors (like docker-compose for containers)
            moduleColors: true,
            // Line formatter. It can be "json", "short", "simple", "full", a `Function` or a template string like "{timestamp} {level} {nodeID}/{mod}: {msg}"
            formatter: 'full',
            // Custom object printer. If not defined, it uses the `util.inspect` method.
            objectPrinter: null,
            // Auto-padding the module name in order to messages begin at the same column.
            autoPadding: true,
        },
    },

    // Default log level for built-in console logger. It can be overwritten in logger options above.
    // Available values: trace, debug, info, warn, error, fatal
    logLevel: 'info',

    transporter: process.env.REDIS_URL || 'TCP',

    cacher: {
        type: 'memory',
        options: {
            ttl: 30, // 30 seconds
        },
    },

    serializer: 'JSON',

    requestTimeout: 10 * 1000,

    // Retry policy settings. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Retry
    retryPolicy: {
        // Enable feature
        enabled: true,
        // Count of retries
        retries: 5,
        // First delay in milliseconds.
        delay: 200,
        // Maximum delay in milliseconds.
        maxDelay: 2000,
        // Backoff factor for delay. 2 means exponential backoff.
        factor: 2,
        // A function to check failed requests.
        check: (err) => err && !!err.retryable,
    },

    // Limit of calling level. If it reaches the limit, broker will throw an MaxCallLevelError error. (Infinite loop protection)
    maxCallLevel: 100,

    // Number of seconds to send heartbeat packet to other nodes.
    heartbeatInterval: 10,

    // Number of seconds to wait before setting node to unavailable status.
    heartbeatTimeout: 30,

    // Cloning the params of context if enabled. High performance impact, use it with caution!
    contextParamsCloning: false,

    // Tracking requests and waiting for running requests before shuting down. More info: https://moleculer.services/docs/0.14/context.html#Context-tracking
    tracking: {
        // Enable feature
        enabled: true,
        // Number of milliseconds to wait before shuting down the process.
        shutdownTimeout: 10 * 1000,
    },

    hotReload: true,

    // Disable built-in request & emit balancer. (Transporter must support it, as well.). More info: https://moleculer.services/docs/0.14/networking.html#Disabled-balancer
    disableBalancer: false,

    registry: {
        discoverer: process.env.REDIS_URL || 'Local',
    },

    // Settings of Circuit Breaker. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Circuit-Breaker
    circuitBreaker: {
        // Enable feature
        enabled: true,
        // Threshold value. 0.5 means that 50% should be failed for tripping.
        threshold: 0.5,
        // Minimum request count. Below it, CB does not trip.
        minRequestCount: 20,
        // Number of seconds for time window.
        windowTime: 60,
        // Number of milliseconds to switch from open to half-open state
        halfOpenTime: 10 * 1000,
        // A function to check failed requests.
        check: (err) => err && err.code >= 500,
    },

    // Settings of bulkhead feature. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Bulkhead
    bulkhead: {
        // Enable feature.
        enabled: true,
        // Maximum concurrent executions.
        concurrency: 10,
        // Maximum size of queue
        maxQueueSize: 100,
    },

    // Enable action & event parameter validation. More info: https://moleculer.services/docs/0.14/validating.html
    validator: true,

    errorHandler: null,

    // Enable/disable built-in metrics function. More info: https://moleculer.services/docs/0.14/metrics.html
    metrics: {
        enabled: false,
    },

    // Enable built-in tracing function. More info: https://moleculer.services/docs/0.14/tracing.html
    tracing: {
        enabled: true,
        // Available built-in exporters: "Console", "Datadog", "Event", "EventLegacy", "Jaeger", "Zipkin"
        exporter: {
            type: 'Console', // Console exporter is only for development!
            options: {
                // Custom logger
                logger: null,
                // Using colors
                colors: true,
                // Width of row
                width: 100,
                // Gauge width in the row
                gaugeWidth: 40,
            },
        },
    },

    // Register custom middlewares
    middlewares: [],

    // Register custom REPL commands.
    replCommands: null,

    // Called after broker created.
    created() {},

    // Called after broker started.
    async started(broker) {
        broker.repl();
    },

    // Called after broker stopped.
    async stopped() {},
};
