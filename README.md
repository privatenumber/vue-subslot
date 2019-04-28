# Vue Subslot
Ever wanted to pick out a specific element from the default slot? With Subslot you can! Imagine making a Card component that can offer the following API:

```html
<card>
	<!-- The Card Header will be positioned separetely from the content -->
	<card-header>
		My special card
	</card-header>

	My card content
</card>
```

Using Subslot, this is all the code you need to make this possible!

_Card.vue_
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

Alternatively, you can delegate the filteration logic to the script tag too:. With this syntax, you can access subslots like you would normal slots but via `$subslots`.
_Card.vue_
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

	computed: {
		...Subslot.slots({
			// Use a string filter
			cardHeader: '@CardHeader:1',

			// Or an object filter
			cardHeader: {
				element: '@CardHeader',
				limit: '1',
			},
		}),
	},
};
</script>
```



## API

### Filter by element tag
As a string, it filters the vnodes with the `div` tag
```
<subslot element="div" />
```

Filter the vnodes with tag `child-component`
```
<subslot element="ChildComponent" />
```

### To match a specific component
Use the `@` prefix to use the component from the `components` hash
```
<subslot element="@ChildComponent" />
```

Or, pass in the direct Component reference
```
<subslot :element="ChildComponent" />
```

### To match multiple elements
Pass in an array

```
<subslot :element="[ChildComponentA, '@ChildComponentB', 'div']" />
```

### Limit the number of returned elements
```
<subslot
	element="ChildComponent"
	limit="1"
/>
```

### Inverse the filter
Set the `not` boolean to inverse the filter and get everything that _doesn't_ match.
```
<subslot not element="@ChildComponent" />
```

### Events
- `no-match`: When there are no matching vnodes


## Advanced usage

### Choose another slot than the default
```
<subslot element="@ChildComponent">
	<slot name="namedSlot" />
</subslot>
```

### Pass in vnodes directly
```
<subslot
	:vnodes="$slots.namedSlot"
	element="@ChildComponent"
/>
```

