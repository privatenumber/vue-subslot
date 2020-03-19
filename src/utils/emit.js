const emit = function (ctx, eventName, /*...args*/) {
	const eventHandler = ctx.listeners[eventName];
	if (typeof eventHandler === 'function') {
		const args = Array.from(arguments).slice(2);
		eventHandler.apply(this, args);
	}
};

export default emit;
