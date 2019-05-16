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

});
