const emit = (ctx, eventName, ...args) => {
	const eventHandler = ctx.listeners[eventName];
	if (typeof eventHandler === 'function') {
		eventHandler(...args);
	}
};

export default emit;
