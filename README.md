<p align="center">
	<br>
	<img src="/.github/logo.png">
	<br><br>
	<a href="https://npm.im/vue-subslot"><img src="https://badgen.net/npm/v/vue-subslot"></a>
	<a href="https://npm.im/vue-subslot"><img src="https://badgen.net/npm/dm/vue-subslot"></a>
	<a href="https://packagephobia.now.sh/result?p=vue-subslot"><img src="https://packagephobia.now.sh/badge?p=vue-subslot"></a>
	<br>
</p>

> Use [Subslot](https://npm.im/vue-subslot) in your Vue component to gain _finer control_ over your slots and to offer a _richer slot API_.

## :rocket: Quick setup

#### Install
```sh
npm i vue-subslot
```

#### Import and use as a Vue component
```js
import Subslot from 'vue-subslot';

export default {
	...
	components: {
		Subslot
	}
	...
}
```


## :beginner: Use case
Have you ever developed a parent-child component set, and wanted to allow users to pass in the child-component without specifiying a slot but still have the same level of control as named-slots? With Subslot, you can!

### Demo 1: Inline filter attributes&nbsp;&nbsp;[![JSFiddle Demo](https://flat.badgen.net/badge/JSFiddle/Open%20Demo/blue)](https://jsfiddle.net/hirokiosame/6fzeuh97/)
Imagine being able to offer the following API with parent-child components _Card_ and _CardHeader_.
```html
<card>
	<!-- The Card Header will be positioned separetely from the content -->
	<card-header>
		My special card
	</card-header>

	My card content
</card>
```

Using Subslot, this is all the code you need to make this possible. This is what _Card.vue_ looks like.
```vue
<template>
	<div class="card">
		<div class="card-header">
			<!-- Pick out the Card Header from the default slot -->
			<subslot element="@CardHeader" limit="1" />
		</div>

		<div class="card-content">
			<!-- Use the remainder -->
			<subslot not element="@CardHeader" />
		</div>
	</div>
</template>

<script>
import Subslot from 'vue-subslot';
import CardHeader './CardHeader.vue';

export default {
	name: 'Card',

	components: {
		Subslot,
		CardHeader,
	}
};
</script>
```


### Demo 2: Defining Subslots&nbsp;&nbsp;[![JSFiddle Demo](https://flat.badgen.net/badge/JSFiddle/Open%20Demo/blue)](https://jsfiddle.net/hirokiosame/tcvp0r98/)
Alternatively to using inline filter attributes, you can define subslots on the component. With this approach, you can access subslots like you would normal slots but via `$subslots`. This is what _Card.vue_ would look like.
```vue
<template>
	<div class="card">
		<div
			v-if="$subslots.cardHeader"
			class="card-header"
		 >
			<subslot name="cardHeader" />
		</div>

		<div class="card-content">
			<!-- Use the remainder -->
			<subslot />
		</div>
	</div>
</template>

<script>
import Subslot from 'vue-subslot';
import CardHeader './CardHeader.vue';

export default {
	name: 'Card',

	components: {
		Subslot,
		CardHeader,
	},

	mixins: [
		Subslot.define({
			// Use a string filter
			cardHeader: '@CardHeader:1', // Limit 1
			cardHeader: '@CardHeader[3:2]', // Offset 3, Limit 2

			// Or an object filter
			cardHeader: {
				element: '@CardHeader',
				limit: 1,
			},
		}),
	],
};
</script>
```


## :book: API

### Filter by element tag
As a string, it filters the vnodes by tag (as opposed to component)
```html
<subslot element="div" />
```

Filter the vnodes with tag `child-component`
```html
<subslot element="ChildComponent" />
```

### To match a specific component
Use the `@` prefix to use the component from the `components` hash
```html
<subslot element="@ChildComponent" />
```

Or, pass in the direct Component reference
```html
<subslot :element="ChildComponent" />
```

### To match multiple elements
Pass in an array

```html
<subslot :element="[ChildComponentA, '@ChildComponentB', 'div']" />
```

### Offset the number of returned elements
```html
<subslot
	element="ChildComponent"
	offset="1"
/>
```

### Limit the number of returned elements
```html
<subslot
	element="ChildComponent"
	offset="1"
	limit="1"
/>
```

### Inverse the filter
Set the `not` boolean to inverse the filter and get everything that _doesn't_ match.
```html
<subslot not element="@ChildComponent" />
```

### Slot fallback
Like normal slots, what you pass into the slot of `subslot` will be the fallback content of that `subslot`.
```html
<subslot name="banner">
	<default-banner />
</subslot>
```

## :loop: Events
- `@no-match`: Emitted when there are no matching vnodes


## :zap: Advanced usage

### Pass in vnodes from a difference source
```html
<subslot
	:vnodes="$slots.namedSlot"
	element="@ChildComponent"
/>
```
