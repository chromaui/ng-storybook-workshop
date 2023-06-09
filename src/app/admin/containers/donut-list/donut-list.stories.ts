import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { rest } from 'msw';
import { DonutListComponent } from './donut-list.component';
import { DonutCardComponent } from '../../components/donut-card/donut-card.component';

const meta: Meta<DonutListComponent> = {
  title: 'Containers/DonutListComponent',
  component: DonutListComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, RouterTestingModule, DonutCardComponent],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<DonutListComponent>;

const mockDonuts = [
  {
    id: '1',
    name: 'Butter Toast',
    icon: 'caramel-swirl',
    price: 200,
    description: '',
  },
  {
    id: '2',
    name: 'Old-fashioned Glazed',
    icon: 'glazed-fudge',
    price: 500,
    promo: 'limited',
    description: '',
  },
  {
    id: '3',
    name: 'Vanilla sprinkle',
    icon: 'vanilla-sundae',
    price: 1000,
    promo: 'limited',
    description: '',
  },
  {
    id: '4',
    name: 'Cinnamon sugar',
    icon: 'sour-supreme',
    price: 1200,
    promo: 'limited',
    description: '',
  },
  {
    id: '5',
    name: 'Nanaimo',
    icon: 'just-chocolate',
    price: 350,
    promo: 'new',
    description: '',
  },
];

export const NoDonuts: Story = {};

export const WithDonuts: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/donuts', (req, res, ctx) => {
          return res(ctx.json(mockDonuts));
        }),
      ],
    },
  },
};

export const APIError: Story = {};
