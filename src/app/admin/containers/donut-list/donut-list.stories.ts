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
    price: 20,
    description: 'some kind of donut',
  },
  {
    id: '2',
    name: 'Old-fashioned Glazed',
    icon: 'glazed-fudge',
    price: 200,
    promo: 'limited',
    description: 'some kind of donut',
  },
  {
    id: '3',
    name: 'Vanilla sprinkle',
    icon: 'vanilla-sundae',
    price: 200,
    promo: 'limited',
    description: 'some kind of donut',
  },
  {
    id: '4',
    name: 'Cinnamon sugar',
    icon: 'sour-supreme',
    price: 200,
    promo: 'limited',
    description: 'some kind of donut',
  },
  {
    id: '5',
    name: 'Nanaimo',
    icon: 'just-chocolate',
    price: 200,
    promo: 'new',
    description: 'some kind of donut',
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

export const APIError: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/donuts', (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      ],
    },
  },
};
