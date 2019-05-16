import { mount } from '@vue/test-utils';
import Subslot from 'vue-subslot';
import CardHeader from './fixtures/CardHeader.vue';
import CardFooter from './fixtures/CardFooter.vue';

describe('$subslots support', () => {

	test('Normal usage', () => {
		const Card = {
			template: `
				<div class="card">
					<div
						v-if="$subslots.cardHeader"
						class="card-header"
					>
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

	test('Empty slot', () => {
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
						Header {{ msg }}
					</card-header>

					Content {{ msg }}
				</card>
			`,

			components: {
				Card,
				CardHeader,
			},

			data() {
				return { msg: 'is not reactive' };
			},

			methods: {
				increment() {
					this.msg = 'is reactive!';
				},
			},
		};

		const wrapper = mount(usage);
		wrapper.vm.increment();
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Fallback reactive', () => {
		const Card = {
			template: `
				<div class="card">
					<subslot name="cardHeader">
						Fallback {{ msg }}
					</subslot>
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

			data() {
				return { msg: 'is not reactive' };
			},

			mounted() {
				this.msg = 'is reactive!';
			},
		};

		const usage = {
			template: `
			<card>
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

	test('Should support slice index', () => {
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

	test('Should support slice with limit', () => {
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

	test('Should support slice with no offset', () => {
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
					cardHeader: '@CardHeader[:2]', // Equivalent to [0:2]
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
});
