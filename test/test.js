import { mount } from '@vue/test-utils';
import Subslot from 'vue-subslot';
import CardHeader from './fixtures/CardHeader.vue';
import CardFooter from './fixtures/CardFooter.vue';

describe('Subslot', () => {

	test('Should support filter attributes', () => {
		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot element="@CardHeader" limit="1" />
					</div>

					<div class="card-content">
						<subslot not element="@CardHeader" />
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},
		};

		const usage = {
			template: `
				<card>
					<card-header>
						Header
					</card-header>

					Content
				</card>
			`,
			components: {
				Card,
				CardHeader,
			},
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should support named subslots', () => {
		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot name="cardHeader" />
					</div>

					<div class="card-content">
						<subslot />
					</div>

					<div class="card-footer">
						<subslot name="cardFooter" />
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},

			mixins: [
				Subslot.define({
					cardHeader: '@CardHeader:1',
					cardFooter: {
						element: CardFooter,
						limit: 1,
					},
				}),
			],
		};

		const usage = {
			template: `
				<card>
					<card-header>
						Header
					</card-header>

					Content

					<card-footer>
						Footer
					</card-footer>
				</card>
			`,
			components: {
				Card,
				CardHeader,
				CardFooter,
			},
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should enforce limit', () => {
		const Card = {
			template: `
				<div class="card">
					<subslot
						element="@CardHeader"
						limit="3"
					/>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},
		};

		const usage = {
			template: `
				<card>
					<card-header
						v-for="i in 10"
						:key="i"
					>
						Header
					</card-header>
				</card>
			`,
			components: {
				Card,
				CardHeader,
			},
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should enforce offset', () => {
		const Card = {
			template: `
				<div class="card">
					<subslot
						element="@CardHeader"
						offset="3"
						limit="3"
					/>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},
		};

		const usage = {
			template: `
				<card>
					<card-header
						v-for="i in 10"
						:key="i"
					>
						Header {{ i }}
					</card-header>
				</card>
			`,
			components: {
				Card,
				CardHeader,
			},
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should support array index', () => {
		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot name="cardHeader" />
					</div>

					<div class="card-content">
						<subslot />
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},

			mixins: [
				Subslot.define({
					cardHeader: '@CardHeader[2]',
				}),
			],
		};

		const usage = {
			template: `
				<card>
					<card-header
						v-for="i in 10"
						:key="i"
					>
						Header {{ i }}
					</card-header>
				</card>
			`,
			components: {
				Card,
				CardHeader,
				CardFooter,
			},
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should support array slicing', () => {
		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot name="cardHeader" />
					</div>

					<div class="card-content">
						<subslot />
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},

			mixins: [
				Subslot.define({
					cardHeader: '@CardHeader[2:2]',
				}),
			],
		};

		const usage = {
			template: `
				<card>
					<card-header
						v-for="i in 10"
						:key="i"
					>
						Header {{ i }}
					</card-header>
				</card>
			`,
			components: {
				Card,
				CardHeader,
				CardFooter,
			},
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('$subslots', () => {
		const Card = {
			template: `
				<div class="card">
					<div
						v-if="$subslots.cardHeader"
						class="card-header"
					>
						<subslot name="cardHeader" />
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},

			mixins: [
				Subslot.define({
					cardHeader: '@CardHeader:1',
				}),
			],
		};

		const usage = {
			template: '<card>Content</card>',
			components: { Card },
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should emit "no-match" on no match', () => {
		const onNoCardHeader = jest.fn();

		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot
							name="cardHeader"
							@no-match="onNoCardHeader"
						/>
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},

			mixins: [
				Subslot.define({
					cardHeader: '@CardHeader:1',
				}),
			],

			methods: {
				onNoCardHeader,
			},
		};

		const usage = {
			template: '<card>Content</card>',
			components: { Card },
		};

		const wrapper = mount(usage);
		expect(onNoCardHeader).toBeCalled();
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should use fallback', () => {
		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot name="cardHeader">
							Fallback
						</subslot>
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},

			mixins: [
				Subslot.define({
					cardHeader: '@CardHeader:1',
				}),
			],
		};

		const usage = {
			template: '<card>Content</card>',
			components: { Card },
		};

		const wrapper = mount(usage);
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Reactive subslots', () => {
		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot name="cardHeader" />
					</div>
					<div class="card-content">
						<subslot />
					</div>
				</div>
			`,

			components: {
				Subslot,
				CardHeader,
			},

			mixins: [
				Subslot.define({
					cardHeader: '@CardHeader:1',
				}),
			],
		};

		const usage = {
			template: `
				<card>
					<card-header>
						Header {{ count }}
					</card-header>

					Content {{ count }}
				</card>
			`,

			components: {
				Card,
				CardHeader,
			},

			data() {
				return { count: 0 };
			},

			methods: {
				increment() {
					this.count += 1;
				},
			},
		};

		const wrapper = mount(usage);
		wrapper.vm.increment();
		expect(wrapper.element).toMatchSnapshot();
	});

});
