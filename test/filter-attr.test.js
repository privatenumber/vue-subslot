import {mount} from '@vue/test-utils';
import Subslot from 'vue-subslot';
import CardHeader from './fixtures/CardHeader.vue';

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

		const wrapper = mount({
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
		});
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should support element as a direct reference', () => {
		const Card = {
			template: `
				<div class="card">
					<div class="card-header">
						<subslot :element="CardHeader" limit="1" />
					</div>

					<div class="card-content">
						<subslot not :element="CardHeader" />
					</div>
				</div>
			`,

			components: {
				Subslot,
			},

			data() {
				return {
					CardHeader,
				};
			},
		};

		const wrapper = mount({
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
		});
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should render all', () => {
		const Card = {
			template: `
				<div class="card">
					<subslot />
				</div>
			`,

			components: {
				Subslot,
			},

			data() {
				return {
					CardHeader,
				};
			},
		};

		const wrapper = mount({
			template: `
				<card>
					<div>Should render</div>
					<span>Should render</span>
					<button>Should render</button>
				</card>
			`,
			components: {Card},
		});
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should support tag', () => {
		const Card = {
			template: `
				<div class="card">
					<subslot element="button" limit="1" />
				</div>
			`,

			components: {
				Subslot,
			},

			data() {
				return {
					CardHeader,
				};
			},
		};

		const wrapper = mount({
			template: `
				<card>
					<div>Shouldn't render</div>
					<span>Shouldn't render</span>
					<button>Should render</button>
				</card>
			`,
			components: {Card},
		});
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should support wildcard', () => {
		const Card = {
			template: `
				<div class="card">
					<subslot element="*" />
				</div>
			`,

			components: {
				Subslot,
			},

			data() {
				return {
					CardHeader,
				};
			},
		};

		const wrapper = mount({
			template: `
				<card>
					Shouldn't render
					<span>Should render</span>
					Shouldn't render
				</card>
			`,
			components: {Card},
		});
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should only be 3 CardHeaders', () => {
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

		const wrapper = mount({
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
		});
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should enforce offset of 3', () => {
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

		const wrapper = mount({
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
		});
		expect(wrapper.element).toMatchSnapshot();
	});

	test('Should enforce offset and limit without element', () => {
		const Card = {
			template: `
				<div>
					<subslot
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

		const wrapper = mount({
			template: `
				<card>
					<div
						v-for="i in 10"
						:key="i"
					>
						Header {{ i }}
					</div>
				</card>
			`,
			components: {
				Card,
			},
		});
		expect(wrapper.element).toMatchSnapshot();
	});
});
