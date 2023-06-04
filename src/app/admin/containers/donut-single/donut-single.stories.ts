import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { rest } from 'msw';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { DonutSingleComponent } from './donut-single.component';
import { DonutCardComponent } from '../../components/donut-card/donut-card.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

const meta: Meta<DonutSingleComponent> = {
  title: 'Containers/DonutSingleComponent',
  component: DonutSingleComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, RouterTestingModule, DonutCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '3',
              }),
              data: {},
            },
          },
        },
      ],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<DonutSingleComponent>;

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

export const EditDonut: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/donuts', (req, res, ctx) => {
          return res(ctx.json(mockDonuts));
        }),
      ],
    },
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   const nameInput = await canvas.findByLabelText<HTMLInputElement>(/name/i);
  //   await userEvent.type(nameInput, 'Old Fashioned Glazed');
  //   const iconSelect = canvas.getByLabelText<HTMLInputElement>(/icon/i);
  //   await userEvent.selectOptions(iconSelect, '1: glazed-fudge');

  //   const priceInput = await canvas.findByLabelText<HTMLInputElement>(/price/i);
  //   await userEvent.clear(priceInput);
  //   await userEvent.type(priceInput, '500');

  //   await userEvent.click(canvas.getByLabelText<HTMLInputElement>(/new/i));

  //   await userEvent.type(
  //     canvas.getByLabelText<HTMLInputElement>(/description/i),
  //     'old fashioned style glazed donut'
  //   );
  // },
};
